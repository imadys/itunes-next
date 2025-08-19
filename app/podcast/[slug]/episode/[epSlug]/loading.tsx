import { Loader2 } from "lucide-react";

export default function PodcastPageLoading() {
    return (
        <div className="absolute top-0 left-0 w-full bg-white z-10 h-screen flex justify-center items-center">
            <Loader2 className="w-20 h-20 animate-spin" />
        </div>
    )
}