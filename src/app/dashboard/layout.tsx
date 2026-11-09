import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashBoardSideBar } from "../components/DashboardSideBar"
import { Toaster } from "@/components/ui/toast";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   return (
    <SidebarProvider>
      <DashBoardSideBar></DashBoardSideBar>
      <main>
        <SidebarTrigger />
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  )
};

export default DashboardLayout;