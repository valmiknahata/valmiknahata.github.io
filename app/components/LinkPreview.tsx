"use client";

import { useState } from "react";

export default function LinkPreview({
  href,
  domain,
  children,
}: {
  href: string;
  domain: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(href)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <span
      className="link-preview-wrap"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a href={href} target="_blank" rel="noopener">
        {children}
      </a>
      <span className={`preview-card${hovered ? " preview-card-visible" : ""}`}>
        <span className="preview-chrome">
          <span className="preview-dot" />
          <span className="preview-dot" />
          <span className="preview-dot" />
          <span className="preview-url">{domain}</span>
        </span>
        {hovered && (
          <img
            src={screenshotUrl}
            alt={`Preview of ${domain}`}
            loading="lazy"
            className="preview-img"
          />
        )}
      </span>
    </span>
  );
}
