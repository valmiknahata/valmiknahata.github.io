"use client";

import dynamic from "next/dynamic";

const ShaderBackground = dynamic(() => import("./ShaderBackground"), {
  ssr: false,
});

export default function ShaderBackgroundClient({ uTimeOffset }: { uTimeOffset?: number }) {
  return <ShaderBackground uTimeOffset={uTimeOffset} />;
}
