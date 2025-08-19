
export default function PodcastPageLoading() {
    return (
        <div className="grid lg:grid-cols-5 grid-cols-1 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="w-full h-[230px] bg-gray-200 animate-pulse rounded-lg"></div>
        ))}
      </div>
    )
}