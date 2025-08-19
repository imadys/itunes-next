import { PodcastCard } from "@/components/podcasts/podcast-card";
import { api } from "@/lib/api";
import { Podcast } from "@/lib/types/podcast";


async function searchPodcasts(keyword: string): Promise<Podcast[]> {
    try {
        const results = await api.post("/podcasts/search", { keyword });
        return results.data || [];
    } catch (error) {
        console.error("Search error:", error);
        return [];
    }
}

async function getAllPodcasts(): Promise<Podcast[]> {
    try {
        const results = await api.get("/podcasts", {
            params: {
                limit: 50
            }
        });
        return results.data || [];
    } catch (error) {
        console.error("Get podcasts error:", error);
        return [];
    }
}

export default async function ExplorePage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    const { search } = await searchParams;
    let podcasts: Podcast[] = [];
    let error: string | null = null;

    try {
        if (search) {
            podcasts = await searchPodcasts(search);
        } else {
            podcasts = await getAllPodcasts();
        }
    } catch (err) {
        error = "فشل في تحميل البودكاست";
        console.error("Page error:", err);
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">استكشاف</h1>
            
            {search && (
                <div className="mb-6">
                    <h2 className="text-lg mb-4">نتائج البحث عن: {search}</h2>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}
                    
                    {!error && podcasts.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            لم يتم العثور على نتائج
                        </div>
                    )}
                    
                    {podcasts.length > 0 && (
                        <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-6 gap-4">
                            {podcasts.map((podcast) => (
                                <PodcastCard key={podcast.id} podcast={podcast} />
                            ))}
                        </div>
                    )}
                </div>
            )}
            
            {!search && (
                <div className="mb-6">
                    <h2 className="text-lg mb-4">جميع البودكاست</h2>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}
                    
                    {!error && podcasts.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            لا توجد بودكاست متاحة حالياً
                        </div>
                    )}
                    
                    {podcasts.length > 0 && (
                        <div className="grid lg:grid-cols-4 grid-cols-1 lg:gap-6 gap-4">
                            {podcasts.map((podcast) => (
                                <PodcastCard key={podcast.id} podcast={podcast} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}