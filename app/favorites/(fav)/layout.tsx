import { Container } from "@/components/ui/container";

export default function FavoritesLayout({ children, episodes, podcasts }: { children: React.ReactNode, episodes: React.ReactNode, podcasts: React.ReactNode }) {
    return (
        <Container>
            <div className="flex flex-col gap-4">
                {children}
                <div className="">
                    <h2 className="text-2xl font-bold mb-4">برامجي المفضلة</h2>
                    {podcasts}
                </div>
                <hr />
                <div className="">
                    <h2 className="text-2xl font-bold mb-4">حلقاتي المفضلة</h2>
                    {episodes}
                </div>
            </div>
        </Container>
    )
}