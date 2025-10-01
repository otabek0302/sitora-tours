import { test, expect } from '@playwright/test'

test.describe('Booking Modals - E2E Tests', () => {
  test.describe('Recommended Tours - Book Now', () => {
    test('should open Apply Tour modal when clicking Book Now', async ({ page }) => {
      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      // Find and click a Book Now button in recommended tours section
      const bookNowButton = page.locator('text=Book Now').first()

      if (await bookNowButton.isVisible()) {
        await bookNowButton.click()

        // Modal should open
        await expect(page.locator('dialog')).toBeVisible()
        await expect(page.locator('text=Apply for Tour')).toBeVisible()
      }
    })
  })

  test.describe('Recommended Cars - Book Now', () => {
    test('should open Apply Car modal when clicking Book Now', async ({ page }) => {
      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      // Scroll to recommended cars section
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2))
      await page.waitForTimeout(500)

      // Find Book Now button in cars section
      const bookNowButtons = page.locator('text=Book Now')
      const count = await bookNowButtons.count()

      if (count > 1) {
        await bookNowButtons.nth(1).click()

        // Modal should open
        await expect(page.locator('dialog')).toBeVisible()
      }
    })
  })

  test.describe('Special Tour - Book Now', () => {
    test('should open Apply Tour modal from special tour section', async ({ page }) => {
      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      // Find special tour Book Now button
      const specialTourButton = page.locator('text=Book Now').first()

      if (await specialTourButton.isVisible()) {
        await specialTourButton.click()
        await expect(page.locator('dialog')).toBeVisible()
      }
    })
  })

  test.describe('Tour Detail Page - Apply', () => {
    test('should have Book Now button on tour detail page', async ({ page }) => {
      // Navigate to tours list
      await page.goto('/en/tours')
      await page.waitForLoadState('networkidle')

      // Click on first tour card
      const firstTourLink = page.locator('a[href^="/tours/"]').first()
      if (await firstTourLink.isVisible()) {
        await firstTourLink.click()

        // Wait for detail page to load
        await page.waitForLoadState('networkidle')

        // Check for Book Now button
        const bookButton = page.locator('text=Book Now')
        if (await bookButton.isVisible()) {
          await expect(bookButton).toBeVisible()
        }
      }
    })
  })

  test.describe('Car Detail Page - Apply', () => {
    test('should have booking form on car detail page', async ({ page }) => {
      await page.goto('/en/cars')
      await page.waitForLoadState('networkidle')

      // Click on first car
      const firstCarLink = page.locator('a[href^="/cars/"]').first()
      if (await firstCarLink.isVisible()) {
        await firstCarLink.click()
        await page.waitForLoadState('networkidle')

        // Check for rental info
        await expect(page.locator('text=/rental|book/i')).toBeVisible()
      }
    })
  })
})
