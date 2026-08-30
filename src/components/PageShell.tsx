import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";

/**
 * Everything except the homepage. The homepage keeps its own shell because its
 * hero deliberately sits under the fixed navbar; every other page starts below.
 */
const PageShell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    <ScrollReveal />
    <Navbar />
    <main id="main">{children}</main>
    <Footer />
    <FloatingCTA />
  </div>
);

export default PageShell;
