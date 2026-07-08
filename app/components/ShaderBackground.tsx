"use client";

import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";
import { useEffect, useState } from "react";

export default function ShaderBackground() {
  const [mouse, setMouse] = useState({x:0,y:0});

  useEffect(() => {
    const move = (e:MouseEvent)=>{
      setMouse({
        x:e.clientX/window.innerWidth,
        y:e.clientY/window.innerHeight
      });
    };

    window.addEventListener("mousemove",move);

    return ()=>window.removeEventListener("mousemove",move);
  },[]);


  return (
    <div className="shader">
      <ShaderGradientCanvas
        style={{
          position:"fixed",
          inset:0,
          zIndex:-1
        }}
      >
        <ShaderGradient
          animate="off"
          type="waterPlane"

          color1="#ffffff"
          color2="#b9dcff"
          color3="#0066ff"

          brightness={1.2}
          cAzimuthAngle={180}
          cDistance={3.8}
          cPolarAngle={90}

          envPreset="city"

          grain="on"
          grainSize={0.08}

          reflection={0.3}

          uSpeed={0.15}
          uStrength={1.2}

          mouseInteraction={true}

          zoomOut={false}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
