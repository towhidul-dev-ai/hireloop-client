import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashBoardSideBar } from "../components/DashboardSideBar"


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   return (
    <SidebarProvider>
      <DashBoardSideBar></DashBoardSideBar>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
};

export default DashboardLayout;