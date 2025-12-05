import React from 'react';
import Image from 'next/image';

const Hero = () => {
    return (
        <section className="relative min-h-screen w-full flex flex-col justify-between bg-black overflow-hidden">

            {/* --- Background Video --- */}
            <video
                className="absolute top-0 left-0 w-full h-[80%] object-cover z-0"
                autoPlay
                loop
                muted
                playsInline
            >
                <source
                    src="https://therootsdigital.com/wp-content/uploads/2025/10/Untitled-design.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>

            {/* --- Left-aligned Headline --- */}
            <div className="relative z-20 h-full mt-auto w-full container px-4 md:px-8 flex flex-col justify-between pt-24 pb-8 md:pb-16">
                <div className="max-w-4xl flex-grow flex items-start">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl tracking-wide font-bold leading-none text-lime-accent">
                        Rethink
                        <br />
                        Reinvent
                        <br />
                        Revolutionize
                    </h2>
                </div>
            </div>

            {/* --- Centered Image + About Text --- */}
            <div className="relative z-20 w-full px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-16 max-w-6xl mx-auto pb-8 md:pb-12">

                    {/* --- Image --- */}
                    <div className="flex-shrink-0 flex items-center justify-center">
                        <Image
                            src="/images/b_logo.webp"
                            alt="About Us Graphic"
                            width={800}
                            height={1000}
                            className="w-full max-w-[18rem] sm:max-w-[22rem] md:max-w-[28rem] lg:max-w-[34rem] h-auto object-contain"
                            priority
                        />
                    </div>

                    {/* --- About Text --- */}
                    <div className="flex flex-col items-end md:items-start text-white text-center md:text-left">
                        <h5 className="relative text-base font-bold text-gray-400 mb-4 pl-6 before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:rounded-full before:bg-lime-accent">
                            ABOUT THE ROOTS DIGITAL
                        </h5>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl  uppercase leading-tight">
                            CRAFTING DIGITAL
                        </h2>
                        <h2 className='text-4xl md:text-5xl lg:text-6xl uppercase leading-tight text-[#868686]'>
                            EXCELLENCE
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;