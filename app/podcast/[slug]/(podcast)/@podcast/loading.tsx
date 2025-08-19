
export default function PodcastPageLoading() {
    return (
        <div>
            <div className="w-full lg:h-[200px] border-b pb-4">
                <div className="flex lg:flex-row flex-col items-center gap-4">
                    <div className="w-[200px] h-[200px] bg-gray-200 animate-pulse"></div>
                    <div className="p-4 flex flex-col">
                        <div className="lg:w-[200px] w-full h-[20px] bg-gray-200 animate-pulse rounded-lg"></div>
                        <div className="flex mt-3 gap-2 items-center">
                            <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse rounded-lg"></div>
                            <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse rounded-lg"></div>
                            <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse rounded-lg"></div>
                            <div className="w-[100px] h-[20px] bg-gray-200 animate-pulse rounded-lg"></div>
                        </div>
                        <div className="flex gap-4 mt-4">
                           <div className="w-[150px] h-[40px] bg-gray-200 animate-pulse rounded-lg"></div>
                           <div className="w-[150px] h-[40px] bg-gray-200 animate-pulse rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}