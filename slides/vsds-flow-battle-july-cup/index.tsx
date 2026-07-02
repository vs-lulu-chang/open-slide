import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

export const design: DesignSystem = {
  palette: {
    bg: '#071016',
    text: '#f4fbfb',
    accent: '#2ee6d6',
  },
  fonts: {
    display: '"SF Pro Display", "Inter", system-ui, -apple-system, sans-serif',
    body: '"SF Pro Text", "Inter", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 58,
    body: 34,
  },
  radius: 18,
};

const palette = {
  bg: design.palette.bg,
  text: design.palette.text,
  accent: design.palette.accent,
  cyan: '#2ee6d6',
  blue: '#6aa8ff',
  green: '#67f08a',
  amber: '#ffd166',
  red: '#ff6b7a',
  panel: 'rgba(11, 26, 36, 0.86)',
  panelHi: 'rgba(16, 39, 53, 0.92)',
  panelSoft: 'rgba(46, 230, 214, 0.08)',
  line: 'rgba(154, 226, 236, 0.22)',
  lineStrong: 'rgba(46, 230, 214, 0.45)',
  muted: '#8ea7af',
  soft: '#c2d4d9',
  dim: '#47616a',
};

const font = {
  mono: '"SF Mono", "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace',
};

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  letterSpacing: 0,
  overflow: 'hidden',
};

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 220,
  exit: {
    duration: 150,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-5px)' },
    ],
  },
  enter: {
    duration: 220,
    delay: 70,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const styles = `
  @keyframes vsds-fade-up {
    from { opacity: 0; transform: translateY(18px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes vsds-dash {
    from { stroke-dashoffset: 860; }
    to { stroke-dashoffset: 0; }
  }
  @keyframes vsds-pulse {
    0%, 100% { opacity: 0.44; }
    50% { opacity: 1; }
  }
  @keyframes vsds-scan {
    0% { transform: translateX(-22%); opacity: 0; }
    15% { opacity: 0.6; }
    85% { opacity: 0.6; }
    100% { transform: translateX(122%); opacity: 0; }
  }
  .vsds-fade-1 { opacity: 0; animation: vsds-fade-up .72s cubic-bezier(.2,.7,.2,1) .05s forwards; }
  .vsds-fade-2 { opacity: 0; animation: vsds-fade-up .72s cubic-bezier(.2,.7,.2,1) .18s forwards; }
  .vsds-fade-3 { opacity: 0; animation: vsds-fade-up .72s cubic-bezier(.2,.7,.2,1) .31s forwards; }
  .vsds-dash { stroke-dasharray: 860; animation: vsds-dash 1.5s cubic-bezier(.2,.7,.2,1) forwards; }
  .vsds-pulse { animation: vsds-pulse 2.1s ease-in-out infinite; }
  .vsds-scan { animation: vsds-scan 4.8s ease-in-out infinite; }
`;

const Styles = () => <style>{styles}</style>;

const Grid = () => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      backgroundImage:
        'linear-gradient(rgba(126, 229, 239, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(126, 229, 239, 0.055) 1px, transparent 1px)',
      backgroundSize: '96px 96px',
    }}
  />
);

const ScanLine = () => (
  <div
    className="vsds-scan"
    style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: 360,
      background:
        'linear-gradient(90deg, transparent, rgba(46, 230, 214, 0.12), transparent)',
      pointerEvents: 'none',
    }}
  />
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <span>
      {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
    </span>
  );
};

