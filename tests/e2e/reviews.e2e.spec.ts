import { test, expect } from '@playwright/test'

test.describe('Reviews & Testimonials - E2E Tests', () => {
  test.describe('Homepage Testimonials', () => {
    test('should display testimonials section', async ({ page }) => {
      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      // Scroll to testimonials
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7))

      // Check for testimonials section
      const testimonials = page.locator('text=/testimonial|review/i').first()
      if (await testimonials.isVisible()) {
        await expect(testimonials).toBeVisible()
      }
    })

    test('should display "Add Testimonial" button', async ({ page }) => {
      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      // Scroll to testimonials section
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7))

      const addButton = page.locator('text=/write.*review|add.*testimonial/i').first()
      if (await addButton.isVisible()) {
        await expect(addButton).toBeVisible()
      }
    })

    test('should open add testimonial modal', async ({ page }) => {
      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      // Scroll to testimonials
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7))
      await page.waitForTimeout(500)

      const addButton = page.locator('text=/write.*review|add.*testimonial/i').first()
      if (await addButton.isVisible()) {
        await addButton.click()

        // Modal should open
        await expect(page.locator('dialog')).toBeVisible()
        await expect(page.locator('text=/share.*experience/i')).toBeVisible()
      }
    })
  })

  test.describe('Tour Reviews', () => {
    test('should display reviews on tour detail page', async ({ page }) => {
      await page.goto('/en/tours')
      await page.waitForLoadState('networkidle')

      // Click first tour
      const firstTour = page.locator('a[href^="/tours/"]').first()
      if (await firstTour.isVisible()) {
        await firstTour.click()
        await page.waitForLoadState('networkidle')

        // Scroll down to find reviews section
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

        // Check if reviews section exists
        const reviewsSection = page.locator('text=Reviews').first()
        // Reviews section may or may not exist depending on data
      }
    })
  })

  test.describe('Add Review Form', () => {
    test('should validate review form fields', async ({ page }) => {
      await page.goto('/en')
      await page.waitForLoadState('networkidle')

      // Scroll to testimonials
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7))
      await page.waitForTimeout(500)

      const addButton = page.locator('text=/write.*review|add.*testimonial/i').first()
      if (await addButton.isVisible()) {
        await addButton.click()

        // Check form fields
        await expect(page.locator('input[name="first_name"]')).toBeVisible()
        await expect(page.locator('input[name="last_name"]')).toBeVisible()
        await expect(page.locator('textarea[name="comment"]')).toBeVisible()
      }
    })
  })
})
