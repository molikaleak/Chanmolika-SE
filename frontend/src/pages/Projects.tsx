import AppLayout from "./AppLayout";
import StarFollower from "../components/StarFollower";
import { Rocket, Code, Globe, Database, Cpu, Shield } from "lucide-react";

const projects = [
  {
    title: "Facial Recognition AI System",
    description:
      "AI-based facial recognition system for identity verification and analysis. Built using Python and FastAPI, featuring model training, inference APIs, and real-time prediction endpoints.",
    icon: <Cpu className="w-8 h-8" />,
    tags: ["Python", "FastAPI", "Computer Vision", "AI"],
    status: "Prototype",
    color: "from-purple-500 to-indigo-400",
  },
  {
    title: "Leaf Disease Detection AI",
    description:
      "Machine learning model for detecting plant leaf diseases from images. Focused on agricultural use cases, including data preprocessing, model training, and prediction APIs.",
    icon: <Cpu className="w-8 h-8" />,
    tags: ["Python", "TensorFlow", "OpenCV", "AI"],
    status: "Prototype",
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "Blockchain Ownership Transfer System",
    description:
      "Blockchain-based ownership transfer system enabling secure and transparent asset transfers. Designed smart contract logic for recording ownership changes on-chain.",
    icon: <Database className="w-8 h-8" />,
    tags: ["Blockchain", "Smart Contracts", "Solidity"],
    status: "Prototype",
    color: "from-orange-500 to-red-400",
  },
  {
    title: "Scholarship Management System",
    description:
      "End-to-end scholarship management platform for universities, handling applications, reviews, approvals, and student records with role-based access control.",
    icon: <Shield className="w-8 h-8" />,
    tags: ["Node.js", "PostgreSQL", "RBAC", "REST API"],
    status: "Live",
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "KPI Analysis & Open API Platform",
    description:
      "KPI analytics platform with public APIs for developer communities. Enables data visualization, performance tracking, and integration via RESTful Open APIs.",
    icon: <Globe className="w-8 h-8" />,
    tags: ["OpenAPI", "Analytics", "REST API", "PostgreSQL"],
    status: "In Development",
    color: "from-indigo-500 to-violet-400",
  },
  {
    title: "Loan Origination & Pawnshop Management System",
    description:
      "Enterprise-grade loan origination and pawnshop management system built in Java. Handles customer records, loan lifecycles, collateral tracking, and repayment workflows.",
    icon: <Code className="w-8 h-8" />,
    tags: ["Java", "Spring Boot", "PostgreSQL", "Enterprise Systems"],
    status: "Live",
    color: "from-rose-500 to-pink-400",
  },
];

export default function Projects() {
  return (
    <AppLayout variant="default">
      {/* ⭐ Cursor Effect */}
      <StarFollower />

      {/* MAIN CONTENT */}
      <div className="px-4 md:px-10 py-6">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Projects & Builds
              </h1>
              <p className="mt-2 text-lg text-gray-700">
                A curated showcase of software I've designed, built, and shipped.
              </p>
            </div>
          </div>
          <div className="max-w-3xl">
            <p className="text-gray-600">
              From fintech systems to AI tools and interactive web experiences—each project reflects my passion for solving real‑world problems with clean, scalable code.
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <p className="text-3xl font-bold text-gray-900">15+</p>
            <p className="text-sm text-gray-500">Projects Shipped</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <p className="text-3xl font-bold text-gray-900">6</p>
            <p className="text-sm text-gray-500">Hackathon Wins</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <p className="text-3xl font-bold text-gray-900">4</p>
            <p className="text-sm text-gray-500">Open Source Contributions</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <p className="text-3xl font-bold text-gray-900">100%</p>
            <p className="text-sm text-gray-500">Client Satisfaction</p>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200 hover:shadow-3xl transition-shadow duration-300"
            >
              {/* Color accent bar */}
              <div className={`h-2 w-full bg-gradient-to-r ${project.color}`} />

              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">
                    {project.icon}
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${project.status === "Live" ? "bg-green-100 text-green-800" : project.status === "Beta" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}>
                    {project.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-700 mb-6">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <button className="w-full py-3 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-semibold rounded-xl transition">
                  View Case Study
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call‑to‑Action */}
        <div className="mt-16 bg-gradient-to-br from-gray-900 to-black rounded-3xl p-10 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to build something together?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            I'm always open to discussing new ideas, partnerships, or freelance opportunities.
            Let's turn your vision into a working product.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition"
            >
              Get in Touch
            </a>
            <a
              href="/resume"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition"
            >
              View My Resume
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}