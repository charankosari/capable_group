"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Github,
  Youtube,
  Send,
  Heart,
} from "lucide-react";

const footerLinks = {
  services: [
    { name: "Web Development", href: "#services" },
    { name: "App Development", href: "#services" },
    { name: "Digital Marketing", href: "#services" },
    { name: "Domestic Staffing", href: "#services" },
    { name: "UI/UX Design", href: "#services" },
    { name: "E-commerce Solutions", href: "#services" },
  ],
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#about" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Case Studies", href: "#portfolio" },
    { name: "Testimonials", href: "#about" },
  ],
  support: [
    { name: "Contact Us", href: "#contact" },
    { name: "Support Center", href: "/support" },
    { name: "Live Chat", href: "#contact" },
    { name: "Schedule Call", href: "#contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Technical Support", href: "/tech-support" },
  ],
};

const socialLinks = [
  { 
    icon: Linkedin, 
    href: "https://linkedin.com/company/capable-groups", 
    label: "LinkedIn",
    color: "hover:text-[#0077B5]"
  },
  { 
    icon: Twitter, 
    href: "https://twitter.com/capablegroups", 
    label: "Twitter",
    color: "hover:text-[#1DA1F2]"
  },
  { 
    icon: Instagram, 
    href: "https://instagram.com/capablegroups", 
    label: "Instagram",
    color: "hover:text-[#E4405F]"
  },
  { 
    icon: Facebook, 
    href: "https://facebook.com/capablegroups", 
    label: "Facebook",
    color: "hover:text-[#1877F2]"
  },
  { 
    icon: Github, 
    href: "https://github.com/capable-groups", 
    label: "GitHub",
    color: "hover:text-[#333]"
  },
  { 
    icon: Youtube, 
    href: "https://youtube.com/@capablegroups", 
    label: "YouTube",
    color: "hover:text-[#FF0000]"
  },
];

const contactInfo = [
  {
    icon: Phone,
    text: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: Mail,
    text: "hello@capablegroups.com",
    href: "mailto:hello@capablegroups.com",
  },
  {
    icon: MapPin,
    text: "New York, NY • Los Angeles, CA",
    href: "#contact",
  },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-background to-muted/20 border-t border-border/50">
      {/* Newsletter Section */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Stay Updated with Our Latest Insights
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for industry insights, project updates, and exclusive tips on digital transformation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1"
                />
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-6">
                  Subscribe
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/60 rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">C</span>
              </div>
              <span className="font-bold text-2xl text-foreground">
                Capable Groups
              </span>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Leading digital agency specializing in web development, mobile apps, digital marketing, and staffing solutions.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    onClick={(e) => {
                      if (info.href.startsWith("#")) {
                        e.preventDefault();
                        scrollToSection(info.href);
                      }
                    }}
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-300 group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconComponent className="w-4 h-4 mr-3 text-primary" />
                    <span className="group-hover:underline">{info.text}</span>
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-muted hover:bg-primary/10 rounded-lg flex items-center justify-center text-muted-foreground ${social.color} transition-all duration-300 group`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-foreground mb-6">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-left group"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      {link.name}
                    </motion.span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-foreground mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("#") ? (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-left group"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        {link.name}
                      </motion.span>
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 group"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-foreground mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("#") ? (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 text-left group"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        {link.name}
                      </motion.span>
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 group"
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="inline-block"
                      >
                        {link.name}
                      </motion.span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Back to Top */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Button
            onClick={scrollToTop}
            variant="outline"
            className="group hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            Back to Top
            <ArrowRight className="w-4 h-4 ml-2 rotate-[-90deg] group-hover:translate-y-[-2px] transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-muted-foreground text-sm text-center md:text-left"
            >
              <span suppressHydrationWarning>
                © {new Date().getFullYear()} Capable Groups. All rights reserved.
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center text-muted-foreground text-sm"
            >
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500" />
              <span>in the USA</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex space-x-6"
            >
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
              >
                Cookie Policy
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
