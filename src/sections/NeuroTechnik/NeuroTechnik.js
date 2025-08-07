import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const PART_INFO = {
  Cerebrum: {
    title: "Großhirn (Cortex)",
    bullets: [
      "DICOM-Workflows (PACS, Routing, Pseudonymisierung)",
      "Bildqualität & Artefaktanalyse (SNR, Uniformity)",
      "fMRT/DTI Daten-Handling & Protokollpflege"
    ]
  },
  Cerebellum: {
    title: "Kleinhirn",
    bullets: [
      "MRT-Parameter/Protokolle mit Technik abgestimmt",
      "Störungsanalyse anhand Geräte-Logs",
      "Qualitätssicherung automatisiert"
    ]
  },
  Brainstem: {
    title: "Hirnstamm",
    bullets: [
      "Ausfall-/Eskalationspfade dokumentiert",
      "Sicherheits- & Datenschutzkonzepte (MedTech)",
      "Schulungen zur Bildkette/IT"
    ]
  }
};

const fallbackInfo = (name) => ({
  title: `Struktur: ${name}`,
  bullets: [
    "Dokumentation & Messprotokolle gepflegt",
    "Fehlerbilder klassifiziert und nachverfolgt"
  ]
});

export default function NeuroTechnik() {
  const mountRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = 420;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Scene + Camera
    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.7, 2.2);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(2, 2, 2);
    scene.add(dir);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.minDistance = 1.6;
    controls.maxDistance = 3.2;

    // Raycaster für Klicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let INTERSECTED = null;

    // Brain laden
    const group = new THREE.Group();
    scene.add(group);

    const loader = new GLTFLoader();
    loader.load(
      "/assets/models/brain.glb",
      (gltf) => {
        const root = gltf.scene;
        // Optionale Normalisierung/Skalierung
        root.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = false;
            o.receiveShadow = false;
            o.userData._baseColor = o.material.color.getHex();
            o.material.transparent = false;
          }
        });
        // zentrieren/skalieren
        const box = new THREE.Box3().setFromObject(root);
        const size = new THREE.Vector3();
        box.getSize(size);
        const scale = 1.2 / Math.max(size.x, size.y, size.z);
        root.scale.setScalar(scale);
        box.setFromObject(root);
        const center = new THREE.Vector3();
        box.getCenter(center);
        root.position.sub(center); // Zentrum auf (0,0,0)

        group.add(root);
      },
      undefined,
      (err) => console.error("GLB load error:", err)
    );

    // Rotation
    let stopRotation = false;
    const animate = () => {
      if (!stopRotation) group.rotation.y += 0.003; // langsame Rotation
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Events
    const onResize = () => {
      const w = mount.clientWidth;
      const h = height;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * -2 + 1; // invert X für DOM->WebGL?
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const meshes = [];
      group.traverse((o) => o.isMesh && meshes.push(o));
      const hits = raycaster.intersectObjects(meshes, true);
      if (hits.length) {
        document.body.style.cursor = "pointer";
        INTERSECTED = hits[0].object;
      } else {
        document.body.style.cursor = "default";
        INTERSECTED = null;
      }
    };

    const onClick = () => {
      if (!INTERSECTED) return;
      stopRotation = true;
      const name = INTERSECTED.name || "Unbekannt";
      const info = PART_INFO[name] || fallbackInfo(name);

      // Highlight: Farbe ändern
      group.traverse((o) => {
        if (o.isMesh && o.userData._baseColor) {
          o.material.color.setHex(o.userData._baseColor);
        }
      });
      INTERSECTED.material = INTERSECTED.material.clone();
      INTERSECTED.material.color.set("#66aaff");

      setSelected({ name, info });
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

  return (
    <section id="neurotechnik" style={{ padding: "40px 0" }}>
      <h1 style={{ margin: "0 0 12px" }}>NeuroTechnik</h1>
      <p style={{ margin: "0 0 16px", opacity: 0.85 }}>
        3D-Gehirn: rotiert langsam. Klicke auf Bereiche für Details.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(280px, 1.2fr) minmax(240px, 0.8fr)",
        gap: 16,
        alignItems: "stretch"
      }}>
        <div ref={mountRef}
             style={{ background: "#0b0f16", borderRadius: 12, overflow: "hidden", minHeight: 420 }} />
        <aside style={{ border: "1px solid rgba(0,0,0,.08)", borderRadius: 12, padding: 16, background: "#fff" }}>
          <h3 style={{ marginTop: 0 }}>
            {selected?.info?.title || "Bereich wählen"}
          </h3>
          <ul style={{ margin: "8px 0 0 18px" }}>
            {(selected?.info?.bullets || [
              "Klicke auf Großhirn, Kleinhirn oder Hirnstamm.",
              "Die zugehörigen Tätigkeiten erscheinen hier."
            ]).map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </aside>
      </div>
    </section>
  );
}
