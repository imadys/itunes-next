'use client'

import { Button } from "@/components/ui/button"
import { addPodcastToFavorites, removePodcastFromFavorites } from "@/lib/actions"
import { Heart } from "lucide-react"
import { useState, useTransition } from "react"

interface FavoriteButtonProps {
  slug: string
  isFavorite?: boolean
  className?: string
}

export default function FavoriteButton({ slug, isFavorite = false, className }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(isFavorite)
  const [isPending, startTransition] = useTransition()

  const handleFavoriteToggle = () => {
    startTransition(async () => {
      try {
        if (favorite) {
          const result = await removePodcastFromFavorites(slug)
          if (result.success) {
            setFavorite(false)
          }
        } else {
          const result = await addPodcastToFavorites(slug)
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
      variant="outline" 
      onClick={handleFavoriteToggle}
      disabled={isPending}
      className={className}
    >
      <Heart className={`w-4 h-4 ${favorite ? 'fill-red-500 text-red-500' : ''}`} />
      {favorite ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
    </Button>
  )
} 