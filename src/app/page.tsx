import Navbar from "@/components/Navbar";
import HomePage from "@/components/HomePage";
import Project from "@/components/Project";
import Details from "@/components/Details";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomePage />
      <Project />
      <Details />
      <Footer />
    </>
  );
}
