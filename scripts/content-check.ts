import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join,relative } from "node:path";

const root=process.cwd();
const forbidden=/\b(?:TODO|lorem|placeholder|sample)\b|example\.com/i;
const roots=["app","components","lib","content"];
const violations:string[]=[];
function walk(path:string){for(const name of readdirSync(path)){const full=join(path,name);const stat=statSync(full);if(stat.isDirectory())walk(full);else if(/\.(?:ts|tsx|json|md|txt)$/.test(name)){const text=readFileSync(full,"utf8");text.split(/\r?\n/).forEach((line,index)=>{if(forbidden.test(line)&&!line.includes("content-check allow"))violations.push(`${relative(root,full)}:${index+1}`)})}}}
for(const part of roots){const path=join(root,part);if(existsSync(path))walk(path)}
if(process.env.ENABLE_CONTACT_FORM==="true"&&!(process.env.RESEND_API_KEY&&process.env.CONTACT_TO_EMAIL&&process.env.CONTACT_FROM_EMAIL))violations.push("Contact form enabled without complete mail transport");
if(violations.length){console.error("Content check failed:\n"+violations.map(v=>`- ${v}`).join("\n"));process.exit(1)}
console.log("Content check passed: no forbidden production copy or invalid contact configuration found.");
