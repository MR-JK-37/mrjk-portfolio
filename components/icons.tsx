import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
function Icon({ size = 24, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function ArrowRight(props: IconProps)   { return <Icon {...props}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>; }
export function ArrowLeft(props: IconProps)    { return <Icon {...props}><path d="M19 12H5m6 6-6-6 6-6" /></Icon>; }
export function ArrowDown(props: IconProps)    { return <Icon {...props}><path d="M12 5v14m6-6-6 6-6-6" /></Icon>; }
export function ArrowUpRight(props: IconProps) { return <Icon {...props}><path d="M7 17 17 7M7 7h10v10" /></Icon>; }
export function X(props: IconProps)            { return <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>; }
export function Menu(props: IconProps)         { return <Icon {...props}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>; }
export function Search(props: IconProps)       { return <Icon {...props}><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></Icon>; }
export function Command(props: IconProps)      { return <Icon {...props}><path d="M9 6V5a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v14a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6" /></Icon>; }
export function Check(props: IconProps)        { return <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>; }
export function Info(props: IconProps)         { return <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></Icon>; }
export function Send(props: IconProps)         { return <Icon {...props}><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></Icon>; }
export function LogOut(props: IconProps)       { return <Icon {...props}><path d="M10 17l5-5-5-5M15 12H3M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /></Icon>; }
export function Upload(props: IconProps)       { return <Icon {...props}><path d="M12 16V4m-5 5 5-5 5 5M4 18v2h16v-2" /></Icon>; }
export function Sun(props: IconProps)          { return <Icon {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></Icon>; }
export function Moon(props: IconProps)         { return <Icon {...props}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></Icon>; }
export function Globe(props: IconProps)        { return <Icon {...props}><circle cx="12" cy="12" r="9"/><path d="M12 3a14.5 14.5 0 0 0 0 18M3 12h18M12 3a14.5 14.5 0 0 1 0 18"/></Icon>; }
export function Shield(props: IconProps)       { return <Icon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></Icon>; }
export function Trophy(props: IconProps)       { return <Icon {...props}><path d="M6 9H4a2 2 0 0 1-2-2V5h4M18 9h2a2 2 0 0 0 2-2V5h-4M6 9v8a6 6 0 0 0 12 0V9M9 22h6"/></Icon>; }
export function Star(props: IconProps)         { return <Icon {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Icon>; }
export function Building(props: IconProps)     { return <Icon {...props}><rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></Icon>; }
export function DollarSign(props: IconProps)   { return <Icon {...props}><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></Icon>; }
export function Github(props: IconProps)       { return <Icon {...props}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></Icon>; }
export function Linkedin(props: IconProps)     { return <Icon {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></Icon>; }
export function Youtube(props: IconProps)      { return <Icon {...props}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.94C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.94A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></Icon>; }
export function Mail(props: IconProps)         { return <Icon {...props}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></Icon>; }
export function MapPin(props: IconProps)       { return <Icon {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></Icon>; }
export function Briefcase(props: IconProps)    { return <Icon {...props}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M8 7h8"/></Icon>; }
export function Terminal(props: IconProps)     { return <Icon {...props}><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></Icon>; }
export function Cpu(props: IconProps)          { return <Icon {...props}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2M15 20v2M9 2v2M9 20v2M2 15h2M20 15h2M2 9h2M20 9h2"/></Icon>; }
export function Activity(props: IconProps)     { return <Icon {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></Icon>; }
export function Lock(props: IconProps)         { return <Icon {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Icon>; }
export function Network(props: IconProps)      { return <Icon {...props}><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v4M9.32 16.5 6.88 14.5M14.68 16.5l2.44-2"/><line x1="12" y1="11" x2="5" y2="17"/><line x1="12" y1="11" x2="19" y2="17"/></Icon>; }
export function Cloud(props: IconProps)        { return <Icon {...props}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></Icon>; }
export function Server(props: IconProps)       { return <Icon {...props}><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></Icon>; }
export function Zap(props: IconProps)          { return <Icon {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>; }
export function Eye(props: IconProps)          { return <Icon {...props}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Icon>; }
export function Code(props: IconProps)         { return <Icon {...props}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></Icon>; }
export function Layers(props: IconProps)       { return <Icon {...props}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></Icon>; }
export function Target(props: IconProps)       { return <Icon {...props}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></Icon>; }
export function MoonStar(props: IconProps)     { return <Icon {...props}><path d="M20 15.5A8 8 0 0 1 8.5 4 8 8 0 1 0 20 15.5Z" /><path d="m17 3 .5 1.5L19 5l-1.5.5L17 7l-.5-1.5L15 5l1.5-.5L17 3Z" /></Icon>; }
export function AtSign(props: IconProps)       { return <Icon {...props}><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></Icon>; }
export function Medal(props: IconProps)        { return <Icon {...props}><circle cx="12" cy="8" r="6" /><path d="M15.5 12.9 17 22l-5-3-5 3 1.5-9.1" /></Icon>; }
export function Play(props: IconProps)         { return <Icon {...props}><polygon points="6 3 20 12 6 21 6 3" /></Icon>; }
export function Pause(props: IconProps)        { return <Icon {...props}><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></Icon>; }
export function Maximize2(props: IconProps)    { return <Icon {...props}><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></Icon>; }
export function Printer(props: IconProps)      { return <Icon {...props}><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></Icon>; }
export function FileText(props: IconProps)     { return <Icon {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></Icon>; }


