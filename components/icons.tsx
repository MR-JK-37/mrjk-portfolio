import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };
function Icon({ size = 24, children, ...props }: IconProps & { children: React.ReactNode }) { return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>; }
export function ArrowRight(props: IconProps) { return <Icon {...props}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>; }
export function ArrowLeft(props: IconProps) { return <Icon {...props}><path d="M19 12H5m6 6-6-6 6-6" /></Icon>; }
export function ArrowDown(props: IconProps) { return <Icon {...props}><path d="M12 5v14m6-6-6 6-6-6" /></Icon>; }
export function ArrowUpRight(props: IconProps) { return <Icon {...props}><path d="M7 17 17 7M7 7h10v10" /></Icon>; }
export function X(props: IconProps) { return <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>; }
export function Menu(props: IconProps) { return <Icon {...props}><path d="M4 7h16M4 12h16M4 17h16" /></Icon>; }
export function Search(props: IconProps) { return <Icon {...props}><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></Icon>; }
export function Command(props: IconProps) { return <Icon {...props}><path d="M9 6V5a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v14a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6" /></Icon>; }
export function MoonStar(props: IconProps) { return <Icon {...props}><path d="M20 15.5A8 8 0 0 1 8.5 4 8 8 0 1 0 20 15.5Z" /><path d="m17 3 .5 1.5L19 5l-1.5.5L17 7l-.5-1.5L15 5l1.5-.5L17 3Z" /></Icon>; }
export function Check(props: IconProps) { return <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>; }
export function Info(props: IconProps) { return <Icon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></Icon>; }
export function Send(props: IconProps) { return <Icon {...props}><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></Icon>; }
export function LogOut(props: IconProps) { return <Icon {...props}><path d="M10 17l5-5-5-5M15 12H3M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /></Icon>; }
export function Upload(props: IconProps) { return <Icon {...props}><path d="M12 16V4m-5 5 5-5 5 5M4 18v2h16v-2" /></Icon>; }
