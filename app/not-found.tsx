import Link from "next/link";
import {Sparkle} from "@/components/sparkle";
export default function NotFound(){return <main className="not-found" id="main"><Sparkle/><p className="mono">HTTP 404 / EVIDENCE GAP</p><h1>Resource not found<br/>in this case file.</h1><p>The requested path is not present in the evidence index.</p><Link className="button button--primary" href="/">Return to case file</Link></main>}
