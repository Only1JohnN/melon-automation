import Sidebar from "@/components/Sidebar";

export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#020B22] text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar />

        <section className="flex-1 overflow-auto p-6 sm:p-10">
          {children}
        </section>
      </div>
    </main>
  );
}