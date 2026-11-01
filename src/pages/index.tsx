import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/config";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Code, Users, Github } from "lucide-react"; // Added Github import
import Link from "next/link";
import { useState, useEffect } from 'react';

export default function Home() {
  const [leetcodeCount, setLeetcodeCount] = useState<string | number>(
    siteConfig.stats.find(s => s.label.toLowerCase().includes('leetcode'))?.value || "220+");
  useEffect(() => {
    fetch('/stats.json')
      .then((res) => res.json())
      .then((data) => {
        if (data?.totalSolved) {
          setLeetcodeCount(data.totalSolved);
        }
      })
      .catch((err) => console.error('Failed to load stats.json', err));
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-main">
      <Navbar />

      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">

        {/* HERO SECTION */}
        <section className="min-h-[50vh] flex flex-col justify-center mb-16">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-primary mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Current Focus: {siteConfig.currentFocus}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Solving problems with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Data & Intelligence.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-lg text-text-muted max-w-2xl leading-relaxed mb-8">
              I am {siteConfig.name}, an {siteConfig.title}. I don't just build models;
              I engineer systems that apply AI to real-world data constraints.
              My work spans from <span className="text-white">Agentic Workflows</span> to <span className="text-white">Distributed Systems</span>.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/projects"
                className="px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                View Selected Work <ArrowRight size={18} />
              </Link>
              <Link
                href="/resume.pdf"
                className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
              >
                Resume
              </Link>
            </div>
          </Reveal>
        </section>


        {/* STATS BAR (With Links) */}
        <Reveal delay={0.4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24 border-y border-white/5 py-8">
            {siteConfig.stats.map((stat, i) => {
              // Wrap content in a Link if 'link' exists, otherwise just div
              const Content = () => (
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="p-3 bg-white/5 rounded-lg text-primary group-hover:bg-primary/10 group-hover:text-white transition-colors">
                    {stat.icon}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold">
                      {stat.label.toLowerCase().includes("leetcode") ? leetcodeCount : stat.value}
                    </h4>
                    <p className="text-xs text-text-muted uppercase tracking-wider group-hover:text-primary transition-colors">{stat.label}</p>
                  </div>
                </div>
              );

              return stat.link ? (
                <a key={i} href={stat.link} target="_blank">
                  <Content />
                </a>
              ) : (
                <div key={i}><Content /></div>
              );
            })}
          </div>
        </Reveal>


        {/* BENTO GRID */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <h2 className="text-3xl font-bold">A Glimpse of my Work</h2>
            <Link href="/projects" className="text-primary hover:underline text-sm mt-2 md:mt-0">See all projects →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">

            {/* BOX 1: Main Featured Project */}
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-2 p-8 rounded-3xl bg-surface border border-white/5 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-primary/20" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">Featured AI Project</span>
                  <a href={siteConfig.featuredProjects[0].link} target="_blank">
                    <ExternalLink className="text-text-muted group-hover:text-white transition-colors" />
                  </a>
                </div>
                <h3 className="text-2xl font-bold mb-2">{siteConfig.featuredProjects[0].title}</h3>
                <p className="text-text-muted max-w-md">{siteConfig.featuredProjects[0].desc}</p>
              </div>
              <div className="flex gap-2 relative z-10">
                {siteConfig.featuredProjects[0].tech.map(t => (
                  <span key={t} className="text-xs border border-white/10 px-2 py-1 rounded bg-black/20">{t}</span>
                ))}
              </div>
            </motion.div>

            {/* BOX 2: Algorithmic Proficiency */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-surface to-black border border-white/5 flex flex-col justify-between group"
            >
              <div>
                <div className="mb-4 p-3 bg-white/5 w-fit rounded-xl text-yellow-500">
                  <Code size={24} />
                </div>
                <h3 className="text-xl font-bold">Algorithmic <br /> Problem Solving</h3>
              </div>
              <div className="space-y-3">
                <a href={siteConfig.socials[2].href} target="_blank" className="flex justify-between items-center text-sm text-text-muted hover:text-white border-b border-white/5 pb-2">
                  <span>LeetCode</span>
                  <span className="text-white">Active</span>
                </a>
                <a href={siteConfig.socials[3].href} target="_blank" className="flex justify-between items-center text-sm text-text-muted hover:text-white border-b border-white/5 pb-2">
                  <span>CodeChef</span>
                  <span className="text-white">Active</span>
                </a>
              </div>
            </motion.div>

            {/* BOX 3: Leadership */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-surface border border-white/5 flex flex-col justify-between group"
            >
              <div>
                <div className="mb-4 p-3 bg-white/5 w-fit rounded-xl text-purple-400">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold">Leadership</h3>
                <p className="text-sm text-text-muted mt-2">
                  Organizer of National Hackathons & Conference Volunteer.
                </p>
              </div>
              <Link href="/leadership" className="text-sm text-primary hover:underline">
                View Gallery →
              </Link>
            </motion.div>

            {/* BOX 4: Second Project */}
            <motion.div
              whileHover={{ y: -5 }}
              className="md:col-span-2 p-8 rounded-3xl bg-surface border border-white/5 flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute bottom-0 left-0 p-32 bg-secondary/10 rounded-full blur-3xl -ml-16 -mb-16 transition-all group-hover:bg-secondary/20" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">Systems Engineering</span>
                  <a href={siteConfig.featuredProjects[1].link} target="_blank">
                    <ExternalLink className="text-text-muted group-hover:text-white transition-colors" />
                  </a>
                </div>
                <h3 className="text-2xl font-bold mb-2">{siteConfig.featuredProjects[1].title}</h3>
                <p className="text-text-muted max-w-md">{siteConfig.featuredProjects[1].desc}</p>
              </div>
              <div className="flex gap-2 relative z-10">
                {siteConfig.featuredProjects[1].tech.map(t => (
                  <span key={t} className="text-xs border border-white/10 px-2 py-1 rounded bg-black/20">{t}</span>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}