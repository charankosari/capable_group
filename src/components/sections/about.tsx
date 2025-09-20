"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Target,
  Eye,
  Heart,
  Users,

  Star,
  Quote,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Rocket,
} from "lucide-react";

// Register ScrollTrigger only on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { number: 500, label: "Happy Clients", suffix: "+" },
  { number: 1000, label: "Projects Completed", suffix: "+" },
  { number: 98, label: "Success Rate", suffix: "%" },
  { number: 24, label: "Support Available", suffix: "/7" },
];

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for perfection in every project, delivering solutions that exceed expectations.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "Honest communication and transparent processes build lasting relationships with our clients.",
    color: "from-red-500 to-red-600",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We embrace cutting-edge technologies and creative approaches to solve complex challenges.",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    icon: Rocket,
    title: "Growth",
    description: "We're committed to continuous learning and helping our clients achieve sustainable growth.",
    color: "from-green-500 to-green-600",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    content: "Capable Groups transformed our online presence completely. Their web development team delivered a stunning, high-performance website that increased our conversions by 300%.",
    rating: 5,
    avatar: "/api/placeholder/60/60",
  },
  {
    name: "Michael Chen",
    role: "Marketing Director, GrowthCo",
    content: "Their digital marketing expertise is unmatched. We saw a 250% increase in qualified leads within the first three months of working with them.",
    rating: 5,
    avatar: "/api/placeholder/60/60",
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, HomeEase",
    content: "The domestic staffing solution they provided was exactly what we needed. Professional, reliable, and perfectly matched to our requirements.",
    rating: 5,
    avatar: "/api/placeholder/60/60",
  },
];

const milestones = [
  { year: "2019", title: "Company Founded", description: "Started with a vision to transform digital experiences" },
  { year: "2020", title: "100 Clients", description: "Reached our first major milestone in client satisfaction" },
  { year: "2021", title: "Expanded Services", description: "Added digital marketing and staffing solutions" },
  { year: "2022", title: "Award Recognition", description: "Received multiple industry awards for excellence" },
  { year: "2023", title: "500+ Projects", description: "Completed over 500 successful projects" },
  { year: "2024", title: "National Presence", description: "Expanded operations across major US cities" },
];

function AnimatedCounter({ 
  target, 
  duration = 2000,
  suffix = "",
}: { 
  target: number; 
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(countRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(target * easeOutQuart);
      
      setCount(currentCount);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isInView, target, duration]);

  return (
    <span ref={countRef} className="text-4xl lg:text-5xl font-bold text-primary">
      {count}{suffix}
    </span>
  );
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
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
            toggleActions: "play none none none",
          },
        }
      );

      // Values animation
      gsap.fromTo(
        ".value-card",
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
            trigger: valuesRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Timeline animation
      gsap.fromTo(
        ".milestone",
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Testimonials animation
      gsap.fromTo(
        ".testimonial",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testimonials",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            About Us
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Driving Digital
            <span className="block text-primary">Excellence</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We&apos;re a team of passionate professionals dedicated to delivering innovative digital solutions that transform businesses and create lasting impact.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center mr-4">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">Our Mission</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To empower businesses with cutting-edge digital solutions that drive growth, enhance efficiency, and create exceptional user experiences. We believe in transforming ideas into reality through innovation, expertise, and unwavering commitment to excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center mr-4">
                <Eye className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">Our Vision</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To be the leading digital agency that businesses trust for transformative solutions. We envision a future where technology seamlessly integrates with human needs, creating sustainable value and meaningful connections between brands and their audiences.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <div ref={valuesRef} className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Our Values</h3>
            <p className="text-muted-foreground">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => {
              const IconComponent = value.icon;
              return (
                <div key={value.title} className="value-card">
                  <Card className="h-full text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-foreground mb-3">{value.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Our Journey</h3>
            <p className="text-muted-foreground">Milestones that define our growth and success</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/50 hidden md:block"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="milestone flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full border-4 border-background shadow-lg z-10 mr-8 hidden md:flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                  </div>
                  <Card className="flex-1 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                          <h4 className="text-xl font-bold text-foreground mt-1">{milestone.title}</h4>
                          <p className="text-muted-foreground mt-2">{milestone.description}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-primary mt-4 md:mt-0 md:ml-4" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="testimonials">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">What Our Clients Say</h3>
            <p className="text-muted-foreground">Real feedback from businesses we&apos;ve helped transform</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="testimonial">
                <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <Quote className="w-8 h-8 text-primary mb-4" />
                    <p className="text-muted-foreground leading-relaxed mb-6">
                    &quot;{testimonial.content}&quot;
                    </p>
                    <div className="flex items-center mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-foreground">{testimonial.name}</h5>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who&apos;ve transformed their businesses with our digital solutions.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              Get Started Today
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}