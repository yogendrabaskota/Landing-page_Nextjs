"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  tags?: string[];
  link?: string | undefined;
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="relative group cursor-pointer">
      <div className="bg-[#242424] backdrop-blur-sm border border-gray-700/50 rounded-[14px] overflow-hidden hover:border-gray-600/50 transition-all duration-300">
        {/* Image Section */}
        <div className="relative h-72">
          <Image
            src={project.imageUrl}
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
              href={project.imageUrl}
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/projects`);

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data);

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="min-h-screen bg-[#242424] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
            <button className="relative overflow-hidden bg-[#242424] text-white px-6 py-4">
              <div className="absolute top-0 right-0 w-3/5 h-2/4 bg-white rounded-tr-[50px] mt-4"></div>
              <span className="relative block font-semibold text-[25px] mix-blend-difference pr-[50px]">
                THE SIMPLE
              </span>
              <span className="block mix-blend-difference pl-[90px] text-[25px]">
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

          {/* Loading skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((item) => (
              <div key={item} className="relative group cursor-pointer">
                <div className="bg-[#242424] backdrop-blur-sm border border-gray-700/50 rounded-[14px] overflow-hidden">
                  <div className="relative h-72 bg-gray-700 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="min-h-screen bg-[#242424] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
            <button className="relative overflow-hidden bg-[#242424] text-white px-6 py-4">
              <div className="absolute top-0 right-0 w-3/5 h-2/4 bg-white rounded-tr-[50px] mt-4"></div>
              <span className="relative block font-semibold text-[25px] mix-blend-difference pr-[50px]">
                THE SIMPLE
              </span>
              <span className="block mix-blend-difference pl-[90px] text-[25px]">
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

          <div className="text-center py-12">
            <div className="text-red-400 text-xl mb-4">
              Error loading projects
            </div>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={fetchProjects}
              className="bg-gradient-to-r from-[#dfa7a5] to-[#ad7c6f] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

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
            <>
              <div>
                <ProjectCard key={project.id} project={project} />
              </div>
            </>
          ))}
          <div className="relative group cursor-pointer">
            <div className="bg-[#242424] backdrop-blur-sm border border-gray-700/50 rounded-[14px] overflow-hidden hover:border-gray-600/50 transition-all duration-300 flex flex-col items-center justify-center h-72 p-6 text-center">
              {/* Centered Text */}
              <h3 className="text-xl font-semibold text-gray-200 mb-4 leading-tight">
                Could not find what you need?
              </h3>
              <p className="text-sm font-medium text-gray-400 mb-4 leading-tight">
                Suggest a tutorial, course or video. I seek feedback &
                suggestions!
              </p>

              {/* Request Now Button */}
              <button className="px-4 py-2 bg-gradient-to-r from-[#dfa7a5] to-[#ad7c6f] text-white text-sm font-medium rounded-full hover:opacity-90 transition">
                Request Now
              </button>
            </div>
          </div>
        </div>

        {projects.length === 0 && (
          <div className="relative group cursor-pointer w-[340px]">
            <div className="bg-[#242424] backdrop-blur-sm border border-gray-700/50 rounded-[14px] overflow-hidden hover:border-gray-600/50 transition-all duration-300 flex flex-col items-center justify-center h-72 p-6 text-center">
              {/* Centered Text */}
              <h3 className="text-xl font-semibold text-gray-200 mb-4 leading-tight">
                Could not find what you need?
              </h3>
              <p className="text-sm font-medium text-gray-400 mb-4 leading-tight">
                Suggest a tutorial, course or video. I seek feedback &
                suggestions!
              </p>

              {/* Request Now Button */}
              <button className="px-4 py-2 bg-gradient-to-r from-[#dfa7a5] to-[#ad7c6f] text-white text-sm font-medium rounded-full hover:opacity-90 transition">
                Request Now
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Project;
