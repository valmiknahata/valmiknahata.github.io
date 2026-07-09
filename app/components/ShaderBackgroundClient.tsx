"use client";

import dynamic from "next/dynamic";

const ShaderBackground = dynamic(() => import("./ShaderBackground"), {
  ssr: false,
});

export default function ShaderBackgroundClient({ uTimeOffset, flip }: { uTimeOffset?: number; flip?: boolean }) {
  return <ShaderBackground uTimeOffset={uTimeOffset} flip={flip} />;
}
