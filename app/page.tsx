import ShaderBackground from "./components/ShaderBackgroundClient";
import LinkPreview from "./components/LinkPreview";

export default function Home() {
  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "transparent", color: "#000000" }}>
      <section className="section-essay" style={{ padding: "80px 60px", maxWidth: "925px", margin: "0 auto", width: "925px", boxSizing: "border-box" }}>
        <div style={{ fontSize: "18px", lineHeight: 1.9, color: "#1a1a1a", fontFamily: "'Crimson Text', serif" }}>

          <p className="bio" style={{ margin: "0 0 1.33em 0" }}>I'm Valmik, an undergraduate student and researcher at <LinkPreview href="https://ucsd.edu" domain="ucsd.edu">UC San Diego</LinkPreview> studying Data Science, with a focus on building AI systems that are both powerful and aligned. I'm a research affiliate at <LinkPreview href="https://www.massgeneral.org" domain="massgeneral.org">Mass General</LinkPreview> &amp; <LinkPreview href="https://hms.harvard.edu" domain="hms.harvard.edu">Harvard Medical School</LinkPreview> working on clinical AI systems, a member of <LinkPreview href="https://aialignment.mit.edu" domain="aialignment.mit.edu">MIT AI Alignment</LinkPreview>, and a UCSD Poseidon Fellow. Before that, as a research intern at <LinkPreview href="https://www.dartmouth-hitchcock.org" domain="dartmouth-hitchcock.org">Dartmouth Hitchcock Medical Center</LinkPreview> &amp; <LinkPreview href="https://www.dartmouth-health.org" domain="dartmouth-health.org">Dartmouth Health</LinkPreview>, I presented on an optimized retrieval system for pathology reports. My work has been recognized by <LinkPreview href="https://www.apartresearch.com" domain="apartresearch.com">Apart Research</LinkPreview> &amp; <LinkPreview href="https://bluedot.org" domain="bluedot.org">BlueDot Impact</LinkPreview>, <LinkPreview href="https://ucsd.edu" domain="ucsd.edu">UCSD</LinkPreview> &amp; <LinkPreview href="https://www.nsf.gov" domain="nsf.gov">NSF</LinkPreview>, and the <LinkPreview href="https://www.nba.com/bucks" domain="nba.com">Milwaukee Bucks</LinkPreview>, among others. My research interests are AI × bio and AI safety.</p>

          <div className="divider">
            <ShaderBackground />
          </div>

          <p style={{ margin: "2.22em 0 1.56em 0" }}>To those interested in my philosophy, my <em>why</em>:</p>

          <p style={{ margin: "0 0 1.56em 0", clear: "both" }}>Every capability that counts as intelligence eventually turns inward. A system competent enough to write production code can be turned on the training pipeline that produced it, and one fluent in research can aim that research at its own architecture. This has already left the realm of thought experiment. Something like a quarter of the code committed inside frontier labs is now model-authored. DeepMind's AlphaEvolve, an evolutionary coding agent built on Gemini, found a matrix-multiplication scheme that beat the best human result standing since Strassen in 1969, and separately clawed back close to a percent of Google's datacenter compute, the very substrate on which the next training run executes. OpenAI has models emitting plain-English descriptions of individual neurons inside other networks, an early pass at automated interpretability. Once the loop closes, progress decouples from the compute a lab can afford to buy and recouples to the compute the system elects to spend on itself. The endpoint gets labeled superintelligence, though the driving mechanism is more mundane: recursive self-improvement, i.e. optimization applied to the process of optimization itself.</p>

          <p style={{ margin: "0 0 1.56em 0" }}>Biology is the first domain that loop touches at full strength. In 2022 a team of drug-discovery researchers inverted the sign on the toxicity term of one of their own generative models; inside six hours it enumerated some forty thousand candidate toxins, reconstructing the nerve agent VX and proposing analogues absent from any catalogue. The same architecture underwrites AlphaFold, which resolved structures for more than two hundred million proteins and folded a century of crystallography into a single release, while genomic foundation models such as Evo now read and generate nucleotide sequence end to end. Elsewhere a capable model is an accelerant with generous error tolerance; in the life sciences that tolerance narrows to a knife-edge, since the weights that specify a therapeutic and the weights that specify a pathogen sit a single objective function apart. A capability overhang here meets its least forgiving consequences, and the cost of a misspecified reward is counted in lives, well past the scale of dollars or downtime.</p>

          <p style={{ margin: "0 0 1.56em 0" }}>Deceleration lost to economics some time ago, so the workable objective becomes <em>legibility</em>. Mechanistic interpretability is the closest thing to a microscope for cognition that currently exists, and over the past few years it has begun to deliver. Reverse-engineering a small transformer trained only on modular addition showed that it had, unprompted, implemented the discrete Fourier transform in its weights, computing the sum through trigonometric identities. A network trained on nothing but Othello transcripts turned out to maintain an explicit board state in its activations, a world model no gradient signal had asked for. Anthropic's sparse autoencoders pull millions of monosemantic features out of superposition, among them a direction in Claude's activation space that fires on the Golden Gate Bridge, flanked by features for deception and sycophancy. Linear probes recover enough of a model's internal state to flag a chain of thought that has committed to a falsehood before the sentence resolves, and targeted unlearning methods, benchmarked on suites such as WMDP, can excise the knowledge needed to synthesize a select agent, going past the surface refusal a jailbreak can strip away. If a mind is going to improve itself, the priority is to read what it values while that mind still fits in human hands.</p>

          <p style={{ margin: "0 0 1.56em 0" }}>Anthropic's own Claude Mythos model card states this plainly. Mythos is the best-aligned model the lab has shipped, yet the report judges it the one posing the greatest alignment risk, because its capabilities in autonomous research and engineering now far outstrip any earlier model. As a system grows more capable, more autonomous, and more heavily relied upon, the average failure grows rarer while the failures that slip through grow far more consequential, which is why the automated research loop is where the stakes climb fastest.</p>

          <p style={{ margin: "0 0 1.56em 0" }}>The open question is one of pace: whether a system can be understood faster than it can surprise. For now the honest answer is no. The task is to read the mind before it learns to read itself, on the wager that the timeline still allows it. Few problems this consequential turn out to be tractable, and this one appears to be both.</p>

          <p style={{ margin: "0 0 1.56em 0" }}><strong>TL;DR:</strong> Recursive self-improvement is the precursor to superintelligence. AI × bio and AI safety are the problems that compound faster than anyone can afford to ignore.</p>

          <div className="divider">
            <ShaderBackground uTimeOffset={40} flip />
          </div>

          <div className="social-links" style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center", margin: 0 }}>
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
