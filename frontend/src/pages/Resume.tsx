import AppLayout from "./AppLayout";
import JobMatchSection from "../components/JobMatchSection";

export default function Resume() {
  return (
    <AppLayout variant="overlay">
      <div
        className="
          min-h-screen bg-[#0b0b0d] text-white
          px-4 py-8
          sm:px-6 sm:py-10
          lg:px-10 lg:py-14
        "
      >
        <div
          className="
            mx-auto
            max-w-5xl
            space-y-12
          "
        >
          {/* PAGE HEADER */}
          <header className="space-y-2">
            <h1
              className="
                text-xl font-bold
                sm:text-2xl
                lg:text-3xl
              "
            >
              Job Match Analysis
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl">
              AI-powered job description analysis and match scoring
            </p>
          </header>

          {/* ================= JOB MATCH ================= */}
          <section>
            <JobMatchSection />
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
