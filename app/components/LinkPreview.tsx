"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

export default function LinkPreview({
  href,
  domain,
  children,
  linkStyle,
  title,
}: {
  href: string;
  domain: string;
  children: React.ReactNode;
  linkStyle?: CSSProperties;
  title?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(href)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <span
      className="link-preview-wrap"
      onMouseEnter={(e) => {
        setPos({ x: e.clientX, y: e.clientY });
        setHovered(true);
      }}
      onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setHovered(false)}
    >
      <a href={href} target="_blank" rel="noopener" style={linkStyle} title={title}>
        {children}
      </a>
      <span
        className={`preview-card${hovered ? " preview-card-visible" : ""}`}
        style={{ left: pos.x + 20, top: pos.y - 65 }}
      >
        <span className="preview-chrome">
          <span className="preview-dot preview-dot-red" />
          <span className="preview-dot preview-dot-yellow" />
          <span className="preview-dot preview-dot-green" />
          <span className="preview-url">
            <span className="preview-lock">🔒</span>
            {domain}
          </span>
        </span>
        <img
          src={screenshotUrl}
          alt={`Preview of ${domain}`}
          loading="eager"
          className="preview-img"
        />
      </span>
    </span>
  );
}
