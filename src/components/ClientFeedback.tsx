"use client";

import { useState, useEffect, useRef,  RefObject } from "react";

// --- Custom Hook for Intersection Observer ---
interface UseInViewOptions extends IntersectionObserverInit {}
interface UseInViewReturn {
  ref: React.RefObject<HTMLElement | null>;
  isInView: boolean;
}

const useInView = (options: UseInViewOptions = {}): UseInViewReturn => {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options]);

  return { ref, isInView };
};

// --- Data Definition ---
interface ClientDataType {
  name: string;
  designation: string;
  work: string;
  videoAlt: string;
  videoLink: string;
}

const clientData: ClientDataType[] = [
  {
    name: "Derek Shull",
    designation: "Co-Founder",
    work: "Website",
    videoAlt: "Client feedback video from Derek Shull",
    videoLink: "https://www.youtube.com/watch?v=UEHdYNXiIUU",
  },
  {
    name: "Miska Tupla Kupla",
    designation: "Co-Founder",
    work: "Product Illustration",
    videoAlt: "Client feedback video from Miska Tupla Kupla",
    videoLink: "https://www.youtube.com/watch?v=20QUNgFIrK0",
  },
];

// --- Sub Component: Copy Link Button ---
interface CopyLinkButtonProps {
  linkUrl: string;
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ linkUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!navigator.clipboard) {
      alert("Clipboard API not supported by your browser.");
      return;
    }
    try {
      await navigator.clipboard.writeText(linkUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert("Could not copy link. Please copy manually: " + linkUrl);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 flex items-center p-1 px-2 rounded-lg text-xs font-medium transition-colors 
                 bg-black bg-opacity-70 text-white hover:bg-opacity-90 z-20 focus:outline-none focus:ring-2 focus:ring-white"
    >
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7v4a1 1 0 001 1h5a1 1 0 001-1V7m0 0a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h5z"
        />
      </svg>
      {copied ? "Copied!" : "Copy link"}
    </button>
  );
};

// --- Sub Component: Video Card ---
interface ClientVideoCardProps {
  client: ClientDataType;
  isVisible: boolean;
  delay?: number;
}

const ClientVideoCard: React.FC<ClientVideoCardProps> = ({
  client,
  isVisible,
  delay = 0,
}) => {
  const [showVideo, setShowVideo] = useState(false);

  const getVideoId = (url: string) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(client.videoLink);
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "";
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
    : "";

  return (
    <div
      className={`group flex-1 w-full 
    md:max-w-sm lg:max-w-md xl:max-w-md 
    relative aspect-video rounded-lg overflow-hidden bg-gray-900
    shadow-2xl
    transition-all duration-500 ease-out
    hover:scale-[1.03]
    hover:shadow-[0_0_35px_rgba(132,204,22,0.35)]
    ${
      isVisible
        ? "opacity-100 translate-x-0 scale-100"
        : "opacity-0 translate-x-10 scale-95"
    }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CopyLinkButton linkUrl={client.videoLink} />

      {!showVideo && (
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={() => setShowVideo(true)}
        >
          <img
            src={thumbnailUrl}
            alt={client.videoAlt}
            className="w-full h-full object-cover
    transition-all duration-500 ease-out
    group-hover:scale-110
    group-hover:brightness-110"
          />

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent
     opacity-60 group-hover:opacity-30 transition-opacity duration-500"
            />
            <svg
              className="w-20 h-20 text-white
    transition-all duration-500 ease-out
    opacity-90
    group-hover:scale-110
    group-hover:opacity-100
    group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
            >
              <path d="M6 3l12 9-12 9V3z" />
            </svg>
          </div>

          <a
            href={client.videoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute  bottom-2 left-2 text-white text-xs bg-black bg-opacity-70 p-1 px-2 rounded hover:bg-opacity-90 z-10"
          >
            Watch on YouTube
          </a>
          <div
            className="pointer-events-none absolute inset-0 rounded-lg
     ring-1 ring-transparent
     group-hover:ring-lime-400/40
     transition-all duration-500"
          />
        </div>
      )}

      {showVideo && (
        <iframe
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full absolute top-0 left-0"
          title={client.videoAlt}
        ></iframe>
      )}
    </div>
  );
};

// --- Sub Component: Animated Client Card ---
interface AnimatedClientCardProps {
  client: ClientDataType;
  index: number;
}

const AnimatedClientCard: React.FC<AnimatedClientCardProps> = ({
  client,
  index,
}) => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const infoItems = [
    { label: "Client Name", value: client.name },
    { label: "Designation", value: client.designation },
    { label: "Work", value: client.work },
  ];

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={`flex flex-col md:flex-row items-center mb-10 xl:mb-24 backdrop-blur-sm p-6 rounded-xl
        transition-all duration-700 ease-out
        ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        } inner-gradient-glow`}
      style={{
        boxShadow:
          index % 2 === 0
            ? "0 0 15px rgba(132, 204, 22, 0.1), 0 0 30px rgba(132, 204, 22, 0.05)"
            : "0 0 15px rgba(132, 204, 22, 0.1), inset 0 0 30px rgba(132, 204, 22, 0.03)",
        transitionDelay: "100ms",
      }}
    >
      {/* Info Section */}
      <div
        className="flex-1 text-white text-left 
             p-4 md:p-3 lg:p-4 xl:p-4
             md:mr-8 lg:mr-10 xl:mr-10
             w-full md:max-w-[420px] lg:max-w-[460px] xl:max-w-none
             mb-6 md:mb-0"
      >
        {infoItems.map((item, i) => (
          <div key={item.label} className="overflow-hidden">
            <p
              className={`text-xl sm:text-2xl font-light leading-relaxed
                transition-all duration-600 ease-out
                ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <span
                className={`text-lime-400 inline-block transition-all duration-500
                  ${
                    isInView
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                style={{ transitionDelay: `${250 + i * 150}ms` }}
              >
                {item.label} :
              </span>{" "}
              <span
                className={`inline-block transition-all duration-500
                  ${isInView ? "opacity-100 blur-0" : "opacity-0 blur-sm"}`}
                style={{ transitionDelay: `${350 + i * 150}ms` }}
              >
                {item.value}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Video Card */}
      <ClientVideoCard client={client} isVisible={isInView} delay={600} />
    </div>
  );
};

// --- Main Component ---
const ClientFeedback: React.FC = () => {
  const { ref: headerRef } = useInView({ threshold: 0.3 });

  return (
    <div className="relative bg-black min-h-screen">
      {/* Rings background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="ringGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#84cc16" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx="50%" cy="50%" r="300" fill="none" stroke="url(#ringGradient)" strokeWidth={1} opacity={0.2} />
            <circle cx="50%" cy="50%" r="500" fill="none" stroke="url(#ringGradient)" strokeWidth={1} opacity={0.15} />
            <circle cx="50%" cy="50%" r="700" fill="none" stroke="url(#ringGradient)" strokeWidth={2} opacity={0.1} />
            <circle cx="50%" cy="50%" r="100" fill="none" stroke="url(#ringGradient)" strokeWidth={1} opacity={0.25} />
          </svg>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 container mx-auto py-10 px-4 sm:px-10 lg:px-20">
        <div ref={headerRef as RefObject<HTMLDivElement>} className="mb-16 text-center"></div>

        {clientData.map((client, index) => (
          <AnimatedClientCard key={client.name} client={client} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ClientFeedback;
