import { api } from "@/lib/api";
import { Podcast } from "@/lib/types/podcast";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const podcast = await api.get(`/podcasts/${slug}`) as Podcast;
    return {
        title: `${podcast.trackName}`,
        description: podcast.collectionName,
        openGraph: {
            title: `${podcast.trackName}`,
            description: podcast.collectionName,
            images: [podcast.artworkUrl600],
        },
    }
}

export default async function ({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const podcast = await api.get(`/podcasts/${slug}` , {
        next: {
            tags: [`podcasts-${slug}`],
        }
    }) as Podcast;

    if(!podcast) {
        return notFound();
    }


    return (
        <div />
    )
}