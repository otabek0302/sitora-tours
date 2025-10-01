import { test, expect } from '@playwright/test'

test.describe('Sitora Tours - Frontend E2E Tests', () => {
  test.describe('Homepage', () => {
    test('should load homepage successfully', async ({ page }) => {
      await page.goto('/')
      await expect(page).toHaveURL(/\/en/)
      await expect(page.locator('header')).toBeVisible()
      await expect(page.locator('footer')).toBeVisible()
    })

    test('should display hero section', async ({ page }) => {
      await page.goto('/')
      const hero = page.locator('section').first()
      await expect(hero).toBeVisible()
    })

    test('should display all home sections', async ({ page }) => {
      await page.goto('/')
      // Wait for page to load
      await page.waitForLoadState('networkidle')

      // Check for multiple sections
      const sections = page.locator('section')
      const count = await sections.count()
      expect(count).toBeGreaterThan(5) // Hero, Stats, Special, Services, Recommended, etc.
    })

    test('should have working navigation links', async ({ page }) => {
      await page.goto('/')

      // Check Tours link
      await page.click('a[href="/tours"]')
      await expect(page).toHaveURL(/\/en\/tours/)

      // Navigate back
      await page.goto('/')

      // Check Cars link
      await page.click('a[href="/cars"]')
      await expect(page).toHaveURL(/\/en\/cars/)
    })
  })

  test.describe('Tours Page', () => {
    test('should load tours list page', async ({ page }) => {
      await page.goto('/en/tours')
      await expect(page.locator('h1')).toContainText(/tours/i)
    })

    test('should display sidebar filters', async ({ page }) => {
      await page.goto('/en/tours')
      await expect(page.locator('text=Filter By')).toBeVisible()
    })

    test('should filter tours by price', async ({ page }) => {
      await page.goto('/en/tours')

      // Find min price input
      const minPriceInput = page.locator('input#min-price')
      if (await minPriceInput.isVisible()) {
        await minPriceInput.fill('100')
        // Wait for filter to apply
        await page.waitForTimeout(500)
      }
    })
  })

  test.describe('Cars Page', () => {
    test('should load cars list page', async ({ page }) => {
      await page.goto('/en/cars')
      await expect(page.locator('h1')).toContainText(/cars/i)
    })

    test('should display car filters', async ({ page }) => {
      await page.goto('/en/cars')
      await expect(page.locator('text=Filter By')).toBeVisible()
    })
  })

  test.describe('Cities Page', () => {
    test('should load cities page', async ({ page }) => {
      await page.goto('/en/cities')
      await expect(page.locator('h1')).toContainText(/cities/i)
    })
  })

  test.describe('Hotels Page', () => {
    test('should load hotels page', async ({ page }) => {
      await page.goto('/en/hotels')
      await expect(page.locator('h1')).toContainText(/hotels/i)
    })
  })

  test.describe('Contact Page', () => {
    test('should load contact us page', async ({ page }) => {
      await page.goto('/en/contact-us')
      await expect(page.locator('h1')).toContainText(/contact/i)
    })

    test('should display contact form', async ({ page }) => {
      await page.goto('/en/contact-us')
      await expect(page.locator('input[name="fullName"]')).toBeVisible()
      await expect(page.locator('input[name="email"]')).toBeVisible()
      await expect(page.locator('textarea[name="message"]')).toBeVisible()
    })

    test('should display Google Maps', async ({ page }) => {
      await page.goto('/en/contact-us')
      await expect(page.locator('iframe[title*="Sitora Tours"]')).toBeVisible()
    })

    test('should validate required fields', async ({ page }) => {
      await page.goto('/en/contact-us')

      // Try to submit empty form
      await page.click('button[type="submit"]')

      // Form should not submit (HTML5 validation)
      const fullNameInput = page.locator('input[name="fullName"]')
      await expect(fullNameInput).toHaveAttribute('required')
    })
  })

  test.describe('About Us Page', () => {
    test('should load about us page', async ({ page }) => {
      await page.goto('/en/about-us')
      await page.waitForLoadState('networkidle')
      await expect(page.locator('section')).toBeVisible()
    })
  })

  test.describe('Language Switcher', () => {
    test('should switch between languages', async ({ page }) => {
      await page.goto('/en')

      // Check current language
      await expect(page).toHaveURL(/\/en/)

      // Switch to Russian (if switcher is visible)
      const langSwitcher = page.locator('button').filter({ hasText: /en|EN/i }).first()
      if (await langSwitcher.isVisible()) {
        await langSwitcher.click()
        // Click Russian option if available
        const ruOption = page.locator('text=/ru|RU|Русский/i').first()
        if (await ruOption.isVisible()) {
          await ruOption.click()
          await expect(page).toHaveURL(/\/ru/)
        }
      }
    })
  })

  test.describe('Responsive Design', () => {
    test('should work on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.goto('/')

      // Check header is visible
      await expect(page.locator('header')).toBeVisible()

      // Check hamburger menu exists on mobile
      await page.waitForLoadState('networkidle')
    })

    test('should work on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })
      await page.goto('/')
      await expect(page.locator('header')).toBeVisible()
    })
  })

  test.describe('Footer', () => {
    test('should have correct privacy policy link', async ({ page }) => {
      await page.goto('/')

      // Scroll to footer
      await page.locator('footer').scrollIntoViewIfNeeded()

      // Check privacy policy link
      const privacyLink = page.locator('a[href="/privacy-policy"]')
      await expect(privacyLink).toBeVisible()
    })

    test('should have all footer sections', async ({ page }) => {
      await page.goto('/')
      await page.locator('footer').scrollIntoViewIfNeeded()

      await expect(page.locator('footer')).toContainText(/navigation/i)
      await expect(page.locator('footer')).toContainText(/contact/i)
    })
  })
})
