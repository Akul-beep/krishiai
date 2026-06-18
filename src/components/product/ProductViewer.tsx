"use client";

import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Center, Line, OrbitControls, useGLTF } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import {
  MODEL_SCALE,
  MODEL_URL,
  MODEL_INITIAL_Y_ROTATION,
  SOIL_HUB,
  VIEWER_FIT_MARGIN,
  VIEWER_FRAME_Y_BIAS,
  allParts,
  getHotspotPosition,
  productHotspots,
  soilProbes,
  type ProductHotspot,
  type SoilProbe,
} from "@/lib/product-hotspots";

const MARKER_COLOR = "#b8f038";
const MARKER_COLOR_ACTIVE = "#4dabf7";
const CORE_RADIUS = 0.016;

function fitCameraToModel(
  meshRoot: THREE.Object3D,
  camera: THREE.PerspectiveCamera,
  controls: OrbitControlsImpl,
  viewport: { width: number; height: number }
) {
  meshRoot.updateWorldMatrix(true, true);

  const box = new THREE.Box3().setFromObject(meshRoot);
  if (box.isEmpty()) return false;

  const center = box.getCenter(new THREE.Vector3());
  const boxSize = box.getSize(new THREE.Vector3());
  const aspect = viewport.width / viewport.height;
  const fovRad = (camera.fov * Math.PI) / 180;
  const tanHalfFov = Math.tan(fovRad / 2);

  const fitHeightDistance = boxSize.y / (2 * tanHalfFov);
  const fitWidthDistance = boxSize.x / (2 * tanHalfFov * aspect);
  const fitDepthDistance = boxSize.z / (2 * tanHalfFov);
  const distance =
    VIEWER_FIT_MARGIN * Math.max(fitHeightDistance, fitWidthDistance, fitDepthDistance);

  const target = center.clone();
  const viewDir = new THREE.Vector3(0.1, 0.05, 1).normalize();
  camera.position.copy(target).addScaledVector(viewDir, distance);
  camera.near = Math.max(distance / 200, 0.01);
  camera.far = distance * 200;
  camera.updateProjectionMatrix();

  controls.target.copy(target);
  controls.target.y -= boxSize.y * VIEWER_FRAME_Y_BIAS;
  controls.minDistance = distance;
  controls.maxDistance = distance;
  controls.update();

  return true;
}

function CameraFit({
  meshRef,
  onFitted,
}: {
  meshRef: RefObject<THREE.Group | null>;
  onFitted?: () => void;
}) {
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;
  const controls = useThree((state) => state.controls) as OrbitControlsImpl | null;
  const viewport = useThree((state) => state.size);
  const fitted = useRef(false);

  useLayoutEffect(() => {
    fitted.current = false;
  }, [VIEWER_FIT_MARGIN, VIEWER_FRAME_Y_BIAS]);

  useFrame(() => {
    if (fitted.current || !meshRef.current || !controls) return;
    if (fitCameraToModel(meshRef.current, camera, controls, viewport)) {
      fitted.current = true;
      onFitted?.();
    }
  });

  return null;
}

function PinScreenTracker({
  position,
  onPosition,
}: {
  position: [number, number, number];
  onPosition: (point: { x: number; y: number }) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const { camera, size } = useThree();
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.getWorldPosition(vec);
    vec.project(camera);
    onPosition({
      x: (vec.x * 0.5 + 0.5) * size.width,
      y: (-vec.y * 0.5 + 0.5) * size.height,
    });
  });

  return <group ref={ref} position={position} />;
}

function NeonDot({
  position,
  active,
  onSelect,
}: {
  position: [number, number, number];
  active: boolean;
  onSelect: () => void;
}) {
  const glowRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.6) * 0.16;
    const scale = pulse * (active ? 1.25 : 1);
    glowRef.current?.scale.setScalar(scale * (active ? 3.2 : 2.8));
    coreRef.current?.scale.setScalar(scale);
  });

  const dotColor = active ? MARKER_COLOR_ACTIVE : MARKER_COLOR;

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <group position={position}>
      <mesh
        onClick={handleClick}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "")}
      >
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[CORE_RADIUS, 16, 16]} />
        <meshBasicMaterial
          color={dotColor}
          transparent
          opacity={active ? 0.65 : 0.38}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={coreRef}>
        <sphereGeometry args={[CORE_RADIUS, 16, 16]} />
        <meshBasicMaterial color={dotColor} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.005]} scale={active ? 0.42 : 0.35}>
        <sphereGeometry args={[CORE_RADIUS, 12, 12]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={active ? 0.7 : 0.55} toneMapped={false} />
      </mesh>
    </group>
  );
}

