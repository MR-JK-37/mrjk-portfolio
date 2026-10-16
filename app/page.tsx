import { About, Contact, Footer, Proof, Toolkit, Work } from "@/components/home";
import { Hero } from "@/components/hero";
import { site } from "@/lib/site";

export default function HomePage() {
  return <main id="main"><Hero /><Work /><Proof /><Toolkit /><About /><Contact enabled={site.contactEnabled} /><Footer /></main>;
}
