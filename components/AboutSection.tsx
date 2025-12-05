import Image from "next/image";

export default function ValueSection() {
  return (
    <section className="w-full bg-black text-white py-24 relative overflow-hidden">
      {/* Giant faint background text */}
      <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
        <Image
          src="/images/about-logo.webp"
          alt="background text"
          width={1200}
          height={1200}
          className="opacity-[0.06] object-contain select-none"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT SIDE CONTENT */}
        <div>
          {/* Tabs */}
          <div className="flex gap-12 text-gray-400 text-lg font-medium mb-10">
            <button className="hover:text-white transition">OUR MISSION</button>
            <button className="hover:text-white transition">OUR VISION</button>
            <button className="text-white">VALUE</button>
          </div>

          {/* Paragraphs */}
          <p className="leading-8 text-gray-300 mb-10">
            At the heart of everything we do lies one powerful belief to{" "}
            <span className="text-lime-400">revolutionize</span> how creativity
            and technology empower human potential. We seek to revolutionize the
            way ideas are born, built, and experienced, turning imagination into
            impact and <span className="text-lime-400">innovation</span> into
            emotion.
          </p>

          <p className="leading-8 text-gray-300">
            Our vision goes beyond change; it’s a movement to{" "}
            <span className="text-lime-400">revolutionize</span> connection,
            collaboration, and growth through digital transformation. We believe
            every brand, every idea, and every story has the power to evolve,
            inspire, and make a difference when guided by purpose, fueled by
            creativity, and driven by the will to{" "}
            <span className="text-lime-400">revolutionize</span>.
            </p>
          </div>

          {/* RIGHT SIDE ASTRONAUT */}
          <div className="w-full h-full">
            <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
              <Image
                src="/images/about-logo.webp"
                alt="background logo"
                width={420}
                height={420}
                className="absolute w-full h-full object-contain select-none opacity-20"
              />
              <Image
                src="/images/astronaut.webp"
                alt="astronaut"
                width={420}
                height={420}
                className="relative z-10 w-full h-full object-contain select-none"
              />
            </div>
          </div>
          </div>
        </section>
        );
      }