const Header = ({ eyebrow }: { eyebrow: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 34,
      fontFamily: font.mono,
      fontSize: 22,
      color: palette.muted,
      letterSpacing: 0,
      textTransform: 'uppercase',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <span
        className="vsds-pulse"
        style={{
          width: 13,
          height: 13,
          borderRadius: 999,
          background: 'var(--osd-accent)',
          boxShadow: `0 0 28px ${palette.cyan}`,
        }}
      />
      {eyebrow}
    </div>
    <Footer />
  </div>
);

const PageShell = ({
  eyebrow,
  title,
  titleSize = 72,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  titleSize?: number;
  children: ReactNode;
}) => (
  <section style={fill}>
    <Styles />
    <Grid />
    <ScanLine />
    <div style={{ position: 'relative', zIndex: 1, height: '100%', padding: '92px 124px' }}>
      <Header eyebrow={eyebrow} />
      <h1
        className="vsds-fade-1"
        style={{
          margin: '34px 0 0',
          maxWidth: 1560,
          fontFamily: 'var(--osd-font-display)',
          fontSize: titleSize,
          lineHeight: 1.1,
          fontWeight: 850,
          letterSpacing: 0,
        }}
      >
        {title}
      </h1>
      {children}
    </div>
  </section>
);

const Panel = ({
  children,
  style,
  className,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}) => (
  <div
    className={className}
    style={{
      background: palette.panel,
      border: `1px solid ${palette.line}`,
      borderRadius: 'var(--osd-radius)',
      boxShadow: '0 34px 70px rgba(0, 0, 0, 0.34)',
      ...style,
    }}
  >
    {children}
  </div>
);

const Chip = ({ label, tone }: { label: string; tone: string }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 22px',
      borderRadius: 999,
      border: `1px solid ${tone}`,
      background: 'rgba(255,255,255,0.03)',
      fontSize: 26,
      color: palette.soft,
      whiteSpace: 'nowrap',
    }}
  >
    <span style={{ width: 12, height: 12, borderRadius: 999, background: tone }} />
    {label}
  </span>
);

const Arrow = ({ color = palette.dim, size = 40 }: { color?: string; size?: number }) => (
  <div
    aria-hidden
    style={{
      alignSelf: 'center',
      fontFamily: font.mono,
      fontSize: size,
      color,
      padding: '0 2px',
      flexShrink: 0,
    }}
  >
    →
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// 00 — Cover
// ─────────────────────────────────────────────────────────────────────────────

const Cover: Page = () => (
  <section style={fill}>
    <Styles />
    <Grid />
    <ScanLine />
    <svg
      width="1920"
      height="1080"
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', inset: 0 }}
    >
      <path
        className="vsds-dash"
        d="M265 710 C 520 380, 760 820, 1008 504 S 1456 330, 1660 612"
        fill="none"
        stroke={palette.lineStrong}
        strokeWidth="3"
      />
      <path
        className="vsds-dash"
        d="M350 315 L 668 315 L 820 480 L 1140 480 L 1310 685 L 1590 685"
        fill="none"
        stroke="rgba(106, 168, 255, 0.36)"
        strokeWidth="2"
      />
    </svg>
    <div style={{ position: 'relative', zIndex: 1, height: '100%', padding: '104px 124px' }}>
      <Header eyebrow="EDU AI 工作流大賽 / July Cup" />
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 82 }}>
        <div style={{ paddingTop: 116 }}>
          <div
            className="vsds-fade-1"
            style={{
              fontFamily: font.mono,
              fontSize: 27,
              color: 'var(--osd-accent)',
              letterSpacing: 0,
            }}
          >
            Design-to-Development Workflow
          </div>
          <h1
            className="vsds-fade-2"
            style={{
              margin: '26px 0 0',
              fontFamily: 'var(--osd-font-display)',
              fontSize: 'var(--osd-size-hero)',
              lineHeight: 0.96,
              fontWeight: 900,
              letterSpacing: 0,
            }}
          >
            VSDS
            <br />
            搬磚工班
          </h1>
          <p
            className="vsds-fade-3"
            style={{
              margin: '40px 0 0',
              maxWidth: 900,
              fontSize: 40,
              lineHeight: 1.4,
              color: palette.soft,
            }}
          >
            用 AI 代理工作流程，把設計一致性與品質驗證變成可持續、可擴展的閉環。
          </p>
        </div>
        <Panel
          className="vsds-fade-3"
          style={{
            marginTop: 148,
            height: 524,
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            gap: 22,
            borderColor: palette.lineStrong,
          }}
        >
          <div style={{ fontFamily: font.mono, fontSize: 24, color: palette.cyan }}>
            /competition-brief
          </div>
          <div style={{ fontSize: 34, fontWeight: 820, lineHeight: 1.25 }}>比賽目標</div>
          <div style={{ fontSize: 30, lineHeight: 1.5, color: palette.soft }}>
            針對 EDU 的一個關鍵業務流程，設計一套<strong style={{ color: palette.text }}>真實可用</strong>的
            AI 代理工作流程，讓所有人都看懂它的價值。
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <Chip label="實踐可行性" tone={palette.cyan} />
            <Chip label="策略與轉型價值" tone={palette.blue} />
            <Chip label="規模化與永續性" tone={palette.green} />
          </div>
        </Panel>
      </div>
    </div>
  </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// 01 — 結論 (Conclusion first)
