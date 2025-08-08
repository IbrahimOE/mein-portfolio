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
  const [selected, setSelected] = useState(null);
  const brainRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const width = host.clientWidth;
    const height = 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 2);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const keyLight = new THREE.DirectionalLight(0x00bfff, 1.2);
    keyLight.position.set(2, 2, 2);
    scene.add(keyLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;

    const brain = new THREE.Group();
    scene.add(brain);
    brainRef.current = brain;

    const loader = new GLTFLoader();
    loader.load(
      (process.env.PUBLIC_URL || "") + "/assets/models/brain.glb",
      (gltf) => {
        const root = gltf.scene;
        const box = new THREE.Box3().setFromObject(root);
        const size = new THREE.Vector3();
        box.getSize(size);
        const scale = 1.8 / Math.max(size.x, size.y, size.z);
        root.scale.setScalar(scale);
        box.setFromObject(root);
        const center = new THREE.Vector3();
        box.getCenter(center);
        root.position.sub(center);

        root.traverse((o) => {
          if (o.isMesh) {
            o.material.roughness = 0.2;
            o.material.metalness = 0;
            o.material.emissive = new THREE.Color(0x00bfff);
            o.material.emissiveIntensity = 0.3;
          }
        });

        brain.add(root);
      }
    );

    const worldToScreen = (v3) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const p = v3.clone().project(camera);
      return {
        x: (p.x * 0.5 + 0.5) * rect.width,
        y: (-p.y * 0.5 + 0.5) * rect.height
      };
    };

    const animate = () => {
      HOTSPOTS.forEach((h) => {
        const btn = btnRefs.current[h.key];
        if (!btn) return;
        const local = new THREE.Vector3(...h.pos);
        brain.localToWorld(local);
        const { x, y } = worldToScreen(local);
        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
      });

      if (selected && popoverRef.current) {
        const anchor = btnRefs.current[selected.key];
        if (anchor) {
          const rect = renderer.domElement.getBoundingClientRect();
          const bx = parseFloat(anchor.style.left) || rect.width / 2;
          const by = parseFloat(anchor.style.top) || rect.height / 2;
          popoverRef.current.style.left = `${bx}px`;
          popoverRef.current.style.top = `${by}px`;
        }
      }

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = host.clientWidth;
      renderer.setSize(w, height);
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      controls.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, [selected]);

  return (
    <section id="neurotechnik" className="nt-section">
      <header className="nt-header">
        <h1 className="glow-title">Neurotechnische Funktionaldiagnostik</h1>
        <p className="subtitle">Präzise Analyse · Visuelle Darstellung · Klinische Integration</p>
      </header>

      <div className="nt-layout">
        <div className="nt-3d-wrap">
          <div ref={hostRef} className="nt-canvas" />
          {HOTSPOTS.map((h) => (
            <button
              key={h.key}
              ref={(el) => (btnRefs.current[h.key] = el)}
              className="nt-hotspot"
              onClick={() => setSelected(h)}
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
                <button className="nt-close" onClick={() => setSelected(null)}>×</button>
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
