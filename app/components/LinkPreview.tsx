"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

let previewLoadCounter = 0;

function buildScreenshotUrl(href: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(href)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1200&viewport.height=800`;
}

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
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const indexRef = useRef<number | null>(null);
  const retriedRef = useRef(false);

  if (indexRef.current === null) {
    indexRef.current = previewLoadCounter;
    previewLoadCounter += 1;
  }

  useEffect(() => {
    const delay = (indexRef.current ?? 0) * 350;
    const timer = setTimeout(() => setSrc(buildScreenshotUrl(href)), delay);
    return () => clearTimeout(timer);
  }, [href]);

  const handleError = () => {
    if (!retriedRef.current) {
      retriedRef.current = true;
      setTimeout(() => setSrc(`${buildScreenshotUrl(href)}&_retry=1`), 800);
    } else {
      setFailed(true);
    }
  };

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
        <span className="preview-img-wrap">
          {src && !failed && (
            <img
              src={src}
              alt={`Preview of ${domain}`}
              loading="eager"
              className="preview-img"
              onError={handleError}
            />
          )}
          {(!src || failed) && <span className="preview-img-placeholder" />}
        </span>
      </span>
    </span>
  );
}
