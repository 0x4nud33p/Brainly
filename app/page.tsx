import LandingPage from "@/components/landing/index";
import Features from "@/components/features/index";
import Video from "@/components/video/VideoComponent";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <LandingPage />
      <Video />
      <Features />
      <Footer />
    </>
  );
}
