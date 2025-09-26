import { Review } from '@/payload-types'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function validateReview(review: any) {
    if (!review.first_name?.trim() || !review.last_name?.trim() || !review.rating || !review.comment?.trim()) {
        return false
    }
    return true
}

export function cleanReview(review: any) {
    return {
        first_name: review.first_name?.trim() || '',
        last_name: review.last_name?.trim() || '',
        rating: Number(review.rating) || 0,
        comment: review.comment?.trim() || '',
    }
}
