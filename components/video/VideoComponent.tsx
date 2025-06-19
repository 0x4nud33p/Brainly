"use client";

import React, { useEffect, useRef } from "react";

export default function Video() {
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
    <div className="aspect-video rounded-lg bg-slate-950 overflow-hidden">
      <section id="video" className="my-10 drop-shadow-sm">
        <div className="max-w-5xl max-h-4xl mx-auto px-2">
          <div className="relative overflow-hidden rounded-xl shadow-2xl bg-slate-950">
            <video
              src="https://res.cloudinary.com/dbghbvuhb/video/upload/v1750332959/joh98xdrnraick4yxujk.mp4"
              loop
              muted
              ref={videoRef}
              playsInline
              className="w-full h-full object-cover rounded-xl"
            >
              Demo Video not found
            </video>
          </div>
        </div>
      </section>
    </div>
  );
}