// ─────────────────────────────────────────────────────────────────────────────

const Conclusion: Page = () => (
  <PageShell
    eyebrow="01 / 結論 · Conclusion"
    titleSize={94}
    title="AI 重塑 Design-to-Development"
  >
    <p
      className="vsds-fade-2"
      style={{
        marginTop: 60,
        maxWidth: 1560,
        fontSize: 45,
        lineHeight: 1.5,
        color: palette.soft,
      }}
    >
      推行「<strong style={{ color: palette.text }}>VSDS 實作元件庫</strong>」作為
      <strong style={{ color: palette.cyan }}>單一真理來源（Single Source of Truth）</strong>
      ，用 AI 代理工作流重塑 Design-to-Development，免除傳統反覆溝通的時間與人力成本，讓設計與實作品質成為可持續複用的資產。
    </p>
    <Panel
      className="vsds-fade-3"
      style={{
        marginTop: 50,
        padding: '40px 46px',
        borderLeft: `6px solid ${palette.cyan}`,
        maxWidth: 1560,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 52,
          fontWeight: 860,
          lineHeight: 1.24,
        }}
      >
        在<span style={{ color: palette.amber }}>降低營運成本</span>的同時，
        <span style={{ color: palette.green }}>提高產能</span>，仍維持
        <span style={{ color: palette.cyan }}>高效率與高品質</span>。<br /><span style={{ color: '#ffd500' }}>實現需求即開發的無縫開發流程。</span>
      </div>
    </Panel>
  </PageShell>
);

// ─────────────────────────────────────────────────────────────────────────────
// 02 — 理由：又快又好又便宜（鐵三角 → 三者兼得）
// ─────────────────────────────────────────────────────────────────────────────

const CORNER_TF: Record<'top' | 'left' | 'right', string> = {
  top: 'translate(-50%, calc(-100% - 8px))',
  left: 'translate(calc(-100% - 8px), -50%)',
  right: 'translate(8px, -50%)',
};

const TriCorner = ({
  x,
  y,
  label,
  caption,
  color,
  anchor,
}: {
  x: number;
  y: number;
  label: string;
  caption: string;
  color: string;
  anchor: 'top' | 'left' | 'right';
}) => (
  <div
    className="vsds-fade-2"
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: CORNER_TF[anchor],
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      width: 230,
    }}
  >
    <div
      style={{
        width: 132,
        height: 132,
        borderRadius: '50%',
        border: `2px solid ${color}`,
        background: 'rgba(255,255,255,0.03)',
        display: 'grid',
        placeItems: 'center',
        fontFamily: 'var(--osd-font-display)',
        fontSize: 48,
        fontWeight: 880,
        color,
        boxShadow: `0 0 44px ${color}33`,
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: 27, color: palette.soft, textAlign: 'center', lineHeight: 1.32 }}>
      {caption}
    </div>
  </div>
);

const Reason: Page = () => (
  <PageShell
    eyebrow="02 / 理由 · Why"
    titleSize={62}
    title="為什麼打造它？讓軟體開發又快、又好、又便宜"
  >
    <div
      style={{ marginTop: 22, position: 'relative', width: 1000, height: 470, margin: '22px auto 0' }}
    >
      <svg width="1000" height="470" viewBox="0 0 1000 470" style={{ position: 'absolute', inset: 0 }}>
        <path
          d="M500 195 L300 365 L700 365 Z"
          fill="none"
          stroke={palette.line}
          strokeWidth="2"
          strokeDasharray="10 12"
        />
      </svg>
      {/* Center node — the payoff */}
      <div
        className="vsds-fade-3 vsds-pulse"
        style={{
          position: 'absolute',
          left: 500,
          top: 305,
          transform: 'translate(-50%, -50%)',
          padding: '22px 40px',
          borderRadius: 999,
          background: palette.cyan,
          color: '#04141a',
          textAlign: 'center',
          boxShadow: `0 0 60px ${palette.cyan}66`,
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 880, lineHeight: 1.1 }}>VSDS AI 流程</div>
        <div style={{ fontSize: 24, fontWeight: 700, opacity: 0.82 }}>三者兼得</div>
      </div>
      <TriCorner x={500} y={195} anchor="top" label="又快" caption="消除來回溝通成本" color={palette.cyan} />
      <TriCorner x={300} y={365} anchor="left" label="又好" caption="精準實作、防漂移" color={palette.blue} />
      <TriCorner x={700} y={365} anchor="right" label="又便宜" caption="消除重複造輪子" color={palette.green} />
    </div>
    <div
      className="vsds-fade-3"
      style={{
        marginTop: 8,
        textAlign: 'center',
        fontSize: 32,
        lineHeight: 1.4,
        color: palette.soft,
      }}
    >
      {'傳統開發的鐵三角，快、好、便宜不存在。 '}<br /><span style={{ color: '#ffd500', fontWeight: '600', fontSize: '55px' }}>現在三個願望可以一次滿足</span>
      <strong style={{ color: '#ffd500', fontWeight: '600', fontSize: '55px' }}>{''}</strong>
    </div>
  </PageShell>
);

