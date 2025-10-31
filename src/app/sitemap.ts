import { MetadataRoute } from 'next'
import { fetchTourBySlugServer, fetchCityBySlugServer, fetchCarBySlugServer, fetchHotelBySlugServer } from '@/lib/api/server'
import { PayloadResponse, Tour, City, Car, Hotel } from '@/lib/schemas'
import { TourSchema, CitySchema, CarSchema, HotelSchema } from '@/lib/schemas'

const baseUrl = 'https://sitoratour.com'
const locales = ['en', 'ru', 'uz']

// Fetch all tours
async function getAllTours(locale?: string): Promise<Tour[]> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/tours?limit=1000&depth=1${locale ? `&locale=${locale}` : ''}`)
    const data = (await response.json()) as PayloadResponse<Tour>
    return data.docs?.map(tour => TourSchema.parse(tour)) || []
  } catch {
    return []
  }
}

// Fetch all cities
async function getAllCities(locale?: string): Promise<City[]> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/cities?limit=1000&depth=1${locale ? `&locale=${locale}` : ''}`)
    const data = (await response.json()) as PayloadResponse<City>
    return data.docs?.map(city => CitySchema.parse(city)) || []
  } catch {
    return []
  }
}

// Fetch all cars
async function getAllCars(locale?: string): Promise<Car[]> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/cars?limit=1000&depth=1${locale ? `&locale=${locale}` : ''}`)
    const data = (await response.json()) as PayloadResponse<Car>
    return data.docs?.map(car => CarSchema.parse(car)) || []
  } catch {
    return []
  }
}

// Fetch all hotels
async function getAllHotels(locale?: string): Promise<Hotel[]> {
  try {
    const baseUrl = process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/hotels?limit=1000&depth=1${locale ? `&locale=${locale}` : ''}`)
    const data = (await response.json()) as PayloadResponse<Hotel>
    return data.docs?.map(hotel => HotelSchema.parse(hotel)) || []
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const entries: MetadataRoute.Sitemap = []

  // Static pages for all locales
  const staticPages = [
    { path: '', priority: 1.0, changefreq: 'daily' },
    { path: 'about-us', priority: 0.8, changefreq: 'weekly' },
    { path: 'tours', priority: 0.9, changefreq: 'daily' },
    { path: 'cities', priority: 0.9, changefreq: 'daily' },
    { path: 'hotels', priority: 0.8, changefreq: 'weekly' },
    { path: 'cars', priority: 0.8, changefreq: 'weekly' },
    { path: 'contact-us', priority: 0.7, changefreq: 'monthly' },
    { path: 'privacy-policy', priority: 0.3, changefreq: 'yearly' },
    { path: 'terms-conditions', priority: 0.3, changefreq: 'yearly' },
  ]

  for (const locale of locales) {
    // Add static pages
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path ? `/${page.path}` : ''}`,
        lastModified: now,
        changeFrequency: page.changefreq as 'daily' | 'weekly' | 'monthly' | 'yearly',
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(locales.map(loc => [loc, `${baseUrl}/${loc}${page.path ? `/${page.path}` : ''}`])),
        },
      })
    }

    // Add tours
    try {
      const tours = await getAllTours(locale)
      for (const tour of tours) {
        if (tour.slug) {
          entries.push({
            url: `${baseUrl}/${locale}/tours/${tour.slug}`,
            lastModified: tour.updatedAt ? new Date(tour.updatedAt) : now,
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
              languages: Object.fromEntries(locales.map(loc => [loc, `${baseUrl}/${loc}/tours/${tour.slug}`])),
            },
          })
        }
      }
    } catch (error) {
      console.error('Error fetching tours for sitemap:', error)
    }

    // Add cities
    try {
      const cities = await getAllCities(locale)
      for (const city of cities) {
        if (city.slug) {
          entries.push({
            url: `${baseUrl}/${locale}/cities/${city.slug}`,
            lastModified: city.updatedAt ? new Date(city.updatedAt) : now,
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
              languages: Object.fromEntries(locales.map(loc => [loc, `${baseUrl}/${loc}/cities/${city.slug}`])),
            },
          })
        }
      }
    } catch (error) {
      console.error('Error fetching cities for sitemap:', error)
    }

    // Add cars
    try {
      const cars = await getAllCars(locale)
      for (const car of cars) {
        if (car.slug) {
          entries.push({
            url: `${baseUrl}/${locale}/cars/${car.slug}`,
            lastModified: car.updatedAt ? new Date(car.updatedAt) : now,
            changeFrequency: 'weekly',
            priority: 0.7,
            alternates: {
              languages: Object.fromEntries(locales.map(loc => [loc, `${baseUrl}/${loc}/cars/${car.slug}`])),
            },
          })
        }
      }
    } catch (error) {
      console.error('Error fetching cars for sitemap:', error)
    }

    // Add hotels
    try {
      const hotels = await getAllHotels(locale)
      for (const hotel of hotels) {
        if (hotel.slug) {
          entries.push({
            url: `${baseUrl}/${locale}/hotels/${hotel.slug}`,
            lastModified: hotel.updatedAt ? new Date(hotel.updatedAt) : now,
            changeFrequency: 'weekly',
            priority: 0.7,
            alternates: {
              languages: Object.fromEntries(locales.map(loc => [loc, `${baseUrl}/${loc}/hotels/${hotel.slug}`])),
            },
          })
        }
      }
    } catch (error) {
      console.error('Error fetching hotels for sitemap:', error)
    }
  }

  // Remove duplicates (same URL across locales)
  const uniqueEntries = Array.from(new Map(entries.map(entry => [entry.url, entry])).values())

  return uniqueEntries
}
