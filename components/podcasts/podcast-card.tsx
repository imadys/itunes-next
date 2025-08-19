"use client";
import { Podcast } from "@/lib/types/podcast";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { AudioLinesIcon, CalendarIcon } from "lucide-react";

export function PodcastCard({ podcast }: { podcast: Podcast }) {
    return (
        <Card className="p-0 border-none relative overflow-hidden hover:scale-105 transition-all cursor-pointer group">
            <CardContent className="p-0 overflow-hidden">
                <div className="flex flex-col">
                    <Image className="w-full " src={podcast.artworkUrl600} alt={podcast.trackName} width={100} height={100} />
                    <div className="flex flex-col p-4">
                        <div className="flex flex-col">
                        <h2 className="text-sm font-bold">
                            {podcast.trackName}
                        </h2>
                        <p className="text-sm text-gray-500">
                            {podcast.artistName}
                        </p>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                <AudioLinesIcon className="w-3 h-3" /> {podcast.trackCount} حلقة
                            </div>
                            <div className="text-xs ms-auto text-gray-500 flex items-center gap-1">
                                <CalendarIcon className="w-3 h-3" /> {new Date(podcast.releaseDate).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
                <Link className="absolute inset-0" href={`/podcast/${podcast.id}`}>
                    <span className="sr-only group-hover:block hidden">{podcast.trackName}</span>
                </Link>
            </CardContent>
        </Card>
    )
}