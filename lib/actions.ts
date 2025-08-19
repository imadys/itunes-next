'use server'

import { api } from './api'
import { revalidateTag } from 'next/cache'

export async function changePodCastFavoriteStatus(slug: string) {
  try {
    await api.post(`/podcasts/${slug}/favorite`)

    revalidateTag(`podcasts-${slug}`)
    revalidateTag(`podcasts-favorites`)

    return { success: true, message: 'تمت إضافة البودكاست للمفضلة بنجاح' }
  } catch (error) {
    console.error('Error adding podcast to favorites:', error)
    return { success: false, message: 'حدث خطأ أثناء إضافة البودكاست للمفضلة' }
  }
}
export async function changeEpisodeFavoriteStatus(slug: string, podcastSlug: string) {
  try {
    await api.post(`/episodes/${slug}/favorite`)

    revalidateTag(`episodes-${slug}`)
    revalidateTag(`episodes-list-${podcastSlug}`)
    revalidateTag(`episodes-favorites`)
    return { success: true, message: 'تمت إضافة الحلقة للمفضلة بنجاح' }
  } catch (error) {
    console.error('Error adding episode to favorites:', error)
    return { success: false, message: 'حدث خطأ أثناء إضافة الحلقة للمفضلة' }
  }
}