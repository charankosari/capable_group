"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Smartphone,
  TrendingUp,
  Users,
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Palette,
  BarChart3,
  Search,
  PenTool,
} from "lucide-react";

// Register ScrollTrigger only on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies for optimal performance and user experience.",
    icon: Code,
    color: "from-blue-500 to-purple-600",
    features: ["React & Next.js", "Full-Stack Solutions", "E-commerce", "CMS Integration"],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB"],
  },
  {
    id: "app-dev",
    title: "App Development",
    description: "Native and cross-platform mobile applications that engage users and drive business growth.",
    icon: Smartphone,
    color: "from-green-500 to-teal-600",
    features: ["iOS & Android", "Cross-Platform", "UI/UX Design", "App Store Optimization"],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Comprehensive digital marketing strategies that boost your online presence and drive conversions.",
    icon: TrendingUp,
    color: "from-orange-500 to-red-600",
    features: ["SEO & SEM", "Social Media", "Content Marketing", "PPC Advertising"],
    technologies: ["Google Ads", "Analytics", "SEMrush", "Facebook Ads", "HubSpot"],
  },
  {
    id: "staffing",
    title: "Domestic Staffing",
    description: "Professional staffing solutions connecting you with qualified domestic personnel for your household needs.",
    icon: Users,
    color: "from-purple-500 to-pink-600",
    features: ["Background Checks", "Skill Assessment", "24/7 Support", "Replacement Guarantee"],
    technologies: ["HR Systems", "Screening Tools", "Management Software", "Communication Platforms"],
  },
];

const additionalServices = [
  { icon: Palette, title: "UI/UX Design", description: "Beautiful and intuitive designs" },
  { icon: Shield, title: "Cybersecurity", description: "Protect your digital assets" },
  { icon: BarChart3, title: "Analytics", description: "Data-driven insights" },
  { icon: Globe, title: "Cloud Solutions", description: "Scalable infrastructure" },
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );

      // Service cards animation
      gsap.fromTo(
        ".service-card",
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );

      // Additional services animation
      gsap.fromTo(
        ".additional-service",
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".additional-services",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Services
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Complete Digital
            <span className="block text-primary">Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From concept to deployment, we provide end-to-end digital services that transform your business and drive growth in the modern marketplace.
          </p>
        </div>

        {/* Main Services Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                className="service-card"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                  <CardContent className="p-8">
                    {/* Service Icon and Title */}
                    <div className="flex items-center mb-6">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} p-4 mr-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        <div className="w-12 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full mt-2 group-hover:w-20 transition-all duration-300"></div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center">
                            <Zap className="w-4 h-4 text-primary mr-2" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-foreground mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button className="w-full group/btn bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="additional-services">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Additional Expertise</h3>
            <p className="text-muted-foreground">Comprehensive solutions for all your digital needs</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className="additional-service text-center group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                    {service.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss your project and create a customized solution that drives results and exceeds expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                Get Free Consultation
              </Button>
              <Button size="lg" variant="outline">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}