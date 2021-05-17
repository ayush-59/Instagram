import { useEffect } from "react";
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Instagram";
  }, []);
  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 justify-between mx-auto max-w-screen-lg gap-4">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
