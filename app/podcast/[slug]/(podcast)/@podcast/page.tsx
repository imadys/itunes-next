import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { api } from "@/lib/api";
import { Podcast } from "@/lib/types/podcast";
import { Heart, Play, VideoIcon } from "lucide-react";
import Image from "next/image";

export default async function ({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const podcast = await api.get(`/podcasts/${slug}` , {
        next: {
            tags: [`podcast-${slug}`],
        }
    }) as Podcast;


    return (
        <div>
            <div className="w-full h-[200px] border-b pb-4">
                <div className="flex items-center gap-4">
                    <Image src={podcast.artworkUrl600} alt={podcast.trackName} width={200} height={200} />
                    <div className="p-4 flex flex-col">
                        <h1 className="text-2xl font-bold">{podcast.trackName}</h1>
                        <div className="flex mt-3 gap-2 items-center">
                            <small className="text-sm text-gray-500">{podcast.artistName}</small>
                            <Badge variant="outline">{podcast.primaryGenreName}</Badge>
                        <Badge variant={"outline"}><VideoIcon/> {podcast.trackCount} حلقة</Badge>

                        </div>
                        <div className="flex gap-4 mt-4">
                            <Button>
                                <Play className="w-4 h-4"/>
                                شاهد آخر حلقة
                            </Button>
                            <Button variant="outline">
                                <Heart className="w-4 h-4"/>
                                إضافة للمفضلة
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}