import AppLayout from "./AppLayout";
import StarFollower from "../components/StarFollower";
import { Mail, Phone, MapPin, Linkedin, Github, Send } from "lucide-react";

export default function Contact() {
  return (
    <AppLayout variant="default">
      {/* ⭐ Cursor Effect */}
      <StarFollower />

      {/* MAIN CONTENT */}
      <div className="px-4 md:px-10 py-6">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl">
            I'm always open to discussing new opportunities, collaborations, or just a friendly chat.
            Feel free to reach out through any of the channels below.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT COLUMN: Contact Info */}
          <div className="space-y-8">
            {/* Contact Card */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-lg font-semibold text-gray-900">hello@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-lg font-semibold text-gray-900">+1 (123) 456-7890</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg font-semibold text-gray-900">Phnom Penh, Cambodia</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Connect with me</h3>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com/in/example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                  >
                    <Linkedin className="w-6 h-6 text-gray-700" />
                  </a>
                  <a
                    href="https://github.com/example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                  >
                    <Github className="w-6 h-6 text-gray-700" />
                  </a>
                  <a
                    href="mailto:hello@example.com"
                    className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                  >
                    <Send className="w-6 h-6 text-gray-700" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-3xl p-6 border border-rose-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Response Time</h3>
              <p className="text-gray-700">
                I typically respond within 24 hours. For urgent matters, please call or send a direct message on LinkedIn.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Call to Action Card */}
          <div className="space-y-8">
            {/* CTA Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-900" />
              <div className="relative p-8 text-white">
                <span className="inline-flex px-4 py-2 mb-4 text-sm font-semibold rounded-full bg-white/20">
                  🚀 Let's Work Together
                </span>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  Ready to bring your ideas to life?
                </h2>
                <p className="mt-4 text-white/90">
                  I specialize in building innovative software solutions with a focus on fintech, AI, and modern web technologies.
                  Whether you need a project developed, technical consultation, or a team member, I'm here to help.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div className="bg-white/20 rounded-xl p-4">
                    <p className="text-2xl font-bold">50+</p>
                    <p className="text-sm text-white/80">Projects Delivered</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4">
                    <p className="text-2xl font-bold">100%</p>
                    <p className="text-sm text-white/80">Client Satisfaction</p>
                  </div>
                </div>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:hello@example.com"
                    className="flex-1 bg-white text-purple-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-xl text-center transition"
                  >
                    Send an Email
                  </a>
                  <a
                    href="https://calendly.com/example"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-6 rounded-xl text-center transition"
                  >
                    Schedule a Call
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What to expect</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                  </div>
                  <span className="text-gray-700">Initial consultation within 48 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                  </div>
                  <span className="text-gray-700">Clear project scope and timeline</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                  </div>
                  <span className="text-gray-700">Regular updates and transparent communication</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-green-600" />
                  </div>
                  <span className="text-gray-700">Post‑launch support and maintenance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}