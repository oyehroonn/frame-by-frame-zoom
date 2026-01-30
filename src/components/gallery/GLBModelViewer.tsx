import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei";
import { Suspense } from "react";

interface GLBModelViewerProps {
  className?: string;
  labelText?: string;
  modelPath?: string;
}

function Model({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

const GLBModelViewer = ({ 
  className = "", 
  labelText = "Atelier View",
  modelPath = "/models/miu-miu-dress.glb"
}: GLBModelViewerProps) => {
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(135deg, hsl(38 12% 94%) 0%, hsl(35 10% 91%) 100%)"
      }}
    >
      {/* Subtle inner border for gallery frame effect */}
      <div className="absolute inset-3 md:inset-5 border border-[hsl(30_8%_70%/0.3)] pointer-events-none z-10" />
      
      {/* Corner accents */}
      <div className="absolute top-3 left-3 md:top-5 md:left-5 w-4 h-4 border-t border-l border-[hsl(30_8%_50%/0.4)] pointer-events-none z-10" />
      <div className="absolute top-3 right-3 md:top-5 md:right-5 w-4 h-4 border-t border-r border-[hsl(30_8%_50%/0.4)] pointer-events-none z-10" />
      <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 w-4 h-4 border-b border-l border-[hsl(30_8%_50%/0.4)] pointer-events-none z-10" />
      <div className="absolute bottom-3 right-3 md:bottom-5 md:right-5 w-4 h-4 border-b border-r border-[hsl(30_8%_50%/0.4)] pointer-events-none z-10" />

      {/* Label */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 flex items-center gap-3">
        <span className="font-sans text-[11px] tracking-[0.15em] text-[hsl(30_8%_25%)] uppercase font-medium">
          {labelText}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(145_60%_40%)] animate-pulse" />
          <span className="text-[9px] font-sans tracking-[0.2em] text-[hsl(145_40%_35%)] uppercase">
            3D
          </span>
        </span>
      </div>

      {/* Interaction hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <span className="font-sans text-[9px] tracking-[0.25em] text-[hsl(30_8%_50%)] uppercase">
          Drag to rotate
        </span>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-3 md:inset-5 pt-12 pb-8">
        <Canvas
          camera={{ position: [0, 0.5, 2.5], fov: 45 }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-3, 3, -3]} intensity={0.5} />
            <pointLight position={[0, 3, 0]} intensity={0.3} />
            
            {/* Environment for reflections */}
            <Environment preset="studio" />
            
            {/* Model */}
            <Center>
              <Model path={modelPath} />
            </Center>
            
            {/* Controls */}
            <OrbitControls 
              enablePan={false}
              enableZoom={true}
              minDistance={1.5}
              maxDistance={5}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 1.5}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

// Preload the model
useGLTF.preload("/models/miu-miu-dress.glb");

export default GLBModelViewer;
