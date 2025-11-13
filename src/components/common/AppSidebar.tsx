"use client";
import { LayoutDashboard, LogOut, RssIcon, Settings, User, Users } from "lucide-react";
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
    url: "/admins",
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
      <SidebarHeader className="flex flex-col items-center py-4 md:py-6">
        <div className="flex w-full flex-col items-center gap-2 md:gap-3">
          <div className="mt-3 flex h-[60px] w-[60px] items-center justify-center group-data-[collapsible=icon]:mt-0 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 md:mt-6 md:h-[80px] md:w-[80px]">
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="h-full w-full object-contain group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10"
            />
          </div>
          <span className="text-center text-xl font-bold group-data-[collapsible=icon]:hidden md:text-2xl">
            DS
          </span>
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
                  <SidebarMenuButton
                    asChild
                    className="h-12 text-base font-medium md:h-16 md:text-lg"
                  >
                    <Link
                      href={items.url}
                      className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 md:gap-4"
                    >
                      <items.icon className="h-6 w-6 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:w-9 md:h-7 md:w-7" />
                      <span className="text-base font-medium md:text-lg">{items.title}</span>
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
            <SidebarMenuButton asChild className="h-12 text-base font-medium md:h-16 md:text-lg">
              <Link
                href="#"
                className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 md:gap-4"
              >
                <LogOut className="h-6 w-6 text-red-600 group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:w-9 md:h-7 md:w-7" />
                <span className="text-base font-medium text-red-500 md:text-lg">Log Out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
