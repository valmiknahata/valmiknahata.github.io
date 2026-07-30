import Link from "next/link";
import ShaderBackground from "./components/ShaderBackgroundClient";
import LinkPreview from "./components/LinkPreview";
import EstClockHeader from "./components/EstClockHeader";

export default function Home() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "transparent", color: "#000000" }}>
      <section className="section-essay" style={{ padding: "24px 60px 80px 60px", maxWidth: "925px", margin: "0 auto", width: "925px", boxSizing: "border-box" }}>
        <div style={{ fontSize: "18px", lineHeight: 1.9, color: "#1a1a1a", fontFamily: "'Crimson Text', serif" }}>
          <EstClockHeader />

          <p className="bio" style={{ margin: "0 0 1.33em 0" }}>I'm Valmik, an undergraduate student and researcher at <LinkPreview href="https://ucsd.edu" domain="ucsd.edu">UC San Diego</LinkPreview> studying Data Science, with a focus on building AI systems that are both powerful and aligned. I'm a research affiliate at <LinkPreview href="https://www.massgeneral.org" domain="massgeneral.org">Mass General</LinkPreview> &amp; <LinkPreview href="https://hms.harvard.edu" domain="hms.harvard.edu">Harvard Medical School</LinkPreview> working on clinical AI systems, a member of <LinkPreview href="https://aialignment.mit.edu" domain="aialignment.mit.edu">MIT AI Alignment</LinkPreview>, and a UCSD Poseidon Fellow. Before that, as a research intern at <LinkPreview href="https://www.dartmouth-hitchcock.org" domain="dartmouth-hitchcock.org">Dartmouth Hitchcock Medical Center</LinkPreview> &amp; <LinkPreview href="https://www.dartmouth-health.org" domain="dartmouth-health.org">Dartmouth Health</LinkPreview>, I presented on an optimized retrieval system for pathology reports. My work has been recognized by <LinkPreview href="https://www.apartresearch.com" domain="apartresearch.com">Apart Research</LinkPreview> &amp; <LinkPreview href="https://bluedot.org" domain="bluedot.org">BlueDot Impact</LinkPreview>, <LinkPreview href="https://ucsd.edu" domain="ucsd.edu">UCSD</LinkPreview> &amp; <LinkPreview href="https://www.nsf.gov" domain="nsf.gov">NSF</LinkPreview>, and the <LinkPreview href="https://www.nba.com/bucks" domain="nba.com">Milwaukee Bucks</LinkPreview>, among others. My research interests are AI × bio and AI safety.</p>

          <div className="divider">
            <ShaderBackground />
          </div>

          <p style={{ margin: "1.56em 0" }}>
            <Link href="/philosophy" style={{ textDecoration: "underline", color: "#1a1a1a" }}>
              &gt; To those interested in my philosophy, my <em>why</em>
            </Link>
          </p>

          <div className="social-links" style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center", margin: "2.5em 0 0 0" }}>
            <a href="mailto:vnahata@mgh.harvard.edu" style={{ textDecoration: "none", color: "#000000" }} title="Email">
              {/* @ts-ignore */}
              <iconify-icon icon="lucide:mail" width="20" height="20" style={{ display: "block", color: "#000000" }}></iconify-icon>
            </a>
            <LinkPreview href="https://linkedin.com/in/valmiknahata" domain="linkedin.com" title="LinkedIn" linkStyle={{ textDecoration: "none", color: "#000000" }}>
              {/* @ts-ignore */}
              <iconify-icon icon="simple-icons:linkedin" width="20" height="20" style={{ display: "block", color: "#000000" }}></iconify-icon>
            </LinkPreview>
            <LinkPreview href="https://scholar.google.com/citations?user=nv1ym54AAAAJ" domain="scholar.google.com" title="Google Scholar" linkStyle={{ textDecoration: "none", color: "#000000" }}>
              {/* @ts-ignore */}
              <iconify-icon icon="simple-icons:googlescholar" width="20" height="20" style={{ display: "block", color: "#000000" }}></iconify-icon>
            </LinkPreview>
            <LinkPreview href="https://x.com/valmiknahata" domain="x.com" title="X" linkStyle={{ textDecoration: "none", color: "#000000" }}>
              {/* @ts-ignore */}
              <iconify-icon icon="simple-icons:x" width="20" height="20" style={{ display: "block", color: "#000000" }}></iconify-icon>
            </LinkPreview>
            <LinkPreview href="https://github.com/nahatav" domain="github.com" title="GitHub" linkStyle={{ textDecoration: "none", color: "#000000" }}>
              {/* @ts-ignore */}
              <iconify-icon icon="simple-icons:github" width="20" height="20" style={{ display: "block", color: "#000000" }}></iconify-icon>
            </LinkPreview>
          </div>

        </div>
      </section>
    </div>
  );
}
