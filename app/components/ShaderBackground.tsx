"use client";

import { ShaderGradientCanvas, ShaderGradient } from "shadergradient";
import { useEffect, useState } from "react";

export default function ShaderBackground() {
  const [mouse, setMouse] = useState({x:0,y:0});
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const move = (e:MouseEvent)=>{
      setMouse({
        x:e.clientX/window.innerWidth,
        y:e.clientY/window.innerHeight
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove",move);
    window.addEventListener("scroll", handleScroll);

    return ()=>{
      window.removeEventListener("mousemove",move);
      window.removeEventListener("scroll", handleScroll);
    };
  },[]);


  return (
    <div className="shader" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
      <ShaderGradientCanvas
        style={{
          position:"fixed",
          inset:0,
          zIndex:-1
        }}
      >
        <ShaderGradient
          animate="on"
          type="waterPlane"

          color1="#ffffff"
          color2="#d9e9ff"
          color3="#7fa3d1"

          brightness={1.2}
          cAzimuthAngle={180}
          cDistance={3.8}
          cPolarAngle={90}

          envPreset="city"

          grain="on"

          reflection={0.3}

          uSpeed={0.15}
          uStrength={1.2}
          uTime={3}
        />
      </ShaderGradientCanvas>
    </div>
  );
}
