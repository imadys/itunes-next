import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"

// Menu items.
const items = [
    {
        title: "الرئيسية",
        url: "#",
        icon: Home,
    },
    {
        title: "إستكشف",
        url: "#",
        icon: Inbox,
    }
];

const items2 = [
    {
        title: "المفضلة",
        url: "#",
        icon: Inbox,
    },
    {
        title: "شاهدته مؤخرًا",
        url: "#",
        icon: Home,
    }
]

export function AppSidebar() {
    return (
        <Sidebar side="right">
            <SidebarHeader>
                <Image src={"/logo-black.png"} alt="Logo" width={100} height={100} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                <SidebarGroup>
                    <SidebarGroupLabel>قوائمك</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items2.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}