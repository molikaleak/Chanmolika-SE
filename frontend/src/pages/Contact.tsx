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
                    <p className="text-lg font-semibold text-gray-900">chanmolikaleak171@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-lg font-semibold text-gray-900">+855 70793090</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-lg font-semibold text-gray-900">Sangkat Prektasek, Khan Chroy Chongvar, Phnom Penh, Cambodia</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Connect with me</h3>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com/in/chanmolika-leak"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                  >
                    <Linkedin className="w-6 h-6 text-gray-700" />
                  </a>
                  <a
                    href="https://github.com/chanmolika"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
                  >
                    <Github className="w-6 h-6 text-gray-700" />
                  </a>
                  <a
                    href="mailto:chanmolikaleak171@gmail.com"
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
          <div className="bg-gradient-to-br from-red-500 via-red-600 to-rose-900 rounded-3xl p-8 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-white/90 mb-8">
              Whether you have a project in mind, need technical consultation, or want to explore collaboration opportunities, I'd love to hear from you.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Preferred Contact</p>
                  <p className="text-lg font-semibold">Email or LinkedIn</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Availability</p>
                  <p className="text-lg font-semibold">Mon–Fri, 9AM–6PM ICT</p>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-white/20">
              <p className="text-white/80 text-sm">
                Currently open to:
                <span className="block mt-2 font-semibold">
                  • Full-time Software Engineering roles<br />
                  • Fintech & Innovation projects<br />
                  • Technical leadership opportunities<br />
                  • Startup advisory & mentorship
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}