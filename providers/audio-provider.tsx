"use client";

import { Episode } from "@/lib/types/podcast";
import { createContext, useContext, useRef, useState, useEffect, ReactNode } from "react";

interface AudioState {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  error: string | null;
}

interface AudioActions {
  play: (episode: Episode) => void;
  pause: () => void;
  resume: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  togglePlay: () => void;
  stop: () => void;
}

type AudioContextType = AudioState & AudioActions;

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<AudioState>({
    currentEpisode: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleDurationChange = () => {
      setState(prev => ({ ...prev, duration: audio.duration }));
    };

    const handleLoadStart = () => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
    };

    const handleCanPlay = () => {
      setState(prev => ({ ...prev, isLoading: false }));
    };

    const handleError = () => {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: "Failed to load audio",
        isPlaying: false 
      }));
    };

    const handleEnded = () => {
      setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const play = (episode: Episode) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (state.currentEpisode?.id !== episode.id) {
      setState(prev => ({ ...prev, currentEpisode: episode, currentTime: 0 }));
      audio.src = episode.audioUrl;
      audio.load();
    }

    audio.play().then(() => {
      setState(prev => ({ ...prev, isPlaying: true, error: null }));
    }).catch(() => {
      setState(prev => ({ ...prev, error: "Failed to play audio", isPlaying: false }));
    });
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setState(prev => ({ ...prev, isPlaying: false }));
  };

  const resume = () => {
    const audio = audioRef.current;
    if (!audio || !state.currentEpisode) return;

    audio.play().then(() => {
      setState(prev => ({ ...prev, isPlaying: true, error: null }));
    }).catch(() => {
      setState(prev => ({ ...prev, error: "Failed to resume audio", isPlaying: false }));
    });
  };

  const togglePlay = () => {
    if (state.isPlaying) {
      pause();
    } else if (state.currentEpisode) {
      resume();
    }
  };

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setState(prev => ({ ...prev, currentTime: time }));
  };

  const setVolume = (volume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const clampedVolume = Math.max(0, Math.min(1, volume));
    audio.volume = clampedVolume;
    setState(prev => ({ ...prev, volume: clampedVolume }));
  };

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setState(prev => ({ 
      ...prev, 
      currentEpisode: null, 
      isPlaying: false, 
      currentTime: 0,
      error: null 
    }));
  };

  const contextValue: AudioContextType = {
    ...state,
    play,
    pause,
    resume,
    seek,
    setVolume,
    togglePlay,
    stop,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      <audio ref={audioRef} preload="metadata" />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}