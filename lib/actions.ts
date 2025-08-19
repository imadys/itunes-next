'use server'

import { api } from './api'
import { revalidateTag } from 'next/cache'

export async function addPodcastToFavorites(slug: string) {
  try {
    await api.post(`/podcasts/${slug}/favorite`)
    
    revalidateTag(`podcast-${slug}`)
    
    return { success: true, message: 'تمت إضافة البودكاست للمفضلة بنجاح' }
  } catch (error) {
    console.error('Error adding podcast to favorites:', error)
    return { success: false, message: 'حدث خطأ أثناء إضافة البودكاست للمفضلة' }
  }
}

export async function removePodcastFromFavorites(slug: string) {
  try {
    await api.delete(`/podcasts/${slug}/favorite`)
    
    revalidateTag(`podcast-${slug}`)
    
    return { success: true, message: 'تمت إزالة البودكاست من المفضلة بنجاح' }
  } catch (error) {
    console.error('Error removing podcast from favorites:', error)
    return { success: false, message: 'حدث خطأ أثناء إزالة البودكاست من المفضلة' }
  }
} 