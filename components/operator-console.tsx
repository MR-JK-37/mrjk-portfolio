"use client";
import {FormEvent,useEffect,useRef,useState} from "react";
import {useRouter} from "next/navigation";
import {profile,projects,skillGroups} from "@/lib/content";

const names=["help","whoami","ls projects","cat about","hackathons","skills","contact","theme","clear","sudo hire-me"];
export function OperatorConsole({identity}:{identity:"student"|"operator"}){
 const router=useRouter(),[lines,setLines]=useState<string[]>(["Case File OS 2.0 · local session","Type help. Nothing here reaches a shell."]),[value,setValue]=useState(""),[history,setHistory]=useState<string[]>([]),[cursor,setCursor]=useState(0),input=useRef<HTMLInputElement>(null),scroll=useRef<HTMLDivElement>(null);
 useEffect(()=>{scroll.current?.scrollTo({top:scroll.current.scrollHeight})},[lines]);
 function run(raw:string){
  const command=raw.trim();if(!command)return;setHistory(h=>[...h,command]);setCursor(0);setValue("");
  if(command==="clear"){setLines([]);return}
  const out:Record<string,string>={
   help:names.join(" · "),
   whoami:`${profile.legalName} — ${profile.education} at ${profile.institution}.`,
   "ls projects":projects.map(p=>`${p.caseNumber}/${p.name}`).join("  "),
   "cat about":profile.about,
   hackathons:"ARAN · Digital Evidence Integrity System · SPEAR-Credit",
   skills:skillGroups.flatMap(g=>g.items).join(" · "),
   contact:"Opening the contact section…",
   theme:"Ambient theme toggled.",
   "sudo hire-me":"Permission granted. Opening contact."
  };
  if(command.startsWith("open ")){const query=command.slice(5).toLowerCase();const project=projects.find(p=>p.slug===query||p.name.toLowerCase()===query);if(project){router.push(`/work/${project.slug}`);setLines(l=>[...l,`$ ${command}`,`Opening CASE ${project.caseNumber}…`]);return}}
 if(command==="contact"||command==="sudo hire-me")location.hash="contact";if(command==="theme")document.documentElement.dataset.theme=document.documentElement.dataset.theme==="navy"?"cream":"navy";
 const hidden:Record<string,string>={"view-source":"Good instinct. Evidence marker: MRJK{SOURCE_HAS_CUSTODY}",coffee:"Coffee status: evidence inconclusive.",matrix:"Wrong palette."};if(command==="view-source")window.dispatchEvent(new CustomEvent("evidence-found",{detail:"terminal"}));setLines(l=>[...l,`$ ${command}`,out[command]??hidden[command]??`Command not found: ${command}. Try help.`]);}
 function key(event:React.KeyboardEvent<HTMLInputElement>){if(event.key==="ArrowUp"){event.preventDefault();const next=Math.min(cursor+1,history.length);setCursor(next);setValue(history[history.length-next]??"")}else if(event.key==="ArrowDown"){event.preventDefault();const next=Math.max(cursor-1,0);setCursor(next);setValue(next?history[history.length-next]:"")}else if(event.key==="Tab"){event.preventDefault();const hit=names.find(name=>name.startsWith(value));if(hit)setValue(hit)}}
 return <div className="operator glass" aria-label="Interactive portfolio console"><div className="terminal-bar"><i/><i/><i/><span>operator.console — harmless interface</span></div><div className="terminal-output" ref={scroll} data-lenis-prevent role="log" aria-live="polite" tabIndex={0}>{lines.map((line,index)=><p key={`${line}-${index}`}>{line}</p>)}</div><form onSubmit={(e:FormEvent)=>{e.preventDefault();run(value)}}><label htmlFor="terminal-input">{identity==="student"?"student@rmk:~$":"operator@ctf:~#"}</label><input id="terminal-input" ref={input} value={value} onChange={e=>setValue(e.target.value)} onKeyDown={key} autoComplete="off" spellCheck={false}/></form><div className="terminal-chips" aria-label="Common commands">{["help","ls projects","whoami","contact"].map(name=><button type="button" key={name} onClick={()=>run(name)}>{name}</button>)}</div></div>
}