function PointMarker({
  hotspot,
  active,
  onSelect,
}: {
  hotspot: ProductHotspot;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  return <NeonDot position={hotspot.position} active={active} onSelect={() => onSelect(hotspot.id)} />;
}

function SoilProbeMarker({
  probe,
  active,
  onSelect,
}: {
  probe: SoilProbe;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  const linePoints = useMemo(
    () => [new THREE.Vector3(...SOIL_HUB), new THREE.Vector3(...probe.tip)],
    [probe.tip]
  );

  return (
    <group>
      <Line
        points={linePoints}
        color={active ? MARKER_COLOR_ACTIVE : MARKER_COLOR}
        transparent
        opacity={active ? 0.95 : 0.5}
        lineWidth={active ? 1.5 : 1}
      />
      <NeonDot position={probe.tip} active={active} onSelect={() => onSelect(probe.id)} />
    </group>
  );
}

function ProductModelWithMarkers({
  meshFitRef,
  activeId,
  onSelect,
  onPinScreenPosition,
}: {
  meshFitRef: RefObject<THREE.Group | null>;
  activeId: string | null;
  onSelect: (id: string) => void;
  onPinScreenPosition?: (point: { x: number; y: number }) => void;
}) {
  const { scene } = useGLTF(MODEL_URL);
  const activePosition = activeId ? getHotspotPosition(activeId) : null;

  return (
    <group ref={meshFitRef} scale={MODEL_SCALE} rotation={[0, MODEL_INITIAL_Y_ROTATION, 0]}>
      <Center>
        <primitive object={scene} />
      </Center>
      {activePosition && onPinScreenPosition && (
        <PinScreenTracker position={activePosition} onPosition={onPinScreenPosition} />
      )}
      {productHotspots.map((hotspot) => (
        <PointMarker
          key={hotspot.id}
          hotspot={hotspot}
          active={activeId === hotspot.id}
          onSelect={onSelect}
        />
      ))}
      {soilProbes.map((probe) => (
        <SoilProbeMarker
          key={probe.id}
          probe={probe}
          active={activeId === probe.id}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

function Scene({
  activeId,
  onSelect,
  onPinScreenPosition,
  isInView,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
  onPinScreenPosition?: (point: { x: number; y: number }) => void;
  isInView: boolean;
}) {
  const meshFitRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const initialAzimuth = useRef<number | null>(null);
  const [interacting, setInteracting] = useState(false);

  const saveInitialAzimuth = () => {
    const controls = controlsRef.current;
    if (!controls) return;
    initialAzimuth.current = controls.getAzimuthalAngle();
  };

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls || initialAzimuth.current === null || isInView) return;
    controls.setAzimuthalAngle(initialAzimuth.current);
    controls.update();
  }, [isInView]);

  return (
    <>
      <color attach="background" args={["#161616"]} />
      <ambientLight intensity={0.95} />
      <hemisphereLight args={["#ffffff", "#444444", 0.65]} />
      <directionalLight position={[5, 8, 4]} intensity={2.2} />
      <directionalLight position={[-4, 3, -2]} intensity={0.7} />
      <Suspense fallback={null}>
        <ProductModelWithMarkers
          meshFitRef={meshFitRef}
          activeId={activeId}
          onSelect={onSelect}
          onPinScreenPosition={onPinScreenPosition}
        />
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        enablePan
        enableZoom={false}
        panSpeed={0.85}
        autoRotate={isInView && !interacting}
        autoRotateSpeed={-0.4}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI / 1.25}
        onStart={() => setInteracting(true)}
        onEnd={() => setInteracting(false)}
      />
      <CameraFit meshRef={meshFitRef} onFitted={saveInitialAzimuth} />
    </>
  );
}

function ComponentChipBar({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="border-t border-outline/50 bg-gradient-to-b from-white to-surface-muted/60 px-4 py-3.5 sm:px-5">
      <div className="flex flex-wrap gap-2">
        {allParts.map((part) => {
          const isActive = activeId === part.id;
          return (
            <button
              key={part.id}
              type="button"
              onClick={() => onSelect(part.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#1a1a1a] text-white shadow-sm"
                  : "bg-white text-on-surface-variant ring-1 ring-outline/70 hover:ring-outline hover:text-[#1a1a1a]"
              }`}
            >
              {part.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ProductViewer({
  activeId,
  onSelect,
  onPinScreenPosition,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
  onPinScreenPosition?: (point: { x: number; y: number } | null) => void;
}) {
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = canvasWrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePinScreenPosition = useMemo(() => {
    if (!onPinScreenPosition) return undefined;
    return (canvasPoint: { x: number; y: number }) => {
      const rect = canvasWrapRef.current?.getBoundingClientRect();
      if (!rect) return;
      onPinScreenPosition({
        x: rect.left + canvasPoint.x,
        y: rect.top + canvasPoint.y,
      });
    };
  }, [onPinScreenPosition]);

  useLayoutEffect(() => {
    if (!activeId) onPinScreenPosition?.(null);
  }, [activeId, onPinScreenPosition]);

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] ring-1 ring-black/[0.08] shadow-[var(--shadow-soft)]">
      <div ref={canvasWrapRef} className="relative aspect-[4/5] w-full bg-[#161616] sm:aspect-square">
        <p className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white/70 backdrop-blur-sm pointer-events-none">
          Drag to rotate · right-click to pan
        </p>
        <Canvas
          className="absolute inset-0 touch-none"
          camera={{ position: [0, 0, 5], fov: 36, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          onCreated={({ gl }) => {
            gl.setClearColor("#161616");
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.15;
          }}
          dpr={[1, 2]}
        >
          <Scene
            activeId={activeId}
            onSelect={onSelect}
            onPinScreenPosition={handlePinScreenPosition}
            isInView={isInView}
          />
        </Canvas>
      </div>

      <ComponentChipBar activeId={activeId} onSelect={onSelect} />
    </div>
  );
}

useGLTF.preload(MODEL_URL);
