import React, { useEffect, useRef, useState, useContext } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import StyleContext from "../../contexts/StyleContext";

const PART_INFO = {
  Cerebrum: { title: "Großhirn (Cortex)", bullets: ["DICOM-Workflows (PACS, Routing, Pseudonymisierung)", "Bildqualität & Artefaktanalyse (SNR, Uniformity)", "fMRT/DTI Daten-Handling & Protokollpflege"] },
  Cerebellum: { title: "Kleinhirn", bullets: ["MRT-Parameter/Protokolle mit Technik abgestimmt", "Störungsanalyse anhand Geräte-Logs", "Qualitätssicherung automatisiert"] },
  Brainstem: { title: "Hirnstamm", bullets: ["Ausfall-/Eskalationspfade dokumentiert", "Sicherheits- & Datenschutzkonzepte (MedTech)", "Schulungen zur Bildkette/IT"] }
};
const fallbackInfo = (name) => ({ title: `Struktur: ${name}`, bullets: ["Dokumentation & Messprotokolle gepflegt", "Fehlerbilder klassifiziert und nachverfolgt"] });

export default function NeuroTechnik() {
  const mountRef = useRef(null);
  const { isDark } = useContext(StyleContext);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = 420;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.7, 2.2);

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(2, 2, 2);
    scene.add(dir);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 1.6;
    controls.maxDistance = 3.2;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hit = null;

    const group = new THREE.Group();
    scene.add(group);

    const loader = new GLTFLoader();
    loader.load(
      "/assets/models/brain.glb",
      (gltf) => {
        const root = gltf.scene;
        root.traverse((o) => {
          if (o.isMesh) {
            o.userData._baseColor = o.material.color.getHex();
          }
        });
        // Normalisieren & zentrieren
        const box = new THREE.Box3().setFromObject(root);
        const size = new THREE.Vector3();
        box.getSize(size);
        const scale = 1.2 / Math.max(size.x, size.y, size.z);
        root.scale.setScalar(scale);
        box.setFromObject(root);
        const center = new THREE.Vector3();
        box.getCenter(center);
        root.position.sub(center);
        group.add(root);
      },
      undefined,
      (err) => console.error("GLB load error:", err)
    );

    let stopRotation = false;
    const animate = () => {
      if (!stopRotation) group.rotation.y += 0.003;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const onPointerMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const meshes = [];
      group.traverse((o) => o.isMesh && meshes.push(o));
      const hits = raycaster.intersectObjects(meshes, true);
      document.body.style.cursor = hits.length ? "pointer" : "default";
      hit = hits.length ? hits[0].object : null;
    };

    const onClick = () => {
      if (!hit) return;
      stopRotation = true;
      const name = hit.name || "Unbekannt";
      const info = PART_INFO[name] || fallbackInfo(name);
      // Reset Farben, highlight Auswahl
      group.traverse((o) => o.isMesh && o.userData._baseColor && o.material.color.setHex(o.userData._baseColor));
      hit.material = hit.material.clone();
      hit.material.color.set("#66aaff");
      setSelected({ name, info });
    };

    const onResize = () => {
      const w = mount.clientWidth;
      renderer.setSize(w, height);
      camera.aspect = w / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", onResize);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("click", onClick);
      controls.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  // Theme-Farben vereinheitlichen
  const panelBg = isDark ? "#0e1624" : "#ffffff";
  const panelText = isDark ? "#e5e7eb" : "#111827";
  const border = isDark ? "1px solid rgba(255,255,255,.08)" : "1px solid rgba(0,0,0,.08)";

  return (
    <section id="neurotechnik" style={{ padding: "40px 0" }}>
      <h1 style={{ margin: "0 0 12px", color: panelText }}>NeuroTechnik</h1>
      <p style={{ margin: "0 0 16px", opacity: 0.85, color: panelText }}>
        3D-Gehirn: rotiert langsam. Klicke auf Bereiche für Details.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(280px, 1.2fr) minmax(240px, 0.8fr)",
          gap: 16,
          alignItems: "stretch"
        }}
      >
        {/* Canvas-Panel */}
        <div
          ref={mountRef}
          style={{
            background: panelBg,
            color: panelText,
            borderRadius: 12,
            overflow: "hidden",
            minHeight: 420,
            border
          }}
        />

        {/* Info-Panel */}
        <aside
          style={{
            border,
            borderRadius: 12,
            padding: 16,
            background: panelBg,
            color: panelText
          }}
        >
          <h3 style={{ marginTop: 0 }}>{selected?.info?.title || "Bereich wählen"}</h3>
          <ul style={{ margin: "8px 0 0 18px" }}>
            {(selected?.info?.bullets || [
              "Klicke auf Großhirn, Kleinhirn oder Hirnstamm.",
              "Die zugehörigen Tätigkeiten erscheinen hier."
            ]).map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
