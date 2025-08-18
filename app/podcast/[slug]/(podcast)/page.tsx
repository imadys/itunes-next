import { api } from "@/lib/api";
import { Podcast } from "@/lib/types/podcast";
import { notFound } from "next/navigation";

export default async function ({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const podcast = await api.get(`/podcasts/${slug}` , {
        next: {
            tags: [`podcast-${slug}`],
        }
    }) as Podcast;

    if(!podcast) {
        return notFound();
    }


    return (
        <div />
    )
}