// ─────────────────────────────────────────────────────────────────────────────
// 03 — 舉例 setup：兩個團隊都要做同一件事
// ─────────────────────────────────────────────────────────────────────────────

const CaseSetup: Page = () => (
  <PageShell eyebrow="03 / 舉例 · Case" title="目前我們怎麼做到又快又好又便宜？">
    <p
      className="vsds-fade-2"
      style={{ marginTop: 40, maxWidth: 1500, fontSize: 36, lineHeight: 1.5, color: palette.soft }}
    >
      用一個真實情境對比 AI 代理工作流程與過去的流程：
      <strong style={{ color: palette.text }}>兩個產品團隊，各自要做各自的功能。</strong>
    </p>
    <div
      style={{
        marginTop: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
      }}
    >
      <Panel
        className="vsds-fade-2"
        style={{ flex: 1, padding: 40, borderColor: palette.blue, minHeight: 300 }}
      >
        <div style={{ fontFamily: font.mono, fontSize: 24, color: palette.blue }}>TEAM A</div>
        <div style={{ marginTop: 18, fontSize: 44, fontWeight: 840 }}>產品 A</div>
        <div style={{ marginTop: 18, fontSize: 30, color: palette.soft, lineHeight: 1.44 }}>
          要做自己的功能畫面 — 其中需要一顆<strong style={{ color: palette.text }}>按鈕</strong>。
        </div>
      </Panel>

      <div style={{ textAlign: 'center', flexShrink: 0 }}>
        <div style={{ fontSize: 30, color: palette.muted }}>都需要</div>
        <div style={{ fontSize: 88 }}>🔘</div>
        <div style={{ fontSize: 28, color: palette.amber }}>同一顆按鈕</div>
      </div>

      <Panel
        className="vsds-fade-3"
        style={{ flex: 1, padding: 40, borderColor: palette.green, minHeight: 300 }}
      >
        <div style={{ fontFamily: font.mono, fontSize: 24, color: palette.green }}>TEAM B</div>
        <div style={{ marginTop: 18, fontSize: 44, fontWeight: 840 }}>產品 B</div>
        <div style={{ marginTop: 18, fontSize: 30, color: palette.soft, lineHeight: 1.44 }}>
          也要做自己的功能畫面 — 同樣需要一顆<strong style={{ color: palette.text }}>按鈕</strong>。
        </div>
      </Panel>
    </div>
  </PageShell>
);

// ─────────────────────────────────────────────────────────────────────────────
// 04 — 舉例：過去的流程（各自造輪子）
// ─────────────────────────────────────────────────────────────────────────────

const StageCard = ({
  step,
  title,
  owner,
  copy,
  color,
}: {
  step: string;
  title: string;
  owner: string;
  copy: string;
  color: string;
}) => (
  <Panel
    className="vsds-fade-2"
    style={{
      flex: 1,
      padding: 26,
      minHeight: 340,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      borderTop: `4px solid ${color}`,
    }}
  >
    <div style={{ fontFamily: font.mono, fontSize: 22, color }}>{step}</div>
    <div style={{ fontSize: 33, fontWeight: 840, lineHeight: 1.14 }}>{title}</div>
    <div style={{ fontSize: 23, color, fontFamily: font.mono }}>{owner}</div>
    <div style={{ marginTop: 2, fontSize: 24, lineHeight: 1.42, color: palette.soft }}>{copy}</div>
  </Panel>
);

