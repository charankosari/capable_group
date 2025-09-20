"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ArrowRight, Star, Zap, Users, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Star, value: "1000+", label: "Projects Completed" },
  { icon: Award, value: "5+", label: "Years Experience" },
  { icon: Zap, value: "24/7", label: "Support" },
];

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Animate title
      tl.fromTo(
        titleRef.current?.children || [],
        {
          y: 100,
          opacity: 0,
          rotateX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      );

      // Animate subtitle
      tl.fromTo(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.6"
      );

      // Animate CTA buttons
      tl.fromTo(
        ctaRef.current?.children || [],
        {
          y: 30,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );

      // Animate stats
      tl.fromTo(
        statsRef.current?.children || [],
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // Floating animation for background elements
      gsap.to(".floating-element", {
        y: -20,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
        stagger: 0.5,
      });

      // Pulse animation for accent elements
      gsap.to(".pulse-element", {
        scale: 1.1,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut",
        stagger: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <BackgroundBeams />
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 floating-element">
          <div className="w-20 h-20 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-xl"></div>
        </div>
        <div className="absolute top-40 right-20 floating-element">
          <div className="w-32 h-32 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg rotate-45 blur-xl"></div>
        </div>
        <div className="absolute bottom-20 left-20 floating-element">
          <div className="w-24 h-24 bg-gradient-to-r from-primary/15 to-primary/8 rounded-full blur-xl"></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Title */}
          <div ref={titleRef} className="mb-8">
            <div className="inline-block">
              <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent leading-tight">
                Capable
              </span>
            </div>
            <div className="inline-block ml-4">
              <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-primary via-primary to-foreground bg-clip-text text-transparent leading-tight">
                Groups
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} className="mb-12">
            <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Transforming businesses with cutting-edge{" "}
              <span className="text-primary font-semibold">digital solutions</span>,
              innovative development, and strategic marketing that drives real results.
            </p>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              onClick={() => scrollToSection("services")}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground text-lg px-8 py-4 h-auto group"
            >
              Explore Our Services
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("portfolio")}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-4 h-auto"
            >
              View Our Work
            </Button>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex justify-center mb-3">
                    <div className="pulse-element w-12 h-12 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
}