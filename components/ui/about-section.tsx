"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import {VerticalCutReveal} from "@/components/ui/vertical-cut-reveal";
import { ArrowRight, Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function AboutSection3() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };
  
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    hidden: {
      filter: "blur(5px)",
      y: -10,
      opacity: 0,
    },
  };
  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    hidden: {
      filter: "blur(5px)",
      opacity: 0,
    },
  };
  return (
    <motion.section 
      className="min-h-screen bg-transparent text-gray-100 py-8 px-4 flex items-center -mb-1 relative" 
      ref={heroRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black pointer-events-none z-20" />
      <div className="max-w-6xl mx-auto w-full">
        <div className="relative">
          {/* Header with social icons */}
          <div className="flex justify-between items-center mb-8 w-full lg:w-[85%] relative lg:absolute lg:top-4 md:top-0 sm:-top-2 -top-3 z-10">
            <div className="flex items-center gap-2 text-xl">
              <span className="text-blue-500 animate-spin">✱</span>
              <TimelineContent
                as="span"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-2xl sm:text-3xl font-bold text-white tracking-wide"
              >
                ABOUT ACM
              </TimelineContent>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <TimelineContent
                as="a"
                animationNum={0}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://github.com/acm-chapter"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-700 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <Github className="w-4 h-4 text-gray-300" />
              </TimelineContent>
              <TimelineContent
                as="a"
                animationNum={1}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.linkedin.com/company/acm-chapter"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-700 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-gray-300" />
              </TimelineContent>
              <TimelineContent
                as="a"
                animationNum={2}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://twitter.com/acm_chapter"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-700 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <Twitter className="w-4 h-4 text-gray-300" />
              </TimelineContent>
              <TimelineContent
                as="a"
                animationNum={3}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="https://www.instagram.com/acm_chapter"
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 sm:w-6 w-5 sm:h-6 h-5 border border-gray-700 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <Instagram className="w-4 h-4 text-gray-300" />
              </TimelineContent>
            </div>
          </div>

          <TimelineContent
            as="figure"
            animationNum={4}
            timelineRef={heroRef}
            customVariants={scaleVariants}
            className="relative group w-full max-w-full overflow-hidden"
          >
            <svg
              className="w-full h-auto"
              width={"100%"}
              height={"100%"}
              viewBox="0 0 100 40"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <clipPath
                  id="clip-inverted"
                  clipPathUnits={"objectBoundingBox"}
                >
                  <path
                    d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                    fill="#D9D9D9"
                  />
                </clipPath>
              </defs>
              <image
                clipPath="url(#clip-inverted)"
                preserveAspectRatio="xMidYMid slice"
                width={"100%"}
                height={"100%"}
                href="/photos/DSC_0163.JPG"
              ></image>
            </svg>
          </TimelineContent>

          {/* Stats */}
          <div className="flex flex-wrap lg:justify-start justify-between items-center py-3 text-sm">
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-blue-500 font-bold">5+</span>
                <span className="text-gray-400">years established</span>
                <span className="text-gray-600">|</span>
              </div>
              <div className="flex items-center gap-2 mb-2 sm:text-base text-xs">
                <span className="text-blue-500 font-bold">500+</span>
                <span className="text-gray-400">members</span>
              </div>
            </TimelineContent>
            <div className="lg:absolute -right-8 bottom-8 flex lg:flex-col flex-row-reverse lg:gap-0 gap-4">
              <TimelineContent
                as="div"
                animationNum={6}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex lg:text-4xl sm:text-3xl text-2xl items-center gap-2 mb-2"
              >
                <span className="text-blue-500 font-semibold">50+</span>
                <span className="text-gray-400 uppercase">projects</span>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={7}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="flex items-center gap-2 mb-2 sm:text-base text-xs"
              >
                <span className="text-blue-500 font-bold">100+</span>
                <span className="text-gray-400">events hosted</span>
                <span className="text-gray-600 lg:hidden block">|</span>
              </TimelineContent>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="md:col-span-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl !leading-[110%] font-semibold text-gray-100 mb-6 sm:mb-8">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.05}
                staggerFrom="first"
                reverse={true}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: 1,
                }}
              >
                Building Tomorrow's Tech Leaders Today.
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={9}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-gray-400"
            >
              <TimelineContent
                as="div"
                animationNum={10}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs"
              >
                <p className="leading-relaxed text-justify">
                  Our journey began as a passionate group of students and evolved into a 
                  strategic community that transforms ideas into innovative solutions 
                  that help shape the future of technology.
                </p>
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={11}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="sm:text-base text-xs"
              >
                <p className="leading-relaxed text-justify">
                  Every student has potential, and we specialize in unlocking yours
                  through hands-on projects, mentorship, and real-world experience.
                  Join us in building the next generation of computing excellence.
                </p>
              </TimelineContent>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="text-right">
              <TimelineContent
                as="div"
                animationNum={12}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-blue-500 text-xl sm:text-2xl font-bold mb-2"
              >
                ACM CHAPTER
              </TimelineContent>
              <TimelineContent
                as="div"
                animationNum={13}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="text-gray-400 text-sm mb-8"
              >
                Student Organization | Tech Community
              </TimelineContent>

              <TimelineContent
                as="a"
                animationNum={14}
                timelineRef={heroRef}
                customVariants={revealVariants}
                href="/who-we-are"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 flex w-full sm:w-fit ml-auto gap-2 hover:gap-4 transition-all duration-300 ease-in-out text-white px-4 sm:px-5 py-3 rounded-lg cursor-pointer font-semibold text-sm sm:text-base"
              >
                WHO WE ARE <ArrowRight className="" />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