const OldFlow: Page = () => (
  <PageShell eyebrow="03 / 舉例 · Old Flow" title="過去：兩個團隊，各自把同一顆按鈕再做一次">
    <div style={{ marginTop: 40, display: 'flex', alignItems: 'stretch', gap: 8 }}>
      <StageCard
        step="01"
        title="需求分析"
        owner="PM"
        copy="A、B 團隊各自提出功能需求，把「要做什麼」交付下去。"
        color={palette.cyan}
      />
      <Arrow size={34} />
      <StageCard
        step="02"
        title="設計"
        owner="Designer"
        copy="兩邊設計師各自在 Figma 畫一顆按鈕，定色／間距／狀態。"
        color={palette.blue}
      />
      <Arrow size={34} />
      <StageCard
        step="03"
        title="開發"
        owner="Engineer"
        copy="A team 刻一顆、B team 再刻一顆 — 雙份工時做同一件事。"
        color={palette.green}
      />
      <Arrow size={34} />
      <StageCard
        step="04"
        title="測試"
        owner="QA + Design"
        copy="設計師人工到實作畫面逐項檢查、截圖、開單回報偏差。"
        color={palette.amber}
      />
    </div>
    <div
      className="vsds-fade-3"
      style={{
        marginTop: 32,
        padding: '22px 34px',
        borderLeft: `5px solid ${palette.red}`,
        background: 'rgba(255,107,122,0.08)',
        fontSize: 32,
        lineHeight: 1.4,
        color: palette.soft,
      }}
    >
      現在：<strong style={{ color: palette.red }}>多個軟體產品每次都重新造輪子</strong>， 多份工時做同一件事。
    </div>
  </PageShell>
);

// ─────────────────────────────────────────────────────────────────────────────
// 05 — 舉例：VSDS AI 流程（共用一套已實作元件庫）
// ─────────────────────────────────────────────────────────────────────────────

const ConsumerCard = ({
  tag,
  title,
  copy,
  color,
}: {
  tag: string;
  title: string;
  copy: string;
  color: string;
}) => (
  <Panel className="vsds-fade-3" style={{ flex: 1, padding: 34, minHeight: 250, borderColor: color }}>
    <div style={{ fontFamily: font.mono, fontSize: 22, color }}>{tag}</div>
    <div style={{ marginTop: 14, fontSize: 34, fontWeight: 820, lineHeight: 1.16 }}>{title}</div>
    <div style={{ marginTop: 14, fontSize: 26, color: palette.soft, lineHeight: 1.44 }}>{copy}</div>
  </Panel>
);

