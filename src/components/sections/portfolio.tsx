"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ExternalLink,
  Github,
  ArrowRight,
  Code,
  TrendingUp,
  Users,
  Eye,
  Award,
  Zap,
} from "lucide-react";

// Register ScrollTrigger only on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ProjectCategory = "all" | "web" | "app" | "marketing" | "staffing";

interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory[];
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  metrics: {
    label: string;
    value: string;
    icon: LucideIcon;
  }[];
  featured: boolean;
  year: string;
  client: string;
}

const projects: Project[] = [
  {
    id: "ecommerce-platform",
    title: "E-commerce Platform",
    description: "A modern, responsive e-commerce platform built with Next.js and Stripe integration, featuring real-time inventory management and advanced analytics.",
    category: ["web"],
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "React", "TypeScript", "Stripe", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    metrics: [
      { label: "Conversion Rate", value: "+300%", icon: TrendingUp },
      { label: "Page Speed", value: "95/100", icon: Zap },
      { label: "Monthly Users", value: "50K+", icon: Users },
    ],
    featured: true,
    year: "2024",
    client: "TechStart Inc.",
  },
  {
    id: "mobile-fitness-app",
    title: "Fitness Tracking App",
    description: "Cross-platform mobile application for fitness tracking with real-time workout monitoring, social features, and personalized training plans.",
    category: ["app"],
    image: "/api/placeholder/600/400",
    technologies: ["React Native", "Firebase", "Node.js", "GraphQL"],
    liveUrl: "https://example.com",
    metrics: [
      { label: "App Store Rating", value: "4.8/5", icon: Award },
      { label: "Downloads", value: "100K+", icon: Eye },
      { label: "User Retention", value: "85%", icon: Users },
    ],
    featured: true,
    year: "2024",
    client: "FitLife Corp",
  },
  {
    id: "digital-marketing-campaign",
    title: "Digital Marketing Suite",
    description: "Comprehensive digital marketing campaign that increased brand awareness by 400% and generated over $2M in revenue within 6 months.",
    category: ["marketing"],
    image: "/api/placeholder/600/400",
    technologies: ["Google Ads", "Facebook Ads", "Analytics", "HubSpot"],
    metrics: [
      { label: "ROI Increase", value: "+400%", icon: TrendingUp },
      { label: "Lead Generation", value: "10K+", icon: Users },
      { label: "Brand Reach", value: "2M+", icon: Eye },
    ],
    featured: true,
    year: "2023",
    client: "GrowthCo",
  },
  {
    id: "healthcare-portal",
    title: "Healthcare Management Portal",
    description: "Secure healthcare management system with patient records, appointment scheduling, and telemedicine capabilities.",
    category: ["web"],
    image: "/api/placeholder/600/400",
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    liveUrl: "https://example.com",
    metrics: [
      { label: "Patient Satisfaction", value: "98%", icon: Award },
      { label: "Appointment Efficiency", value: "+250%", icon: Zap },
      { label: "Users", value: "25K+", icon: Users },
    ],
    featured: false,
    year: "2023",
    client: "HealthTech Solutions",
  },
  {
    id: "food-delivery-app",
    title: "Food Delivery Platform",
    description: "Complete food delivery ecosystem with customer app, restaurant dashboard, and delivery driver interface.",
    category: ["app", "web"],
    image: "/api/placeholder/600/400",
    technologies: ["Flutter", "Django", "PostgreSQL", "Redis"],
    liveUrl: "https://example.com",
    metrics: [
      { label: "Orders Daily", value: "5K+", icon: TrendingUp },
      { label: "Restaurant Partners", value: "500+", icon: Users },
      { label: "Delivery Time", value: "25 min avg", icon: Zap },
    ],
    featured: false,
    year: "2023",
    client: "FoodLink",
  },
  {
    id: "staffing-management",
    title: "Domestic Staffing Solution",
    description: "AI-powered domestic staffing platform that matches households with qualified personnel, featuring background checks and skill assessments.",
    category: ["staffing", "web"],
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "Python", "AI/ML", "PostgreSQL"],
    liveUrl: "https://example.com",
    metrics: [
      { label: "Successful Placements", value: "1K+", icon: Award },
      { label: "Client Satisfaction", value: "96%", icon: Users },
      { label: "Response Time", value: "2 hrs avg", icon: Zap },
    ],
    featured: false,
    year: "2024",
    client: "HomeEase",
  },
];

const categories = [
  { id: "all", label: "All Projects", count: projects.length },
  { id: "web", label: "Web Development", count: projects.filter(p => p.category.includes("web")).length },
  { id: "app", label: "App Development", count: projects.filter(p => p.category.includes("app")).length },
  { id: "marketing", label: "Digital Marketing", count: projects.filter(p => p.category.includes("marketing")).length },
  { id: "staffing", label: "Staffing Solutions", count: projects.filter(p => p.category.includes("staffing")).length },
];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => 
        project.category.includes(activeCategory)
      ));
    }
  }, [activeCategory]);

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

      // Tabs animation
      gsap.fromTo(
        tabsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tabsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="portfolio" ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Our Work
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Portfolio &
            <span className="block text-primary">Success Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
  Explore our recent projects and see how we&apos;ve helped businesses transform their digital presence and achieve remarkable results.
</p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Featured Projects</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <div className="w-full h-64 bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center">
                      <Code className="w-16 h-16 text-primary opacity-50" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary/90 text-primary-foreground">
                        {project.year}
                      </Badge>
                    </div>
                    {project.liveUrl && (
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="sm" className="bg-primary/90 hover:bg-primary">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h4>
                      {project.githubUrl && (
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Github className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {project.metrics.slice(0, 2).map((metric) => {
                        const IconComponent = metric.icon;
                        return (
                          <div key={metric.label} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground flex items-center">
                              <IconComponent className="w-4 h-4 mr-2 text-primary" />
                              {metric.label}
                            </span>
                            <span className="font-semibold text-primary">{metric.value}</span>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Client: {project.client}</span>
                        <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                          View Details <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div ref={tabsRef} className="flex justify-center mb-12">
          <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as ProjectCategory)}>
            <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5 bg-muted/50 backdrop-blur-sm">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Project Grid */}
        <div ref={gridRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                    <div className="relative overflow-hidden">
                      <div className="w-full h-48 bg-gradient-to-r from-muted to-muted/50 flex items-center justify-center">
                        <Code className="w-12 h-12 text-primary/50" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                          {project.category[0]}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                    </div>
                    
                    <CardContent className="p-6">
                      <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h4>
                      
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{project.year}</span>
                        <div className="flex items-center space-x-2">
                          {project.liveUrl && (
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button variant="ghost" size="sm">
                              <Github className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ready to Create Your Success Story?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
  Let&apos;s collaborate on your next project and create something amazing together. We&apos;re excited to bring your vision to life.
</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                View All Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}