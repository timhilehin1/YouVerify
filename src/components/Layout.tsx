import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { toast, Toaster } from "sonner";
import { getCurrentUserWithProfile } from "../lib/services/profile";
import type { UserProfile } from "../interfaces/Profile.model";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const { profile, error } = await getCurrentUserWithProfile();

      if (error) {
        console.error("Problem fetching profile:", error.message);
        toast.error("Error fetching profile");
      }
      setProfile(profile);
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-68">
        <Navbar
          data={profile}
          onMenuClick={() => setSidebarOpen(true)}
          title="INVOICE"
        />

        <main className="p-4 sm:p-8 lg:p-10 -z-50">{children}</main>
      </div>
    </div>
  );
}
