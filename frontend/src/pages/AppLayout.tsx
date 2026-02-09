import Sidebar from "../components/Sidebar";

type Props = {
  children: React.ReactNode;
  variant?: "default" | "overlay";
};

export default function AppLayout({
  children,
  variant = "default",
}: Props) {
  const isOverlay = variant === "overlay";

  return (
    <div
      className={`
        min-h-screen relative
        ${isOverlay ? "bg-black" : "bg-gradient-to-br from-rose-100 to-rose-200"}
      `}
    >
      {/* SIDEBAR (overlay, does not affect layout) */}
      <aside
        className="
          fixed
          left-6
          top-1/2
          -translate-y-1/2
          z-30
          h-[80vh]
          flex items-center
          pointer-events-auto
        "
      >
        <Sidebar />
      </aside>

      {/* PAGE CONTENT */}
      <main
        className={`
          w-full
          ${isOverlay ? "" : "pl-[120px]"}
        `}
      >
        {children}
      </main>
    </div>
  );
}
