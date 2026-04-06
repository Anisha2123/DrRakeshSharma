import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/* ─── counter hook ─── */
function useCounter(target: number, duration = 2000, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let s: number | null = null;
    const tick = (ts: number) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return val;
}

/* ─────────────────────────────────────────────────────────────────────────────
   THREE.JS SCENE
   Camera framing: kidney centred in panel with ~10% top padding
   Camera FOV tightened + position raised so organ fills the frame top-to-bottom
───────────────────────────────────────────────────────────────────────────── */
function KidneyScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth, H = el.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    /* ── Camera: tighter FOV, shifted UP so kidney fills panel without top gap */
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 400);
    // Position camera higher and look slightly above centre
    // so the kidney sits in the upper-centre of the panel
    camera.position.set(0, 1.8, 13);
    camera.lookAt(0, 1.2, 0);

    const clock = new THREE.Clock();
    let mx = 0, my = 0;
    const onMM = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      my = -((e.clientY - r.top)  / r.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMM, { passive: true });

    /* ── tube helper ── */
    function tubeMesh(pts: THREE.Vector3[], r: number, color: number, opacity: number, segs = 12) {
      const curve = new THREE.CatmullRomCurve3(pts);
      const geo   = new THREE.TubeGeometry(curve, 80, r, segs, false);
      const mat   = new THREE.MeshPhongMaterial({ color, transparent: true, opacity, shininess: 80, specular: new THREE.Color(0x222222) });
      return { mesh: new THREE.Mesh(geo, mat), curve };
    }

    /* ══════════════════════════════════════════════════════
       1. KIDNEY — sculpted bean mesh, positioned at y=1.2
          so it sits centre-high inside the panel
    ══════════════════════════════════════════════════════ */
    const cortexGeo = new THREE.SphereGeometry(2.0, 72, 72);
    {
      const pos = cortexGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
        if (x < 0) {
          const d = Math.abs(x) / 2.0;
          x += d * Math.exp(-y * y * 0.4) * 1.1;
        }
        if (y > 1.1) y *= 0.86;
        if (z < -0.6) z *= 0.78;
        pos.setXYZ(i, x * 0.88, y * 1.28, z * 0.80);
      }
      cortexGeo.computeVertexNormals();
    }

    const cortexMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:   { value: 0 },
        uBeat:   { value: 0 },
        uTeal:   { value: new THREE.Color(0x2CCED1) },
        uOrange: { value: new THREE.Color(0xFF8A5B) },
      },
      vertexShader: `
        uniform float uBeat;
        varying vec3 vN; varying vec3 vPos; varying vec3 vWP;
        void main(){
          vN = normalize(normalMatrix * normal);
          vPos = position;
          float sw = 1.0 + uBeat * 0.028;
          vec4 wp  = modelMatrix * vec4(position * sw, 1.0);
          vWP = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        uniform float uTime; uniform float uBeat;
        uniform vec3 uTeal; uniform vec3 uOrange;
        varying vec3 vN; varying vec3 vPos; varying vec3 vWP;
        void main(){
          float t = clamp((vPos.y/1.28+1.0)*0.5, 0.0, 1.0);
          vec3 tissue = mix(vec3(0.36,0.06,0.06), mix(vec3(0.60,0.11,0.09), vec3(0.70,0.18,0.14), t), t);
          vec3 kl  = normalize(vec3(1.6, 2.4, 2.8));
          float kd = max(dot(vN,kl),0.0)*0.72 + 0.28;
          tissue = mix(tissue, vec3(0.84,0.10,0.09), uBeat*0.30);
          vec3 vDir = normalize(cameraPosition - vWP);
          float rim = pow(1.0 - max(dot(vN,vDir),0.0), 2.8);
          vec3 col  = tissue * kd;
          col += uOrange * rim * 0.38;
          col += uTeal   * rim * 0.12;
          float cap = sin(vPos.x*16.0)*sin(vPos.y*13.0)*sin(vPos.z*11.0);
          col += vec3(0.04,0.0,0.0)*(cap*0.5+0.5)*0.13;
          gl_FragColor = vec4(col, 0.97);
        }
      `,
      transparent: true,
    });

    /* Place kidney at y=1.2 — vertically centred in the panel when camera looks at y=1.2 */
    const kidney = new THREE.Mesh(cortexGeo, cortexMat);
    kidney.position.set(0, 1.2, 0);
    scene.add(kidney);

    const medMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.15, 28, 28),
      new THREE.MeshPhongMaterial({ color: 0xb83030, transparent: true, opacity: 0.52 })
    );
    medMesh.scale.set(0.88, 1.22, 0.76);
    medMesh.position.copy(kidney.position);
    scene.add(medMesh);

    const hilum = new THREE.Mesh(
      new THREE.SphereGeometry(0.46, 14, 14),
      new THREE.MeshPhongMaterial({ color: 0x440000, transparent: true, opacity: 0.9 })
    );
    hilum.position.set(-1.44, 1.2, 0.12);
    hilum.scale.set(0.60, 1, 0.55);
    scene.add(hilum);

    const capGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      color: 0xFF8A5B, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending,
    }));
    capGlow.scale.setScalar(8.2);
    capGlow.position.copy(kidney.position);
    scene.add(capGlow);

    /* ══════════════════════════════════════════════════════
       2 & 3. RENAL ARTERY + VEIN — branching from aorta
    ══════════════════════════════════════════════════════ */
    const KY = 1.2; // kidney y offset
    const { mesh: artMesh, curve: artCurve } = tubeMesh([
      new THREE.Vector3(-3.9, KY+0.45, 0.3),
      new THREE.Vector3(-2.6, KY+0.50, 0.2),
      new THREE.Vector3(-1.8, KY+0.34, 0.05),
      new THREE.Vector3(-1.44,KY+0.24, 0.0),
    ], 0.090, 0xdd1111, 0.92, 12);
    scene.add(artMesh);

    const { mesh: veinMesh, curve: veinCurve } = tubeMesh([
      new THREE.Vector3(-3.9, KY-0.15, 0.25),
      new THREE.Vector3(-2.6, KY-0.10, 0.18),
      new THREE.Vector3(-1.8, KY-0.18, 0.05),
      new THREE.Vector3(-1.44,KY-0.24, 0.0),
    ], 0.076, 0x2244cc, 0.88, 12);
    scene.add(veinMesh);

    // Aorta — vertical, left side
    const { mesh: aortaMesh } = tubeMesh([
      new THREE.Vector3(-3.9, KY-4.0, 0.2),
      new THREE.Vector3(-3.9, KY+0.0, 0.2),
      new THREE.Vector3(-3.9, KY+4.0, 0.2),
    ], 0.13, 0xcc0000, 0.90, 14);
    scene.add(aortaMesh);

    /* ══════════════════════════════════════════════════════
       4. URETER — descends from hilum
    ══════════════════════════════════════════════════════ */
    const { mesh: uretMesh, curve: uretCurve } = tubeMesh([
      new THREE.Vector3(-1.42, KY-0.60, 0.08),
      new THREE.Vector3(-1.56, KY-1.70,-0.05),
      new THREE.Vector3(-1.70, KY-3.00, 0.0),
      new THREE.Vector3(-1.88, KY-4.20, 0.0),
    ], 0.038, 0xc8a820, 0.74, 8);
    scene.add(uretMesh);

    /* ══════════════════════════════════════════════════════
       5. FLOW PARTICLES — RBC / WBC / Urine
    ══════════════════════════════════════════════════════ */
    interface FP { mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; t: number; spd: number; kind: "rbc"|"wbc"|"urine" }
    const fps: FP[] = [];
    function spawnFP(curve: THREE.CatmullRomCurve3, kind: FP["kind"], t0: number): FP {
      const col  = kind==="rbc" ? 0xff2020 : kind==="wbc" ? 0xdde8ff : 0xe8d030;
      const size = kind==="rbc" ? 0.058    : kind==="wbc" ? 0.072    : 0.040;
      const geo  = new THREE.SphereGeometry(size, 5, 5);
      const mat  = new THREE.MeshPhongMaterial({ color: col, emissive: new THREE.Color(col).multiplyScalar(0.28), transparent: true, opacity: 0.9, shininess: 80 });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      return { mesh, curve, t: t0, spd: 0.005 + Math.random()*0.003, kind };
    }
    for (let i = 0; i < 22; i++) fps.push(spawnFP(artCurve,  "rbc",   i/22));
    for (let i = 0; i < 16; i++) fps.push(spawnFP(veinCurve, "wbc",   i/16));
    for (let i = 0; i < 12; i++) fps.push(spawnFP(uretCurve, "urine", i/12));

    /* ══════════════════════════════════════════════════════
       6. KIDNEY STONE + LITHOTRIPSY
    ══════════════════════════════════════════════════════ */
    const stoneGrp = new THREE.Group();
    stoneGrp.position.set(-0.3, KY-0.4, 0.7);
    for (let i = 0; i < 5; i++) {
      const g = new THREE.DodecahedronGeometry(0.07 + Math.random()*0.08, 0);
      const p = g.attributes.position as THREE.BufferAttribute;
      for (let j = 0; j < p.count; j++)
        p.setXYZ(j, p.getX(j)*(0.65+Math.random()*0.7), p.getY(j)*(0.65+Math.random()*0.7), p.getZ(j)*(0.65+Math.random()*0.7));
      g.computeVertexNormals();
      const m = new THREE.Mesh(g, new THREE.MeshPhongMaterial({ color: 0xd0b85c, emissive: 0x3a2c00, shininess: 30 }));
      m.position.set((Math.random()-.5)*.30,(Math.random()-.5)*.24,(Math.random()-.5)*.16);
      stoneGrp.add(m);
    }
    scene.add(stoneGrp);

    let shattered = false, shatterT = 0;
    const fragVel = stoneGrp.children.map(() => new THREE.Vector3(
      (Math.random()-.5)*.045,(Math.random()-.5)*.040,(Math.random()-.5)*.038
    ));

    const laserMat = new THREE.LineBasicMaterial({ color: 0xff5500, transparent: true, opacity: 0, blending: THREE.AdditiveBlending });
    scene.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(5,KY+3,3), new THREE.Vector3(-0.3,KY-0.4,0.7)]),
      laserMat
    ));
    const laserGlowMat = new THREE.SpriteMaterial({ color: 0xff6600, transparent: true, opacity: 0, blending: THREE.AdditiveBlending });
    const laserGlow = new THREE.Sprite(laserGlowMat);
    laserGlow.scale.setScalar(0.55);
    laserGlow.position.set(-0.3, KY-0.4, 0.7);
    scene.add(laserGlow);

    /* ══════════════════════════════════════════════════════
       7. ULTRASOUND SCAN PLANE
    ══════════════════════════════════════════════════════ */
    const usMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
      fragmentShader: `
        uniform float uTime; varying vec2 vUv;
        void main(){
          float scan  = fract(uTime*0.25);
          float beam  = exp(-abs(vUv.y - scan)*30.0);
          float speck = fract(sin(vUv.x*51.0+vUv.y*37.0+uTime*0.6)*6831.0);
          speck = step(0.74, speck)*0.065;
          float fade  = 1.0 - length(vUv - 0.5)*1.6;
          fade = clamp(fade, 0.0, 1.0);
          gl_FragColor = vec4(0.17, 0.81, 0.82, (beam*0.52+speck)*fade);
        }
      `,
      transparent: true, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    const usMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 6.8), usMat);
    usMesh.position.set(0, KY, 0.05);
    scene.add(usMesh);

    /* ══════════════════════════════════════════════════════
       8. VASCULAR GRAFT
    ══════════════════════════════════════════════════════ */
    const graftCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-3.9, KY+0.45, 0.3),
      new THREE.Vector3(-2.4, KY+2.6,  1.2),
      new THREE.Vector3(0,    KY+3.2,  1.4),
      new THREE.Vector3(2.4,  KY+2.6,  1.2),
      new THREE.Vector3(3.9,  KY+0.45, 0.3),
    ]);
    const graftMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uA: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
      fragmentShader: `
        uniform float uTime; uniform float uA; varying vec2 vUv;
        void main(){
          float flow   = fract(vUv.x - uTime*0.22);
          float stream = exp(-abs(flow-0.5)*20.0);
          float edge   = 1.0 - abs(vUv.y-0.5)*2.2;
          edge = clamp(edge,0.0,1.0)*edge;
          vec3 col = mix(vec3(0.13,0.27,0.88), vec3(0.9,0.08,0.08), flow);
          gl_FragColor = vec4(col, stream*edge*uA);
        }
      `,
      transparent: true, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(graftCurve, 100, 0.076, 12, false), graftMat));

    const gPs: { mesh: THREE.Mesh; t: number; spd: number }[] = [];
    for (let i = 0; i < 26; i++) {
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.052, 5, 5),
        new THREE.MeshBasicMaterial({ color: 0xff1818, transparent: true, opacity: 0, blending: THREE.AdditiveBlending })
      );
      scene.add(m);
      gPs.push({ mesh: m, t: i/26, spd: 0.005+Math.random()*0.003 });
    }

    /* ══════════════════════════════════════════════════════
       9. AMBIENT PARTICLES
    ══════════════════════════════════════════════════════ */
    const aN = 220;
    const aPos = new Float32Array(aN*3), aCol = new Float32Array(aN*3);
    for (let i = 0; i < aN; i++) {
      aPos[i*3]   = (Math.random()-.5)*18;
      aPos[i*3+1] = (Math.random()-.5)*14 + KY;
      aPos[i*3+2] = (Math.random()-.5)*6 - 2;
      const r = Math.random();
      if      (r < 0.42) { aCol[i*3]=0.76; aCol[i*3+1]=0.07; aCol[i*3+2]=0.07; }
      else if (r < 0.66) { aCol[i*3]=0.17; aCol[i*3+1]=0.81; aCol[i*3+2]=0.82; }
      else               { aCol[i*3]=0.15; aCol[i*3+1]=0.22; aCol[i*3+2]=0.82; }
    }
    const aGeo = new THREE.BufferGeometry();
    aGeo.setAttribute("position", new THREE.BufferAttribute(aPos, 3));
    aGeo.setAttribute("color",    new THREE.BufferAttribute(aCol, 3));
    scene.add(new THREE.Points(aGeo, new THREE.PointsMaterial({
      size: 0.038, vertexColors: true, transparent: true, opacity: 0.30,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })));

    /* ══════════════════════════════════════════════════════
       10. ANATOMY HAIRLINES
    ══════════════════════════════════════════════════════ */
    function hair(a: THREE.Vector3, b: THREE.Vector3, col: number) {
      const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
      const mat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.28 });
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.04,5,5), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.5 }));
      dot.position.copy(a);
      const g = new THREE.Group(); g.add(new THREE.Line(geo, mat), dot); return g;
    }
    scene.add(hair(new THREE.Vector3(-2.2,KY+0.55,0), new THREE.Vector3(-2.2,KY+2.2,0), 0xee2222));
    scene.add(hair(new THREE.Vector3(-2.2,KY-0.12,0), new THREE.Vector3(-2.5,KY-1.6,0), 0x3355ff));
    scene.add(hair(new THREE.Vector3(-1.56,KY-1.3,0), new THREE.Vector3(0.4,KY-2.0,0), 0xc8a820));
    scene.add(hair(new THREE.Vector3(-0.3,KY-0.4,0.7),new THREE.Vector3(1.8,KY+0.8,0), 0xd0b85c));

    /* ── Lighting ── */
    scene.add(new THREE.AmbientLight(0x180808, 1.6));
    const kL = new THREE.DirectionalLight(0xffaa77, 1.7); kL.position.set(5, 8, 8);  scene.add(kL);
    const fL = new THREE.DirectionalLight(0x2CCED1, 0.4); fL.position.set(-5,-2, 4); scene.add(fL);
    const rL = new THREE.DirectionalLight(0x2244aa, 0.3); rL.position.set(0, -5, -4); scene.add(rL);

    /* Heartbeat point light */
    const bLight = new THREE.PointLight(0xff1111, 0, 12);
    bLight.position.set(0, KY+0.5, 3);
    scene.add(bLight);

    /* ── Heartbeat ── */
    const PER = 60/72;
    const beat = (t: number) => {
      const ph = (t % PER) / PER;
      if (ph < 0.12) return Math.sin((ph/0.12)*Math.PI);
      if (ph < 0.28) return Math.exp(-(ph-0.12)/0.065)*0.38;
      return 0;
    };

    /* ── Resize ── */
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── Loop ── */
    const SHATTER_AT = 13, GRAFT_AT = 5.5;
    let rafId: number;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const bv = beat(t);

      cortexMat.uniforms.uTime.value = t;
      cortexMat.uniforms.uBeat.value = bv;
      bLight.intensity = bv * 2.4;

      /* Breathing */
      const breathe = Math.sin(t*0.36)*0.06;
      const ky = KY + breathe + bv*0.045;
      kidney.position.y   = ky;
      medMesh.position.y  = ky;
      hilum.position.y    = ky;
      capGlow.position.y  = ky;
      stoneGrp.position.y = KY - 0.4 + breathe + bv*0.045;
      usMesh.position.y   = ky;

      /* Mouse parallax — gentle */
      kidney.rotation.y = mx*0.055 + Math.sin(t*0.14)*0.032;
      kidney.rotation.x = my*0.038;
      medMesh.rotation.copy(kidney.rotation);
      hilum.rotation.copy(kidney.rotation);

      /* Artery pulse */
      artMesh.scale.x = artMesh.scale.z = 1 + bv*0.22;

      /* US */
      usMat.uniforms.uTime.value = t;

      /* Graft */
      graftMat.uniforms.uTime.value = t;
      const gA = Math.min(Math.max((t-GRAFT_AT)/3.0, 0), 1);
      graftMat.uniforms.uA.value = gA;
      gPs.forEach(gp => {
        gp.t += gp.spd; if (gp.t>1) gp.t-=1;
        gp.mesh.position.copy(graftCurve.getPoint(gp.t));
        (gp.mesh.material as THREE.MeshBasicMaterial).opacity = gA*0.72;
      });

      /* Flow particles */
      fps.forEach(fp => {
        const sm = fp.kind==="rbc" ? 1+bv*2.0 : fp.kind==="urine" ? 1+Math.sin(t*1.8)*0.28 : 1;
        fp.t += fp.spd*sm; if (fp.t>1) fp.t-=1;
        fp.mesh.position.copy(fp.curve.getPoint(fp.t));
        if (fp.kind==="rbc") {
          fp.mesh.lookAt(fp.mesh.position.clone().add(fp.curve.getTangent(fp.t)));
          fp.mesh.scale.z = 0.48;
        }
      });

      /* Stone */
      stoneGrp.rotation.y += 0.008;
      stoneGrp.rotation.x += 0.003;
      if (!shattered && t>SHATTER_AT) { shattered=true; shatterT=0; }
      if (!shattered) {
        laserMat.opacity     = 0.04 + 0.035*Math.sin(t*3.6);
        laserGlowMat.opacity = 0.07 + 0.05*Math.sin(t*3.6);
      } else {
        shatterT += 0.016;
        laserMat.opacity     = Math.max(0, 0.92 - shatterT*0.12);
        laserGlowMat.opacity = Math.max(0, 0.96 - shatterT*0.12);
        stoneGrp.children.forEach((ch, i) => {
          ch.position.addScaledVector(fragVel[i], 1);
          (ch as THREE.Mesh).scale.multiplyScalar(0.992 - shatterT*0.003);
        });
        if (shatterT>20) {
          shattered=false;
          stoneGrp.children.forEach(ch => {
            ch.position.set((Math.random()-.5)*.30,(Math.random()-.5)*.24,(Math.random()-.5)*.16);
            (ch as THREE.Mesh).scale.setScalar(1);
          });
        }
      }

      /* Camera — smooth parallax, always looking at kidney centre */
      camera.position.x += (mx*0.7 - camera.position.x)*0.022;
      // y stays near 1.8 — small vertical drift only
      camera.position.y += (my*0.3 + 1.8 - camera.position.y)*0.022;
      camera.lookAt(0, ky, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMM);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position:"absolute", inset:0 }} />;
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO — light theme, split layout
───────────────────────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const [on, setOn]       = useState(false);
  const [stats, setStats] = useState(false);
  const statsRef          = useRef<HTMLDivElement>(null);

  useEffect(() => { const t = setTimeout(()=>setOn(true), 80); return ()=>clearTimeout(t); }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setStats(true); },{ threshold:0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const c25  = useCounter(25,     2000, stats);
  const c689 = useCounter(689,    2200, stats);
  const c200 = useCounter(200000, 2400, stats);
  const c50  = useCounter(50000,  2200, stats);
  const o = on ? "on" : "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        :root {
          --teal:    #2CCED1;
          --orange:  #FF8A5B;
          --light:   #F4F4F4;
          --white:   #FFFFFF;
          --ink:     #ffffff;        /* white for headings on dark bg */
          --body:    #b8c5d0;        /* light text for body */
          --muted:   #7a9aaa;        /* secondary text */
          --border:  rgba(44,206,209,0.14);
          --bg:      #0d1520;        /* page background = dark canvas */
          --panel:   #0d1520;        /* left panel = dark canvas */
          --canvas:  #0d1520;        /* right panel = dark for 3D contrast */
        }

        /* ════ ROOT ════ */
        .srk { min-height:100vh; display:flex; flex-direction:column; background:var(--bg); font-family:'DM Sans',sans-serif; overflow:hidden; }

        /* ════ NAVBAR ════ */
        .srk-nav {
          display:flex; align-items:center; justify-content:space-between;
          padding:0 56px; height:66px; flex-shrink:0;
          background:var(--white);
          border-bottom:1px solid rgba(44,206,209,0.12);
          box-shadow:0 1px 24px rgba(13,30,40,0.06);
          opacity:0; transform:translateY(-16px);
          transition:opacity .6s ease, transform .6s ease;
        }
        .srk-nav.on { opacity:1; transform:translateY(0); }

        .nav-logo { display:flex; align-items:center; gap:11px; text-decoration:none; }
        .nav-logo-pill {
          width:38px; height:38px; border-radius:8px; background:var(--white);
          border:1px solid rgba(44,206,209,0.18);
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 0 14px rgba(44,206,209,0.14);
        }
        .nav-logo-pill img { width:26px; height:26px; object-fit:contain; mix-blend-mode:multiply; }
        .nav-logo-name { font-size:14px; font-weight:600; color:var(--ink); letter-spacing:.1px; }
        .nav-logo-sub  { font-size:8.5px; color:var(--teal); letter-spacing:2px; text-transform:uppercase; margin-top:1px; }

        .nav-links { display:flex; gap:30px; }
        .nav-links a { font-size:11px; font-weight:400; color:var(--muted); text-decoration:none; letter-spacing:.1em; text-transform:uppercase; transition:color .2s; }
        .nav-links a:hover { color:var(--teal); }

        .nav-cta {
          display:flex; align-items:center; gap:7px; padding:8px 18px;
          border:1px solid var(--teal); border-radius:100px;
          font-size:11px; font-weight:500; color:var(--teal);
          letter-spacing:.9px; text-transform:uppercase;
          background:rgba(44,206,209,0.06); text-decoration:none;
          transition:background .2s, color .2s;
        }
        .nav-cta:hover { background:var(--teal); color:#fff; }
        .nav-dot {
          width:5px; height:5px; border-radius:50%;
          background:var(--teal); box-shadow:0 0 6px var(--teal);
          animation:dotP 2s ease-in-out infinite;
        }
        @keyframes dotP { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:.3;transform:scale(1.7);} }

        /* ════ BODY ════ */
        .srk-body {
          flex:1; display:grid; grid-template-columns:1fr 1fr; min-height:0;
          position: relative;
        }

        /* ════ LEFT PANEL — white ════ */
        .srk-left {
          display:flex; flex-direction:column; justify-content:center;
          padding:60px 52px 52px 56px;
          background:var(--panel);
          border-right:1px solid rgba(44,206,209,0.10);
        }

        .eyebrow {
          display:inline-flex; align-items:center; gap:9px;
          padding:6px 16px;
          border:1px solid rgba(44,206,209,0.28); border-radius:100px;
          background:rgba(44,206,209,0.07);
          font-size:9.5px; font-weight:500; color:var(--teal);
          letter-spacing:2.6px; text-transform:uppercase;
          align-self:flex-start; margin-bottom:26px;
          opacity:0; transform:translateY(14px);
          transition:opacity .7s ease .28s, transform .7s ease .28s;
        }
        .eyebrow.on { opacity:1; transform:translateY(0); }
        .ew-d { width:16px; height:1px; background:var(--teal); opacity:.5; }

        /* H1 */
        .srk-h1 {
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(2.8rem, 3.5vw, 4.6rem);
          font-weight:600; line-height:1.08; letter-spacing:-.01em; color:var(--ink);
        }
        .hl   { display:block; overflow:hidden; }
        .hi   { display:block; animation:lUp .88s cubic-bezier(.22,.68,0,1.15) both; }

        .hl:nth-child(1) .hi { animation-delay:.34s; color:var(--ink); }
        .hl:nth-child(2) .hi {
          animation-delay:.48s;
          background:linear-gradient(90deg,var(--teal) 0%,#7af6f8 50%,var(--teal) 100%);
          background-size:220% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:lUp .88s cubic-bezier(.22,.68,0,1.15) .48s both, shim 5s linear infinite 2s;
        }
        .hl:nth-child(3) .hi {
          animation-delay:.62s; color:transparent;
          -webkit-text-stroke:1.2px rgba(255,138,91,0.7);
        }
        .hl:nth-child(4) .hi {
          animation-delay:.76s; font-style:italic;
          background:linear-gradient(90deg,var(--orange) 0%,#ffc4a0 50%,var(--orange) 100%);
          background-size:220% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
          animation:lUp .88s cubic-bezier(.22,.68,0,1.15) .76s both, shim 4.5s linear infinite 2.2s;
        }
        @keyframes lUp { from{transform:translateY(110%) skewY(2deg);opacity:0;} to{transform:translateY(0) skewY(0);opacity:1;} }
        @keyframes shim { from{background-position:0% center;} to{background-position:220% center;} }

        /* subtitle */
        .srk-sub {
          margin-top:22px; font-size:14px; line-height:1.88; font-weight:300;
          color:var(--body); max-width:420px;
          opacity:0; transform:translateY(12px);
          transition:opacity .8s ease .88s, transform .8s ease .88s;
        }
        .srk-sub.on { opacity:1; transform:translateY(0); }
        .srk-sub strong { color:var(--ink); font-weight:500; }

        /* creds */
        .srk-creds {
          display:flex; flex-wrap:wrap; gap:7px; margin-top:16px;
          opacity:0; transition:opacity .8s ease 1.0s;
        }
        .srk-creds.on { opacity:1; }
        .cred { font-size:9px; font-weight:600; letter-spacing:.16em; text-transform:uppercase; padding:3px 11px; border-radius:100px; }
        .cg { background:rgba(212,160,23,.18); color:#e8c44a; border:1px solid rgba(212,160,23,.35); }
        .ct { background:rgba(44,206,209,.15); color:var(--teal); border:1px solid rgba(44,206,209,.35); }
        .cm { background:rgba(255,255,255,.08); color:rgba(255,255,255,.5); border:1px solid rgba(255,255,255,.15); }

        /* CTAs */
        .srk-cta {
          display:flex; align-items:center; gap:12px; margin-top:30px;
          opacity:0; transform:translateY(12px);
          transition:opacity .8s ease 1.08s, transform .8s ease 1.08s;
        }
        .srk-cta.on { opacity:1; transform:translateY(0); }

        .btn-b {
          position:relative; overflow:hidden; padding:12px 28px;
          background:linear-gradient(135deg,var(--teal),#1aa8ab);
          border:none; border-radius:8px;
          font-family:'DM Sans',sans-serif; font-size:12px; font-weight:500;
          letter-spacing:.5px; color:#fff; cursor:pointer; text-decoration:none;
          display:inline-block;
          box-shadow:0 4px 22px rgba(44,206,209,.28);
          transition:transform .2s, box-shadow .2s;
        }
        .btn-b::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,var(--orange),#c04010); opacity:0; transition:opacity .3s; }
        .btn-b:hover  { transform:translateY(-2px); box-shadow:0 10px 32px rgba(44,206,209,.42); }
        .btn-b:hover::after { opacity:1; }
        .btn-b span   { position:relative; z-index:1; }

        .btn-s {
          display:inline-flex; align-items:center; gap:8px; padding:11px 20px;
          background:transparent;
          border:1px solid rgba(255,255,255,.2); border-radius:8px;
          font-family:'DM Sans',sans-serif; font-size:12px; font-weight:400;
          color:rgba(255,255,255,.7); cursor:pointer; text-decoration:none;
          transition:border-color .2s, color .2s, background .2s;
        }
        .btn-s:hover { border-color:var(--orange); color:var(--orange); background:rgba(255,138,91,.08); }
        .btn-s svg   { transition:transform .2s; }
        .btn-s:hover svg { transform:translateX(3px); }

        /* divider */
        .srk-div {
          display:flex; align-items:center; gap:12px; margin-top:36px;
          opacity:0; transition:opacity .8s ease 1.22s;
        }
        .srk-div.on { opacity:1; }
        .dline { flex:1; height:1px; background:linear-gradient(90deg,transparent,rgba(44,206,209,.20),transparent); }
        .dlabel { font-size:9px; letter-spacing:2.5px; text-transform:uppercase; color:var(--muted); white-space:nowrap; }

        /* stats 2×2 */
        .srk-stats {
          display:grid; grid-template-columns:1fr 1fr; gap:0;
          margin-top:20px;
          border:1px solid rgba(44,206,209,.14); border-radius:12px;
          overflow:hidden; background:rgba(13,21,32,0.5);
          box-shadow:0 2px 20px rgba(0,0,0,.3);
          opacity:0; transform:translateY(10px);
          transition:opacity .8s ease 1.36s, transform .8s ease 1.36s;
        }
        .srk-stats.on { opacity:1; transform:translateY(0); }

        .stat { padding:18px 14px; text-align:center; position:relative; transition:background .22s; }
        .stat:hover { background:rgba(44,206,209,.08); }
        .stat:nth-child(1),.stat:nth-child(2) { border-bottom:1px solid rgba(44,206,209,.12); }
        .stat:nth-child(1),.stat:nth-child(3) { border-right:1px solid rgba(44,206,209,.12); }
        .stat::before {
          content:''; position:absolute; top:0; left:50%; transform:translateX(-50%);
          width:46%; height:1.5px;
          background:linear-gradient(90deg,transparent,var(--orange),transparent);
        }
        .sn {
          font-family:'Cormorant Garamond',serif; font-size:2rem; font-weight:600; line-height:1;
          background:linear-gradient(135deg,var(--teal),var(--orange));
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .sx { font-size:1.25rem; }
        .sl { font-size:8.5px; font-weight:400; letter-spacing:1.4px; text-transform:uppercase; color:var(--muted); margin-top:4px; }

        /* ════ RIGHT PANEL — dark canvas ════ */
        .srk-right {
          position:relative; 
          overflow:hidden;
          // background:var(--canvas);
          border-left:none;
          height: 100%;
          width: 100%;
        }

        /* Legend inside canvas panel */
        .srk-legend {
          position:absolute; bottom:26px; left:22px; z-index:10;
          display:flex; flex-direction:column; gap:8px;
          opacity:0; transform:translateY(10px);
          transition:opacity .9s ease 2.4s, transform .9s ease 2.4s;
        }
        .srk-legend.on { opacity:1; transform:translateY(0); }
        .leg { display:flex; align-items:center; gap:8px; font-size:8.5px; letter-spacing:.18em; text-transform:uppercase; color:rgba(244,244,244,.35); }
        .ld  { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
        .ld-a { background:#dd1111; box-shadow:0 0 5px #dd1111; }
        .ld-v { background:#2244cc; box-shadow:0 0 5px #2244cc; }
        .ld-u { background:#c8a820; box-shadow:0 0 5px #c8a820; }
        .ld-s { background:#d0b85c; box-shadow:0 0 5px #d0b85c; }
        .ld-g { background:var(--teal); box-shadow:0 0 5px var(--teal); }

        /* Live indicator */
        .srk-live {
          position:absolute; top:20px; right:20px; z-index:10;
          display:flex; align-items:center; gap:6px;
          font-size:8.5px; letter-spacing:.2em; text-transform:uppercase;
          color:rgba(44,206,209,.6);
          opacity:0; transition:opacity .9s ease 2.5s;
        }
        .srk-live.on { opacity:1; }
        .live-dot { width:6px; height:6px; border-radius:50%; background:var(--teal); box-shadow:0 0 7px var(--teal); animation:liveP 1.1s ease-in-out infinite; }
        @keyframes liveP { 0%,100%{opacity:1;} 50%{opacity:.2;} }

        /* ════ FOOTER ════ */
        .srk-foot {
          height:46px; display:flex; align-items:center; justify-content:space-between;
          padding:0 56px; flex-shrink:0;
          background:rgba(13,21,32,0.8);
          border-top:1px solid rgba(44,206,209,.15);
          box-shadow:0 -1px 18px rgba(0,0,0,.3);
          opacity:0; transition:opacity .8s ease 1.8s;
        }
        .srk-foot.on { opacity:1; }
        .foot-l { font-size:9.5px; letter-spacing:1.6px; text-transform:uppercase; color:rgba(255,255,255,.4); }
        .scroll-h { display:flex; align-items:center; gap:8px; font-size:9.5px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,.4); }
        .scroll-i {
          width:26px; height:26px; border-radius:50%;
          border:1px solid rgba(44,206,209,.3);
          display:flex; align-items:center; justify-content:center;
          animation:sBounce 2s ease-in-out infinite;
        }
        @keyframes sBounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(4px);} }

        /* ════ RESPONSIVE ════ */
        @media (max-width:1080px) {
          .srk-body { grid-template-columns:1fr; }
          .srk-right { display:none; }
          .srk-left  { padding:44px 28px; border-right:none; }
          .srk-nav   { padding:0 28px; }
          .nav-links { display:none; }
          .srk-foot  { padding:0 28px; }
          .srk-h1    { font-size:clamp(2.4rem,8vw,4rem); }
        }
        @media (max-width:600px) {
          .srk-stats { grid-template-columns:1fr 1fr; }
          .srk-cta   { flex-direction:column; }
          .btn-b,.btn-s { width:100%; justify-content:center; text-align:center; }
        }
      `}</style>

      <section className="srk">

        {/* NAVBAR */}
    

        {/* BODY */}
        <div className="srk-body">

          {/* ── LEFT ── */}
          <div className="srk-left">

            <div className={`eyebrow ${o}`}>
              <div className="ew-d"/>Senior Urologist · Jaipur<div className="ew-d"/>
            </div>

            <h1 className="srk-h1">
              <span className="hl"><span className="hi">Precision</span></span>
              <span className="hl"><span className="hi">Urology &amp;</span></span>
              <span className="hl"><span className="hi">Compassionate</span></span>
              <span className="hl"><span className="hi">Healing.</span></span>
            </h1>

            <p className={`srk-sub ${o}`}>
              <strong>Dr. Rakesh Sharma</strong> — Gold Medallist M.Ch. Urologist and Director of{" "}
              <strong>SRK Hospital, Jaipur</strong> — 25+ years of precision urology: kidney stone
              removal, renal transplantation, prostate surgery &amp; advanced endo-urological care.
            </p>

            <div className={`srk-creds ${o}`}>
              <span className="cred cg">🥇 Gold Medallist · M.Ch.</span>
              <span className="cred ct">MBBS · M.S. · DNB</span>
              <span className="cred cm">Director, SRK Hospital</span>
            </div>

            <div className={`srk-cta ${o}`}>
              <a href="tel:+919773332601" className="btn-b"><span>Book Appointment</span></a>
              <a href="/medical-services" className="btn-s">
                Services
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>

          
          </div>

          {/* ── RIGHT: Three.js ── */}
          <div className="srk-right">
            <KidneyScene />

            <div className={`srk-legend ${o}`}>
              {([["ld-a","Renal Artery"],["ld-v","Renal Vein"],["ld-u","Ureter"],["ld-s","Renal Calculi"],["ld-g","Vascular Graft"]] as [string,string][]).map(([d,l])=>(
                <div key={d} className="leg"><div className={`ld ${d}`}/>{l}</div>
              ))}
            </div>

            {/* <div className={`srk-live ${o}`}>
              <div className="live-dot"/>72 BPM · Live
            </div> */}
          </div>

        </div>

        {/* FOOTER */}
        <footer className={`srk-foot ${o}`}>
          <div className="foot-l">SRK Hospital · Urology &amp; Renal Transplant · Jaipur</div>
          <div className="scroll-h">
            Scroll to explore
            <div className="scroll-i">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </footer>

      </section>
    </>
  );
}