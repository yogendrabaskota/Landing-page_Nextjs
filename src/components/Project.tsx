"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags?: string[];
  link: string;
}

// Sample project data -
const projectsData: Project[] = [
  {
    id: 1,
    title: "Site design for IT company",
    category: "Website",
    description:
      "Modern corporate website with clean design and responsive layout",
    image: "/project11.png",
    link: "#",
  },
  {
    id: 2,
    title: "Travel app design",
    category: "App Design",
    description: "Mobile application UI/UX design for travel booking platform",
    image: "/image.png",
    link: "#",
  },
  {
    id: 3,
    title: "E-commerce Platform",
    category: "Website",
    description: "Full-stack e-commerce solution with payment integration",
    image: "/project11.png",
    link: "#",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="relative group cursor-pointer">
      <div className="bg-[#242424] backdrop-blur-sm border border-gray-700/50 rounded-[14px] overflow-hidden hover:border-gray-600/50 transition-all duration-300">
        {/* Image Section */}
        <div className="relative h-72">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          <div className="absolute bottom-4 left-4 right-4">
            <p className="inline-block px-3 py-1 bg-gradient-to-r from-[#dfa7a5] to-[#ad7c6f] text-white text-xs font-medium rounded-full mb-2">
              {project.category}
            </p>

            <h3 className="text-xl font-semibold text-white mb-2 leading-tight">
              {project.title}
            </h3>

            <Link
              href={project.link}
              className="inline-flex items-center text-gray-300 text-sm hover:text-white transition-colors duration-200 group/link"
            >
              <span>view detail</span>
              <svg
                className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/link:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 7l-10 10M17 7H7M17 7v10"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Project = () => {
  const [projects, setProjects] = useState<Project[]>(projectsData);

  return (
    <section className="min-h-screen bg-[#242424] py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
          <button className="relative overflow-hidden bg-[#242424] text-white px-6 py-4 ">
            {/* White semi-rectangle background shape */}
            <div className="absolute top-0 right-0 w-3/5 h-2/4 bg-white rounded-tr-[50px] mt-4"></div>

            <span className="relative block  font-semibold text-[25px] mix-blend-difference pr-[50px]">
              THE SIMPLE
            </span>
            <span className=" block  mix-blend-difference pl-[90px] text-[25px]">
              EASY WORK
            </span>
          </button>

          <div className="flex items-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300 text-lg group"
            >
              <span>See the Portfolio</span>
              <svg
                className="w-5 h-5 ml-3 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 7l-10 10M17 7H7M17 7v10"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
