"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import { useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

export function PageHeader() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <header className="h-20 border-b flex items-center gap-4 px-4">
            <SidebarTrigger />

            <div className="relative ms-auto">
                <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 end-2 cursor-pointer" onClick={handleSearch} />
                <Input 
                    placeholder="ابحث عن فئة" 
                    className="w-full pe-8" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>

        </header>
    )
}