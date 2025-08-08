import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./NeuroTechnik.scss";

/** Klickbare Areale – Positionen ggf. anpassen */
const HOTSPOTS = [
  {
    key: "brainstem",
    name: "Hirnstamm",
    pos: [0.02, -0.18, -0.05],
    bullets: [
      "Erfassung & Analyse neuronaler Signale (Funktionsdiagnostik)",
      "Plausibilitäts-/Qualitätsprüfung der Signalwege",
      "DICOM/PACS-Übergabe in Kliniksysteme"
    ],
  },
  {
    key: "frontal",
    name: "Frontallappen",
    pos: [0.22, 0.10, 0.08],
    bullets: [
      "Unterstützung kognitiver Messprotokolle (Stimuli/Antwortzeiten)",
      "Artefaktmanagement & Protokolloptimierung (EEG/fMRT)",
      "Standardisierte Dokumentation & Auswertung"
    ],
  },
  {
    key: "occipital",
    name: "Okzipitallappen",
    pos: [-0.20, 0.10, -0.10],
    bullets: [
      "Messung visueller Reizverarbeitung (Paradigmenbetreuung)",
      "Kalibrierung/Qualitätskontrolle der Aufzeichnungskette",
      "Datenschutzkonforme Speicherung & Export"
    ],
  },
  {
    key: "cerebellum",
    name: "Kleinhirn",
    pos: [-0.16, -0.04, -0.04],
    bullets: [
      "Regelmäßige Funktionstests & Gleichmäßigkeitsprüfungen",
      "Störungsanalyse anhand Geräte-Logs",
      "Schnittstellenpflege zu Diagnosesoftware"
    ],
  },
];

export default function NeuroTechnik() {
  const hostRef = useRef(null);        // Canvas-Host
  const btnRefs = useRef({});          // key -> Hotspot-Button DOM
  const popRef = useRef(null);         // Popover DOM
  const brainRef = useRef(null);       // Group fürs Gehirn
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  const [selected, setSelected] = useState(null); // {key,name,bullets}
  const selectedRef = useRef(null);
  useEffect(() => { selectedRef.current = selected; }, [selected]);

  useEffect(() => {
    const host = hostRef.current;
    const width = host.clientWidth;
    const height = 520;

    // --- Renderer: transparent, ohne Hintergrund ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    host.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // (für three <= r133)
    if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;

    // --- Szene + Kamera ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0.0, 0.65, 2.0);
    cameraRef.current = camera;

    // --- Licht (klinisch, neutral) ---
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(2.2, 2.0, 2.0);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xbfd9ff, 0.5);
    rim.position.set(-2.0, 1.2, -1.6);
    scene.add(rim);

    // --- Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;

    // --- Gruppe fürs Gehirn ---
    const brain = new THREE.Group();
    scene.add(brain);
    brainRef.current = brain;

    // --- GLB laden (KORREKTER PFAD!) ---
    // WICHTIG: Datei nach public/assets/models/brain.glb legen
    const BRAIN_URL = (process.env.PUBLIC_URL || "") + "/assets/models/brain.glb";

    const loader = new GLTFLoader();
    // Falls dein brain.glb DRACO-komprimiert ist:
    const draco = new DRACOLoader();
    draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(draco);

    loader.load(
      BRAIN_URL,
      (gltf) => {
        const root = gltf.scene;

        // Nie weg-culllen (verhindert sporadisches "Verschwinden")
        root.traverse((o) => { o.frustumCulled = false; });

        // Normalisieren & zentrieren
        const box = new THREE.Box3().setFromObject(root);
        const size = new THREE.Vector3(); box.getSize(size);
        const scale = 1.95 / Math.max(size.x, size.y, size.z || 1);
        root.scale.setScalar(scale);
        box.setFromObject(root);
        const center = new THREE.Vector3(); box.getCenter(center);
        root.position.sub(center);

        // Material leicht "medizinisch" (matt, gut sichtbar)
        root.traverse((o) => {
          if (o.isMesh && o.material) {
            if ("roughness" in o.material) o.material.roughness = 0.35;
            if ("metalness" in o.material) o.material.metalness = 0.0;
            // Keine Transparenz, kein Depth-Zicken
            o.material.transparent = false;
            o.material.depthTest = true;
            o.material.side = THREE.FrontSide;
            o.material.needsUpdate = true;
          }
        });

        brain.add(root);
      },
      undefined,
      (err) => {
        console.error("[GLB] load error:", BRAIN_URL, err);
      }
    );

    // --- Welt -> Screen-Projektion ---
    const worldToScreen = (v3) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const p = v3.clone().project(camera);
      return { x: (p.x * 0.5 + 0.5) * rect.width, y: (-p.y * 0.5 + 0.5) * rect.height, rect };
    };

    // --- Animate ---
    const animate = () => {
      // Hotspots positionieren (DOM, keine React-States)
      HOTSPOTS.forEach((h) => {
        const btn = btnRefs.current[h.key];
        if (!btn) return;
        const local = new THREE.Vector3(...h.pos);
        brain.localToWorld(local);
        const { x, y } = worldToScreen(local);
        btn.style.left = `${x}px`;
        btn.style.top  = `${y}px`;
      });

      // Popover an aktiven Button andocken
      if (selectedRef.current && popRef.current) {
        const anchor = btnRefs.current[selectedRef.current.key];
        if (anchor) {
          const rect = renderer.domElement.getBoundingClientRect();
          const bx = parseFloat(anchor.style.left) || rect.width / 2;
          const by = parseFloat(anchor.style.top)  || rect.height / 2;
          const side = bx > rect.width / 2 ? "left" : "right";
          popRef.current.dataset.side = side;
          popRef.current.style.left = `${bx}px`;
          popRef.current.style.top  = `${by}px`;
        }
      }

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    // --- Resize ---
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
  }, []);

  return (
    <section id="neurotechnik" className="nt-section">
      <header className="nt-header">
        <h1 className="nt-title">Neurotechnische&nbsp;Funktionaldiagnostik</h1>
        <p className="nt-sub">Uniklinik Frankfurt · Messung, Qualitätssicherung & IT-gestützte Auswertung</p>
      </header>

      <div className="nt-wrap">
        {/* Transparenter 3D-Canvas */}
        <div ref={hostRef} className="nt-canvas" />

        {/* Klar sichtbare +-Marker */}
        {HOTSPOTS.map((h) => (
          <button
            key={h.key}
            ref={(el) => (btnRefs.current[h.key] = el)}
            className="nt-hotspot"
            onClick={() => setSelected(h)}
            aria-label={`${h.name} anzeigen`}
          >
            +
          </button>
        ))}

        {/* Popover: erscheint neben dem Hotspot */}
        {selected && (
          <div ref={popRef} className="nt-popover">
            <div className="nt-card">
              <div className="nt-card-title">{selected.name}</div>
              <ul className="nt-card-list">
                {selected.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <button className="nt-close" onClick={() => setSelected(null)} aria-label="Schließen">
                Schließen
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
