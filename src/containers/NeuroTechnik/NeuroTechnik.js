import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./NeuroTechnik.scss";

const HOTSPOTS = [
  {
    key: "brainstem",
    name: "Hirnstamm",
    pos: [0.02, -0.18, -0.05],
    bullets: [
      "Entwicklung von Software zur Analyse neuronaler Signale",
      "Implementierung klinischer Datenschnittstellen",
      "Integration in IT-Systeme der Klinik"
    ]
  },
  {
    key: "frontal",
    name: "Frontallappen",
    pos: [0.22, 0.10, 0.08],
    bullets: [
      "Programmierung kognitiver Testsoftware",
      "Automatisierte Artefakt-Erkennung in EEG-Daten",
      "IT-gestützte Dokumentationssysteme"
    ]
  },
  {
    key: "occipital",
    name: "Okzipitallappen",
    pos: [-0.20, 0.10, -0.10],
    bullets: [
      "Softwaremodule für visuelle Reizverarbeitung",
      "Kalibrierung von Aufzeichnungssystemen",
      "Sichere Datenspeicherung nach DSGVO"
    ]
  },
  {
    key: "cerebellum",
    name: "Kleinhirn",
    pos: [-0.16, -0.04, -0.04],
    bullets: [
      "IT-gestützte Funktionstests",
      "Geräte-Log-Analyse zur Fehlerbehebung",
      "Schnittstellenpflege zu Diagnosesystemen"
    ]
  }
];

export default function NeuroTechnik() {
  const hostRef = useRef(null);
  const btnRefs = useRef({});
  const popoverRef = useRef(null);
  const brainRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const host = hostRef.current;
    let width = host.clientWidth;
    const height = 500;

    // Renderer TRANSPARENT -> zeigt NUR den Hintergrund des Canvas-Containers
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setClearColor(0x000000, 0); // transparent
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.outputEncoding = THREE.sRGBEncoding; // kompatibel zu deiner three-Version
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    host.appendChild(renderer.domElement);

    // Szene & Kamera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 2);

    // Licht (hell genug für Prod/Mobil)
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const hemi = new THREE.HemisphereLight(0xbfd9ff, 0x0b0f14, 0.5);
    scene.add(hemi);
    const keyLight = new THREE.DirectionalLight(0x66ccff, 1.4);
    keyLight.position.set(2, 2, 2);
    scene.add(keyLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;

    // Gehirn-Gruppe
    const brain = new THREE.Group();
    scene.add(brain);
    brainRef.current = brain;

    // GLB laden
    const loader = new GLTFLoader();
    const url = `${process.env.PUBLIC_URL || ""}/assets/models/brain.glb`;
    loader.load(
      url,
      (gltf) => {
        const root = gltf.scene;

        // Normalisieren & zentrieren
        const box = new THREE.Box3().setFromObject(root);
        const size = new THREE.Vector3();
        box.getSize(size);
        const scale = 1.8 / Math.max(size.x, size.y, size.z || 1);
        root.scale.setScalar(scale);
        box.setFromObject(root);
        const center = new THREE.Vector3();
        box.getCenter(center);
        root.position.sub(center);

        // Material – medizinisch, gut sichtbar
        root.traverse((o) => {
          if (o.isMesh && o.material) {
            o.material.roughness = 0.25;
            o.material.metalness = 0.0;
            o.material.color = new THREE.Color(0x9fd9ff);
            o.material.emissive = new THREE.Color(0x0d3b66);
            o.material.emissiveIntensity = 0.08;
            o.material.transparent = false;
            o.material.depthTest = true;
            o.material.side = THREE.FrontSide;
          }
        });

        brain.add(root);
        console.log("[GLB] geladen:", url);
      },
      undefined,
      (err) => console.error("[GLB] Load error:", url, err)
    );

    // Welt -> Canvas-Koordinaten
    const worldToScreen = (v3) => {
      const canvasRect = renderer.domElement.getBoundingClientRect();
      const p = v3.clone().project(camera);
      const x = (p.x * 0.5 + 0.5) * canvasRect.width;
      const y = (-p.y * 0.5 + 0.5) * canvasRect.height;
      return { x, y, canvasRect };
    };

    const animate = () => {
      // Buttons positionieren (Canvas→Container-Offset berücksichtigen)
      const hostRect = host.getBoundingClientRect();
      HOTSPOTS.forEach((h) => {
        const btn = btnRefs.current[h.key];
        if (!btn) return;
        const local = new THREE.Vector3(...h.pos);
        brain.localToWorld(local);
        const { x, y, canvasRect } = worldToScreen(local);
        const offsetX = canvasRect.left - hostRect.left;
        const offsetY = canvasRect.top - hostRect.top;
        btn.style.left = `${offsetX + x}px`;
        btn.style.top = `${offsetY + y}px`;
      });

      // Popover neben aktivem Hotspot positionieren
      if (selected && popoverRef.current) {
        const anchor = btnRefs.current[selected.key];
        if (anchor) {
          const hostRect = host.getBoundingClientRect();
          const bx = parseFloat(anchor.style.left) || 0;
          const by = parseFloat(anchor.style.top) || 0;
          const side = (bx - (hostRect.left + hostRect.width / 2)) > 0 ? "left" : "right";
          popoverRef.current.dataset.side = side;
          popoverRef.current.style.left = `${bx}px`;
          popoverRef.current.style.top = `${by}px`;
        }
      }

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize robust
    const onResize = () => {
      const w = host.clientWidth;
      renderer.setSize(w, height);
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    if (width === 0) setTimeout(onResize, 50);

    // Cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      controls.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []); // init nur einmal

  return (
    <section id="neurotechnik" className="nt-section">
      <header className="nt-header">
        <h1 className="glow-title">Neurotechnische Funktionaldiagnostik</h1>
        <p className="subtitle">Präzise Analyse · Visuelle Darstellung · Klinische Integration</p>
      </header>

      <div className="nt-layout">
        <div className="nt-3d-wrap">
          {/* Der eigene medizinische Hintergrund sitzt IM Container unter dem Canvas */}
          <div ref={hostRef} className="nt-canvas" />

          {HOTSPOTS.map((h) => (
            <button
              key={h.key}
              ref={(el) => (btnRefs.current[h.key] = el)}
              className="nt-hotspot"
              onClick={() => setSelected(h)}
              aria-label={`${h.name} anzeigen`}
            >
              <span className="pulse-circle"></span>
              <span className="plus-icon">+</span>
            </button>
          ))}

          {selected && (
            <div ref={popoverRef} className="nt-popover">
              <div className="nt-card">
                <div className="nt-card-title">{selected.name}</div>
                <ul className="nt-card-list">
                  {selected.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                <button className="nt-close" onClick={() => setSelected(null)} aria-label="Schließen">
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="nt-info-card">
          <h3>🏥 Uniklinik Frankfurt</h3>
          <p>Abteilung für Neurotechnische Funktionaldiagnostik</p>
          <ul>
            <li>📍 Frankfurt am Main</li>
            <li>🧠 Neurowissenschaften & IT</li>
            <li>🔬 Modernste Diagnosetechnik</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
