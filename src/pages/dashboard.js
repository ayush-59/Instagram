import { useEffect } from "react";
import Header from "../components/header";
import Timeline from "../components/timeline";
import Sidebar from "../components/sidebar";
import useUser from "../hooks/use-user";
import LoggedInUserContext from "../context/logged-in-user";

export default function Dashboard() {
  const { user,setActiveUser } = useUser();

  useEffect(() => {
    document.title = "Instagram";
  }, []);
  return (
    <LoggedInUserContext.Provider value={{ user,setActiveUser }}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 justify-between mx-auto max-w-screen-lg gap-4">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
}
