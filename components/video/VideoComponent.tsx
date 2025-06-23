import { useRef, useEffect } from "react";

const Video = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry?.isIntersecting) {
            videoRef.current.play().catch((err) => {
              console.warn("Video play interrupted:", err.message);
            });
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.7 }
    );

    const currentVideo = videoRef.current;
    if (currentVideo) observer.observe(currentVideo);

    return () => {
      if (currentVideo) observer.unobserve(currentVideo);
    };
  }, []);

  return (
    <div className="aspect-video rounded-xl bg-slate-950 overflow-hidden">
      <div className="relative overflow-hidden rounded-xl shadow-2xl bg-slate-950">
        <video
          src="https://res.cloudinary.com/dbghbvuhb/video/upload/v1750332959/joh98xdrnraick4yxujk.mp4"
          loop
          muted
          ref={videoRef}
          playsInline
          className="w-full h-full object-cover rounded-xl"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
export default Video;