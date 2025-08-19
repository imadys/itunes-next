import { Heart, Home, Search } from "lucide-react";

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
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

// Menu items.
const items = [
    {
        title: "الرئيسية",
        url: "/",
        icon: Home,
    },
    {
        title: "إستكشف",
        url: "/explore",
        icon: Search,
    }
];

const items2 = [
    {
        title: "المفضلة",
        url: "/favorites",
        icon: Heart,
    }
]

export function AppSidebar() {
    return (
        <Sidebar side="right">
            <SidebarHeader>
                <Link href="/">
                    <Image src={"/logo-black.png"} alt="Logo" width={100} height={100} />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
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
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
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