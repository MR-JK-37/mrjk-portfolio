const colors = { cream: "#F8F0E5", navy: "#082052", burgundy: "#6E1B3A", burgundySoft: "#8C2F4E", creamDeep: "#EFE3D0", navyDeep: "#051538" } as const;
const pairs = [["navy","cream",4.5],["cream","navy",4.5],["cream","navyDeep",4.5],["burgundy","cream",4.5],["burgundy","creamDeep",4.5],["burgundySoft","cream",4.5],["navy","creamDeep",4.5]] as const;
function channel(value: number) { const normalized = value / 255; return normalized <= .04045 ? normalized / 12.92 : ((normalized + .055) / 1.055) ** 2.4; }
function luminance(hex: string) { const rgb = hex.slice(1).match(/.{2}/g)?.map((part) => Number.parseInt(part,16)); if (!rgb) throw new Error(`Bad color ${hex}`); return .2126 * channel(rgb[0]) + .7152 * channel(rgb[1]) + .0722 * channel(rgb[2]); }
function ratio(a: string,b: string) { const [lighter,darker] = [luminance(a),luminance(b)].sort((x,y) => y-x); return (lighter + .05) / (darker + .05); }
let failed = false;
for (const [foreground,background,target] of pairs) { const result = ratio(colors[foreground],colors[background]); const passed = result >= target; console.log(`${passed ? "PASS" : "FAIL"} ${foreground} on ${background}: ${result.toFixed(2)}:1 (target ${target}:1)`); if (!passed) failed = true; }
if (failed) process.exit(1);
