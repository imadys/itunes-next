import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";

export function PageHeader() {
    return (
        <header className="h-20 border-b flex items-center gap-4 px-4">
            <SidebarTrigger />

            <div className="relative ms-auto">
                <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 end-2" />
                <Input placeholder="ابحث عن فئة" className="w-fit pe-8" />
            </div>

        </header>
    )
}