const AiFlow: Page = () => (
  <PageShell eyebrow="03 / 舉例 · AI Flow" titleSize={64} title="現在：一套已實作的 VSDS 元件庫，各隊直接取用">
    <Panel
      className="vsds-fade-2"
      style={{
        marginTop: 40,
        padding: '30px 40px',
        borderColor: palette.cyan,
        background: palette.panelSoft,
        display: 'flex',
        alignItems: 'center',
        gap: 26,
      }}
    >
      <div style={{ fontSize: 40, fontWeight: 860, whiteSpace: 'nowrap', color: palette.cyan }}>
        🎯 VSDS · 工程端唯一來源
      </div>
      <div style={{ fontSize: 29, lineHeight: 1.42, color: palette.soft }}>
        前端<strong style={{ color: palette.text }}>已實作</strong>的設計元件庫（token＋元件），
        以自動 sync／golden test／auto-release 維持「已實作」前提，向下餵養每個階段。
      </div>
    </Panel>

    <div
      className="vsds-fade-3"
      style={{ marginTop: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}
    >
      <div
        style={{
          padding: '14px 26px',
          borderRadius: 14,
          border: `1px solid ${palette.lineStrong}`,
          fontSize: 26,
          color: palette.text,
          fontWeight: 720,
        }}
      >
        已實作元件庫（同一顆按鈕）
      </div>
      <Arrow color={palette.cyan} size={34} />
      <div style={{ fontSize: 26, color: palette.blue }}>Team A 取用</div>
      <span style={{ color: palette.dim }}>·</span>
      <div style={{ fontSize: 26, color: palette.green }}>Team B 取用</div>
    </div>

    <div style={{ marginTop: 26, display: 'flex', gap: 30 }}>
      <ConsumerCard
        tag="DESIGNER"
        title="設計師：拿現成元件拼畫面"
        copy="從去年已建置完成的元件庫拿按鈕拼畫面，不用各自再畫一次，省下設計時間。"
        color={palette.blue}
      />
      <ConsumerCard
        tag="ENGINEER"
        title="工程師：從實作元件庫取用"
        copy="元件庫已被實作出來，A、B team 直接把按鈕拿出來用即可（例：Manager Team）。"
        color={palette.green}
      />
    </div>
  </PageShell>
);

// ─────────────────────────────────────────────────────────────────────────────
// 06 — 舉例：AI 如何加速（閉環四步 + 三層協作）
// ─────────────────────────────────────────────────────────────────────────────

const LoopNode = ({
  n,
  title,
  caption,
  color,
}: {
  n: string;
  title: string;
  caption: string;
  color: string;
}) => (
  <Panel
    className="vsds-fade-2"
    style={{
      flex: 1,
      padding: 24,
      minHeight: 178,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      borderTop: `4px solid ${color}`,
    }}
  >
    <div style={{ fontFamily: font.mono, fontSize: 24, color }}>{n}</div>
    <div style={{ fontSize: 30, fontWeight: 830, lineHeight: 1.16 }}>{title}</div>
    <div style={{ fontSize: 23, color: palette.soft, lineHeight: 1.4 }}>{caption}</div>
  </Panel>
);

const LayerCard = ({
  tag,
  title,
  items,
  color,
}: {
  tag: string;
  title: string;
  items: string;
  color: string;
}) => (
  <Panel className="vsds-fade-3" style={{ flex: 1, padding: 30, minHeight: 200, borderColor: color }}>
    <div style={{ fontFamily: font.mono, fontSize: 22, color }}>{tag}</div>
    <div style={{ marginTop: 12, fontSize: 32, fontWeight: 820, lineHeight: 1.16 }}>{title}</div>
    <div style={{ marginTop: 14, fontSize: 24, color: palette.soft, lineHeight: 1.5 }}>{items}</div>
  </Panel>
);

const AiAccelerate: Page = () => (
  <PageShell eyebrow="03 / 舉例 · AI Accelerate" title="過程中，AI 如何加速：一個自動運行的閉環">
    <div
      className="vsds-fade-2"
      style={{ marginTop: 32, fontFamily: font.mono, fontSize: 24, color: palette.cyan }}
    >
      閉環四步 · CLOSED LOOP
    </div>
    <div style={{ marginTop: 16, display: 'flex', alignItems: 'stretch', gap: 8 }}>
      <LoopNode n="①" title="Figma 單一源頭" caption="設計 token 與 kit 作為唯一源頭" color={palette.cyan} />
      <Arrow size={32} />
      <LoopNode n="②" title="AI 生成 code、開 PR" caption="自動產出 code 與元件資產" color={palette.blue} />
      <Arrow size={32} />
      <LoopNode n="③" title="設計師驗證" caption="用 Storybook／issue 直接驗收" color={palette.green} />
      <Arrow size={32} />
      <LoopNode n="④" title="偵測 drift" caption="比對實作 ↔ Figma，回到 ①" color={palette.amber} />
    </div>
    <div
      className="vsds-fade-3"
      style={{ marginTop: 16, fontSize: 26, lineHeight: 1.4, color: palette.soft }}
    >
      AI 每一關停下來由<strong style={{ color: palette.text }}>人裁決</strong>；設計師在第 ③ 步就能驗證，不被流程尾端綁架。
    </div>

    <div
      className="vsds-fade-3"
      style={{ marginTop: 30, fontFamily: font.mono, fontSize: 24, color: palette.cyan }}
    >
      三層協作 · SKILLS / SCRIPTS / CI
    </div>
    <div style={{ marginTop: 16, display: 'flex', gap: 24 }}>
      <LayerCard
        tag="SKILLS · 人機協作"
        title="停在把關點"
        items="new-component（13 個 review 把關點）、sync-tokens、sync-icons。"
        color={palette.cyan}
      />
      <LayerCard
        tag="SCRIPTS · 自動化"
        title="重複操作變命令"
        items="import-kit-tokens（Figma JSON→CSS）、sync-figma、SVGO＋codegen。"
        color={palette.blue}
      />
      <LayerCard
        tag="CI · 守門發布"
        title="AI 驅動守門"
        items="10 個 workflow、3 個 AI 驅動（@claude、claude-review、issue→PR）。"
        color={palette.green}
      />
    </div>
  </PageShell>
);

// ─────────────────────────────────────────────────────────────────────────────
// 07 — 舉例：未來迭代藍圖（Vibe Coding / v2 / v3）
// ─────────────────────────────────────────────────────────────────────────────

const VersionCard = ({
  tag,
  title,
  copy,
  color,
}: {
  tag: string;
  title: string;
  copy: string;
  color: string;
}) => (
  <Panel className="vsds-fade-3" style={{ padding: 30, borderColor: color, flex: 1 }}>
    <div style={{ fontFamily: font.mono, fontSize: 22, color }}>{tag}</div>
    <div style={{ marginTop: 12, fontSize: 30, fontWeight: 820, lineHeight: 1.16 }}>{title}</div>
    <div style={{ marginTop: 12, fontSize: 24, color: palette.soft, lineHeight: 1.44 }}>{copy}</div>
  </Panel>
);

const Roadmap: Page = () => (
  <PageShell eyebrow="03 / 舉例 · Roadmap" titleSize={64} title="未來迭代藍圖：打破多階段交付的壁壘">
    <div
      style={{
        marginTop: 44,
        display: 'grid',
        gridTemplateColumns: '1.08fr 0.92fr',
        gap: 38,
      }}
    >
      <Panel
        className="vsds-fade-2"
        style={{ padding: 40, borderColor: palette.cyan, background: palette.panelSoft }}
      >
        <div style={{ fontFamily: font.mono, fontSize: 24, color: palette.cyan }}>
          終極願景 · VIBE CODING
        </div>
        <div style={{ marginTop: 20, fontSize: 46, fontWeight: 860, lineHeight: 1.16 }}>「需求 → Code」無縫接軌</div>
        <div style={{ marginTop: 22, fontSize: 28, color: palette.soft, lineHeight: 1.5 }}>
          過去高度依賴 PRD ←討論→ Figma ←討論→ Code 的口頭與文字交接；未來各角色從
          <strong style={{ color: palette.text }}>專案需求階段</strong>就直接套用系統，透過 AI 直接 Vibe Coding 產出可互動原型。實現需求即開發的無縫開發模式。
        </div>
        <div
          style={{
            marginTop: 26,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: font.mono,
            fontSize: 27,
            color: palette.text,
          }}
        >
          需求 <Arrow color={palette.cyan} size={28} /> Code
          <span style={{ color: palette.green, marginLeft: 8 }}>· 無縫接軌</span>
        </div>
      </Panel>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        <VersionCard
          tag="V2 · 設計即開發"
          title="在 Figma 改，AI 自動發 PR"
          copy="與 Figma Make 整合，設計師直接在 Figma 修改 UI、甚至進前端 Repo 用 DS 修改，消滅設計與工程的界線。"
          color={palette.blue}
        />
        <VersionCard
          tag="V3 · 全平台設計語言"
          title="跨產品線通用設計語言"
          copy="建立 DESIGN.md 轉碼指南，Token 層橫向擴展支援 Android XML、Windows XAML，讓 VSDS 跳脫單一技術限制。"
          color={palette.green}
        />
      </div>
    </div>
  </PageShell>
);

// ─────────────────────────────────────────────────────────────────────────────
// 08 — 重申結論：對齊評分標準
// ─────────────────────────────────────────────────────────────────────────────

const HiLine = ({ color, children }: { color: string; children: ReactNode }) => (
  <div style={{ fontSize: 34, fontWeight: 820, lineHeight: 1.28, color }}>{children}</div>
);

const SubLine = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 26, lineHeight: 1.34, color: palette.soft }}>{children}</div>
);

