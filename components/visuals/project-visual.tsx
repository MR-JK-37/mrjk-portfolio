import { cn } from "@/lib/utils";

export function ProjectVisual({ kind, className }: { kind: string; className?: string }) {
  const common = {
    className: cn("project-visual", `visual--${kind}`, className),
    viewBox: "0 0 520 300",
    role: "img",
    "aria-label": label(kind),
  } as const;

  if (kind === "we-care")
    return (
      <svg {...common}>
        <title>{label(kind)}</title>
        <g className="nodes">
          <circle cx="110" cy="150" r="46" fill="rgba(53,208,127,.12)" stroke="#35D07F" strokeWidth="2" />
          <circle cx="110" cy="150" r="22" fill="#35D07F" opacity=".3" />
          <text x="110" y="156" textAnchor="middle" fill="var(--cream)" fontSize="13">VOICE</text>
          <rect x="220" y="70" width="260" height="40" rx="10" fill="rgba(248,240,229,.05)" stroke="rgba(248,240,229,.2)" />
          <text x="240" y="95" fill="rgba(248,240,229,.75)" fontSize="13">Stage-adaptive response</text>
          <rect x="220" y="130" width="260" height="40" rx="10" fill="rgba(142,27,50,.18)" stroke="var(--burgundy-soft)" />
          <text x="240" y="155" fill="var(--cream)" fontSize="13">Distress score: Amber</text>
          <rect x="220" y="190" width="260" height="40" rx="10" fill="rgba(248,240,229,.05)" stroke="rgba(248,240,229,.2)" />
          <text x="240" y="215" fill="rgba(248,240,229,.75)" fontSize="13">Caregiver alert sent</text>
        </g>
      </svg>
    );

  if (kind === "netpulse")
    return (
      <svg {...common}>
        <title>{label(kind)}</title>
        <g className="topology">
          <circle cx="72" cy="150" r="22" fill="rgba(248,240,229,.05)" stroke="rgba(248,240,229,.3)" />
          <circle cx="228" cy="76" r="22" fill="rgba(248,240,229,.05)" stroke="rgba(248,240,229,.3)" />
          <circle cx="228" cy="224" r="22" fill="rgba(248,240,229,.05)" stroke="rgba(248,240,229,.3)" />
          <circle cx="448" cy="150" r="22" fill="rgba(142,27,50,.25)" stroke="var(--burgundy-soft)" />
          <path d="M94 140l112-54M94 160l112 54M250 76l176 64M250 224l176-64" stroke="rgba(248,240,229,.3)" fill="none" />
        </g>
        <g className="tooltip">
          <rect x="310" y="218" width="162" height="48" rx="12" fill="rgba(5,21,56,.9)" stroke="var(--burgundy-soft)" />
          <text x="330" y="247" fill="var(--cream)" fontSize="13">UNKNOWN DEVICE</text>
        </g>
      </svg>
    );

  if (kind === "aran")
    return (
      <svg {...common}>
        <title>{label(kind)}</title>
        <g className="nodes">
          <rect x="50" y="60" width="90" height="90" rx="12" fill="rgba(53,208,127,.12)" stroke="#35D07F" />
          <text x="95" y="112" textAnchor="middle" fill="#35D07F" fontSize="26" fontWeight="700">87</text>
          <rect x="165" y="60" width="90" height="90" rx="12" fill="rgba(224,178,61,.12)" stroke="#E0B23D" />
          <text x="210" y="112" textAnchor="middle" fill="#E0B23D" fontSize="26" fontWeight="700">62</text>
          <rect x="280" y="60" width="90" height="90" rx="12" fill="rgba(200,64,95,.18)" stroke="var(--burgundy-soft)" />
          <text x="325" y="112" textAnchor="middle" fill="#C8405F" fontSize="26" fontWeight="700">24</text>
          <text x="420" y="112" fill="rgba(248,240,229,.6)" fontSize="12">NEEDS{"\n"}SERVICE</text>
          <rect x="50" y="180" width="420" height="16" rx="8" fill="rgba(248,240,229,.1)" />
          <rect x="50" y="180" width="140" height="16" rx="8" fill="var(--burgundy-soft)" />
        </g>
      </svg>
    );

  return (
    <svg {...common}>
      <title>{label(kind)}</title>
      <rect x="48" y="60" width="424" height="180" rx="20" fill="rgba(248,240,229,.04)" stroke="rgba(248,240,229,.18)" />
      <text x="260" y="155" textAnchor="middle" fill="rgba(248,240,229,.5)" fontSize="14">Project diagram</text>
    </svg>
  );
}

function label(kind: string) {
  return (
    {
      "we-care": "WE care voice companion: stage-adaptive response and caregiver escalation flow",
      netpulse: "NetPulse network topology highlighting an unknown device flagged for review",
      aran: "ARAN per-machine health scores with the lowest-scoring machine flagged for service",
    } as Record<string, string>
  )[kind] ?? "Project system diagram";
}
