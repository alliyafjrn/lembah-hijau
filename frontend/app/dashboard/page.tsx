import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function DashboardPage() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        </div>
      </div>
    
  );
}