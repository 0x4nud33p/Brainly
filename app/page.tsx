import LandingPage from "@/components/landing/index";
import Features from "@/components/features/index";
import Video from "@/components/video/VideoComponent";

export default function Home() {
  return (
    <>
      <LandingPage />
      <div className="aspect-video rounded-lg bg-slate-950 overflow-hidden">
        <Video />
      </div>
      <Features />
    </>
  );
}
