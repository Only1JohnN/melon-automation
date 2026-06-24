import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen bg-[#020B22] text-white">
      <Sidebar />

      <section className="flex-1 overflow-auto p-10">
        {children}
      </section>
    </main>
  );
}