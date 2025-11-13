"use client";
import {
  LayoutDashboard,
  LogOut,
  RssIcon,
  Settings,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "../ui/sidebar";

const items = [
  {
    title: "Dashbaord",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "User",
    url: "/users",
    icon: Users,
  },
  {
    title: "Admins",
    url: "#",
    icon: User,
  },
  {
    title: "Blog",
    url: "#",
    icon: RssIcon,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const AppSidebar = () => {
  const { state } = useSidebar();

  return (
    <Sidebar className="mt-0 ml-0 md:mt-5 md:ml-5 md:rounded-t-2xl" collapsible="icon">
      {/* sidebar header */}
      <SidebarHeader className="py-4 md:py-6 flex flex-col items-center">
        <div className="flex flex-col items-center gap-2 md:gap-3 w-full">
          <div className="mt-3 md:mt-6 h-[60px] w-[60px] md:h-[80px] md:w-[80px] group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:mt-0 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="w-full h-full object-contain group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:h-10"
            />
          </div>
          <span className="text-xl md:text-2xl font-bold text-center group-data-[collapsible=icon]:hidden">DS</span>
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className="text-base font-semibold">Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((items) => (
                <SidebarMenuItem key={items.title}>
                  <SidebarMenuButton asChild className="h-12 md:h-16 text-base md:text-lg font-medium">
                    <Link href={items.url} className="flex items-center gap-3 md:gap-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
                      <items.icon className="w-6 h-6 md:w-7 md:h-7 group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:h-9" />
                      <span className="text-base md:text-lg font-medium">{items.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>

      {/* sidebar footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-12 md:h-16 text-base md:text-lg font-medium">
              <Link href="#" className="flex items-center gap-3 md:gap-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
                <LogOut className="w-6 h-6 md:w-7 md:h-7 group-data-[collapsible=icon]:w-9 group-data-[collapsible=icon]:h-9 text-red-600" />
                <span className="text-base md:text-lg font-medium text-red-500">Log Out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
