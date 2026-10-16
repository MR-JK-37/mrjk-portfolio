import {Sparkle} from "./sparkle";
import {cn} from "@/lib/utils";

export function SectionHeader({eyebrow,title,lede,id,className}:{eyebrow:string;title:string;lede?:string;id:string;className?:string}){
  return <header className={cn("section-header",className)}><p className="section-kicker"><Sparkle/>{eyebrow}</p><h2 id={id}>{title}</h2>{lede&&<p>{lede}</p>}</header>;
}
