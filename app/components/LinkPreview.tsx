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
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;

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
            <svg className="preview-lock" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" />
            </svg>
            {domain}
          </span>
        </span>
        <span className="preview-body">
          <img src={faviconUrl} alt="" className="preview-favicon" />
          <span className="preview-domain-label">{domain}</span>
        </span>
      </span>
    </span>
  );
}