const ScoreRow = ({
  index,
  title,
  question,
  answer,
  color,
}: {
  index: string;
  title: string;
  question: string;
  answer: ReactNode;
  color: string;
}) => (
  <div
    className="vsds-fade-2"
    style={{
      display: 'grid',
      gridTemplateColumns: '58px 300px 1fr',
      alignItems: 'center',
      gap: 28,
      padding: '26px 0',
      borderBottom: `1px solid ${palette.line}`,
    }}
  >
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: '50%',
        border: `2px solid ${color}`,
        display: 'grid',
        placeItems: 'center',
        fontFamily: font.mono,
        fontSize: 24,
        fontWeight: 800,
        color,
      }}
    >
      {index}
    </div>
    <div>
      <div style={{ fontSize: 36, fontWeight: 840, lineHeight: 1.16 }}>{title}</div>
      <div style={{ marginTop: 8, fontSize: 22, color: palette.muted, lineHeight: 1.34 }}>
        {question}
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{answer}</div>
  </div>
);

const Scorecard: Page = () => (
  <PageShell eyebrow="04 / 重申結論 · Scorecard" title="重申結論：對齊評分標準，逐點回答">
    <div style={{ marginTop: 34 }}>
      <ScoreRow
        index="01"
        title="實踐可行性"
        question="能不能馬上用？邏輯清楚？有處理例外嗎？"
        answer={
          <>
            <HiLine color={palette.cyan}>全用現成工具、今天就能跑</HiLine>
            <SubLine>元件庫已實作上線；drift 由 golden test 反查、AI 不亂猜。</SubLine>
          </>
        }
        color={palette.cyan}
      />

      <ScoreRow
        index="02"
        title="規模化與永續性"
        question="能服務整個團隊嗎？換人也能接手迭代嗎？"
        answer={
          <>
            <HiLine color={palette.green}>換人也能接手迭代</HiLine>
            <HiLine color={palette.green}>打破多階段與多工具的交付壁壘，實現需求即開發</HiLine>
            <HiLine color={palette.green}>輕鬆擴張至不同技術平台</HiLine>
            <SubLine>單一來源 ＋ 知識封裝成 skill ＋ agentic CI ＋ 完整文件化於 GitHub</SubLine>
          </>
        }
        color={palette.green}
      />
      <ScoreRow
        index="03"
        title="策略與轉型價值"
        question="有沒有重新定義工作方式，而不只是加速舊流程？"
        answer={
          <>
            <HiLine color={palette.blue}>重新定義交接與分工</HiLine>
            <HiLine color={palette.blue}>降低營運成本的同時，提高產能，仍維持高效率與高品質</HiLine>
            <HiLine color={palette.blue}>實現又快又好又便宜</HiLine>
            <SubLine>不是加速舊流程 — 而是讓大家吃同一套已實作 DS。</SubLine>
          </>
        }
        color={palette.blue}
      />
    </div>
  </PageShell>
);

