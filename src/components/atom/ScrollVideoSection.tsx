import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import videoSource from "../../assets/videos/o1.mp4"; // Ensure path is correct
import "./styles/scrollvideo.css"

gsap.registerPlugin(ScrollTrigger);

export default function ScrollVideoSection({ sectionRef } : {sectionRef: any}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Wait for metadata to ensure duration is accurate
    const onLoadedMetadata = () => {
      ScrollTrigger.refresh();
    };
    video.addEventListener("loadedmetadata", onLoadedMetadata);

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5, 
      onUpdate: (self) => {
        // Update video
        if (video.duration) {
          video.currentTime = video.duration * self.progress;
        }
        // Update progress bar
        if (progressRef.current) {
          progressRef.current.style.width = `${self.progress * 100}%`;
        }
      }
    });

    return () => {
      st.kill();
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [sectionRef]);

  return (
    <div className="scroll-video-wrapper">
      <div className="scroll-video-sticky">
        <video
          ref={videoRef}
          className="scroll-video-el"
          src={videoSource}
          preload="auto"
          muted
          playsInline
        />
        <div className="scroll-video-progress-track">
          <div className="scroll-video-progress-bar" ref={progressRef} />
        </div>
      </div>
    </div>
  );
}