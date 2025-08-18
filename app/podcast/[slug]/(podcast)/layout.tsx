export default function PodcastLayout({ children, episodes,podcast }: { children: React.ReactNode; episodes: React.ReactNode; podcast: React.ReactNode; }) {
    return (
        <div>
            {podcast}
            {episodes}
            {children}
        </div>
    )
}