// ─────────────────────────────────────────────────────────────────────────────
// 08 — Closing
// ─────────────────────────────────────────────────────────────────────────────

const Closing: Page = () => (
  <section style={fill}>
    <Styles />
    <Grid />
    <ScanLine />
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        height: '100%',
        padding: '92px 124px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header eyebrow="EDU AI 工作流大賽 / VSDS 搬磚工班" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div
          className="vsds-fade-1"
          style={{ fontFamily: font.mono, fontSize: 27, color: palette.cyan }}
        >
          Conclusion
        </div>
        <h1
          className="vsds-fade-2"
          style={{
            margin: '26px 0 0',
            maxWidth: 1600,
            fontFamily: 'var(--osd-font-display)',
            fontSize: 100,
            fontWeight: 900,
            lineHeight: 1.08,
          }}
        >
          品質不再是每次專案
          <br />
          重新付費的成本，而是可複利的資產。
        </h1>
        <p
          className="vsds-fade-3"
          style={{
            margin: '46px 0 0',
            fontSize: 46,
            lineHeight: 1.4,
            color: palette.soft,
          }}
        >
          讓軟體開發，<span style={{ color: palette.cyan }}>又快</span> ·{' '}
          <span style={{ color: palette.blue }}>又好</span> ·{' '}
          <span style={{ color: palette.green }}>又便宜</span>。
        </p>
      </div>
    </div>
  </section>
);

export const meta: SlideMeta = {
  title: 'VSDS 搬磚工班',
  createdAt: '2026-07-01T09:24:54.240Z',
};

export default [
  Cover,
  Conclusion,
  Reason,
  CaseSetup,
  OldFlow,
  AiFlow,
  AiAccelerate,
  Roadmap,
  Scorecard,
  Closing,
] satisfies Page[];
