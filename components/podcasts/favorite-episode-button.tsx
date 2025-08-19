'use client'

import { Button } from "@/components/ui/button"
import { changeEpisodeFavoriteStatus } from "@/lib/actions"
import { Heart } from "lucide-react"
import { useState, useTransition } from "react"

interface FavoriteEpisodeButtonProps {
  slug: string
  isFavorite?: boolean
  className?: string
  podcastSlug: string
}

export default function FavoriteEpisodeButton({ slug, isFavorite = false, className, podcastSlug }: FavoriteEpisodeButtonProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [isPending, startTransition] = useTransition()

  const handleFavoriteToggle = () => {
    startTransition(async () => {
      try {
        if (favorite) {
          const result = await changeEpisodeFavoriteStatus(slug,podcastSlug);
          if (result.success) {
            setFavorite(false)
          }
        } else {
          const result = await changeEpisodeFavoriteStatus(slug,podcastSlug);
          if (result.success) {
            setFavorite(true)
          }
        }
      } catch (error) {
        console.error('Error toggling favorite:', error)
      }
    })
  }

  return (
    <Button
      variant="ghost"
      size={"sm"}
      onClick={handleFavoriteToggle}
      disabled={isPending}
      className={className}
    >
      <Heart className={`w-4 h-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
    </Button>
  )
} 