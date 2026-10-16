import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const source=join(process.cwd(),"content/linkedin");
const expected=["Profile.csv","Positions.csv","Education.csv","Skills.csv","Certifications.csv","Projects.csv","Honors.csv","Publications.csv","Courses.csv","Volunteering.csv"];
const found=existsSync(source)?readdirSync(source):[];
function csv(name:string){const path=join(source,name);if(!existsSync(path))return[];const lines=readFileSync(path,"utf8").replace(/^\uFEFF/,"").split(/\r?\n/).filter(Boolean);if(lines.length<2)return[];const parse=(line:string)=>{const out:string[]=[];let value="",quoted=false;for(let i=0;i<line.length;i++){const c=line[i];if(c==='"'&&quoted&&line[i+1]==='"'){value+='"';i++}else if(c==='"')quoted=!quoted;else if(c===","&&!quoted){out.push(value);value=""}else value+=c}out.push(value);return out};const keys=parse(lines[0]);return lines.slice(1).map(line=>Object.fromEntries(keys.map((key,index)=>[key.trim(),parse(line)[index]?.trim()??""])))}
const datasets=Object.fromEntries(expected.map(name=>[name.replace(".csv","").toLowerCase(),csv(name)]));
writeFileSync(join(process.cwd(),"content/generated/linkedin.json"),JSON.stringify({generatedAt:new Date().toISOString(),datasets},null,2)+"\n");
console.log("LinkedIn content import");
for(const name of expected)console.log(`${found.includes(name)?"FOUND  ":"MISSING"} ${name}`);
const pdf=found.find(name=>name.toLowerCase().endsWith(".pdf"));
if(pdf)console.log(`FOUND   ${pdf} (kept as source; CSV data takes precedence)`);
console.log("Generated content/generated/linkedin.json. Re-running with unchanged inputs is safe.");
