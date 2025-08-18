import { Episode } from "@/lib/types/podcast";
import { Play } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export default function EpisodeCard({ episode }: { episode: Episode }) {
    return (
        <div className="flex items-center gap-4 overflow-hidden border rounded-lg hover:translate-y-[-5px] hover:-translate-x-[-5px] transition-all" key={episode.id}>
            <Image src={episode.image} alt={episode.title} width={150} height={150} />
            <div className="flex flex-col gap-2">
                <h1 className="text-lg font-bold">{episode.title}</h1>
                <p className="text-sm text-gray-500 truncate max-w-[500px]">{episode.description}</p>
                <Button className="w-fit mt-3">
                    <Play className="w-4 h-4" />
                    شاهد الحلقة
                </Button>
            </div>
        </div>
    )
}