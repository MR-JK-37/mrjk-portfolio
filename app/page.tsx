import { About, Contact, Footer, Hero, Proof, Toolkit, Work } from "@/components/home";
import { site } from "@/lib/site";

export default function HomePage() {
  return <main id="main"><Hero /><Work /><Proof /><Toolkit /><About /><Contact enabled={site.contactEnabled} /><Footer /></main>;
}
