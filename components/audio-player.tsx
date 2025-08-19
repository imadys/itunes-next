"use client";

import { useAudio } from "@/providers/audio-provider";
import { Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import FavoriteEpisodeButton from "./podcasts/favorite-episode-button";

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00";
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export default function AudioPlayer() {
  const { 
    currentEpisode, 
    isPlaying, 
    currentTime, 
    duration, 
    volume, 
    isLoading,
    error,
    togglePlay, 
    seek, 
    setVolume,
    stop 
  } = useAudio();

  const [isDragging, setIsDragging] = useState(false);
  const [tempTime, setTempTime] = useState(0);

  const progressPercentage = duration > 0 ? ((isDragging ? tempTime : currentTime) / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = (rect.right - e.clientX) / rect.width; // Adjusted for RTL
    const newTime = percentage * duration;
    seek(newTime);
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = (rect.right - e.clientX) / rect.width; // Adjusted for RTL
    const newTime = percentage * duration;
    setTempTime(newTime);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const progressBar = document.getElementById('progress-bar');
      if (!progressBar) return;
      
      const rect = progressBar.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (rect.right - e.clientX) / rect.width)); // Adjusted for RTL
      const newTime = percentage * duration;
      setTempTime(newTime);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      seek(tempTime);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, duration, tempTime, seek]);

  if (!currentEpisode) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <FavoriteEpisodeButton podcastSlug={currentEpisode.podcast.id.toString()} slug={currentEpisode.id.toString()} isFavorite={currentEpisode.isFavorite} />
            <Image 
              src={currentEpisode.image ?? currentEpisode.podcast.artworkUrl600} 
              alt={currentEpisode.title}
              className="w-12 h-12 rounded-lg object-cover"
              width={48}
              height={48}
            />
            <div className="min-w-0">
              <p className="font-medium truncate text-sm text-right">{currentEpisode.title}</p>
              <p className="text-xs text-gray-500 truncate text-right">{currentEpisode?.podcast?.collectionName}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="flex items-center gap-4">
              <Button
                variant="default"
                size="sm"
                onClick={togglePlay}
                disabled={isLoading}
                className="h-10 w-10 rounded-full bg-black text-white"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2 w-full max-w-md">
              <span className="text-xs text-gray-500 min-w-[35px]">
                {formatTime(duration)}
              </span>
              <div 
                id="progress-bar"
                className="flex-1 h-2 bg-gray-200 rounded-full cursor-pointer relative"
                onClick={handleProgressClick}
                onMouseDown={handleProgressMouseDown}
              >
                <div 
                  className="h-full bg-black rounded-full transition-all duration-150"
                  style={{ width: `${progressPercentage}%`, marginLeft: 'auto', marginRight: 0 }}
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                  style={{ right: `calc(${progressPercentage}% - 6px)` }}
                />
              </div>
              <span className="text-xs text-gray-500 min-w-[35px]">
                {formatTime(isDragging ? tempTime : currentTime)}
              </span>
            </div>
          </div>

                    {/* Volume */}
          <div className="flex items-center gap-2 min-w-[200px]">
            <Slider
              value={[volume * 100]}
              onValueChange={(values) => setVolume(values[0] / 100)}
              max={100}
              step={1}
              className="flex-1"
              dir="rtl"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setVolume(volume > 0 ? 0 : 1)}
              className="h-8 w-8"
            >
              {volume === 0 ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Exit Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={stop}
            className="h-8 w-8 text-gray-500 hover:text-gray-700"
            title="إغلاق المشغل"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {error && (
          <div className="text-red-500 text-xs mt-2 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}