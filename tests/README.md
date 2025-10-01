# Sitora Tours - Test Suite

## Test Structure

```
tests/
├── e2e/                    # End-to-end tests (Playwright)
│   ├── frontend.e2e.spec.ts    # General frontend tests
│   ├── booking.e2e.spec.ts     # Booking modal tests
│   └── reviews.e2e.spec.ts     # Reviews & testimonials tests
├── int/                    # Integration tests (Vitest)
│   └── api.int.spec.ts         # API & Payload CMS tests
└── unit/                   # Unit tests (Vitest)
    ├── utils.unit.spec.ts      # Utility functions tests
    ├── filters.unit.spec.ts    # Filter logic tests
    └── schemas.unit.spec.ts    # Zod schema validation tests
```

## Running Tests

### All Tests
```bash
pnpm test
```

### E2E Tests Only (Playwright)
```bash
pnpm test:e2e
```

### Integration Tests Only (Vitest)
```bash
pnpm test:int
```

### Unit Tests Only (Vitest)
```bash
pnpm run vitest run tests/unit
```

### Watch Mode (Unit + Integration)
```bash
pnpm run vitest
```

### With Coverage
```bash
pnpm run vitest --coverage
```

## Test Coverage

### E2E Tests (67 tests)
- ✅ Homepage (7 tests)
- ✅ Tours Page (3 tests)
- ✅ Cars Page (2 tests)
- ✅ Cities Page (1 test)
- ✅ Hotels Page (1 test)
- ✅ Contact Page (4 tests)
- ✅ About Us Page (1 test)
- ✅ Language Switcher (1 test)
- ✅ Responsive Design (2 tests)
- ✅ Footer (2 tests)
- ✅ Booking Modals (5 tests)
- ✅ Reviews & Testimonials (3 tests)

### Integration Tests (15 tests)
- ✅ Collections (8 tests)
  - Users, Tours, Cars, Cities, Hotels, Reviews, Categories, Media
- ✅ Globals (2 tests)
  - Pages global, Hero section
- ✅ Localization (3 tests)
  - English, Russian, Uzbek
- ✅ Relationships (3 tests)
  - Tour→Category, Tour→Cities, Review→Tour
- ✅ Filtering & Sorting (3 tests)
  - Price filters, Rating sort, Review filters
- ✅ Media Configuration (1 test)

### Unit Tests (30+ tests)
- ✅ Utils (12 tests)
  - cn function, validateReview, cleanReview, getUniqueValues
  - formatDateRange, calculateDays
- ✅ Filters (18 tests)
  - Tour filters, Car filters, Validation
- ✅ Schemas (20+ tests)
  - Tour, Car, City, Hotel, Review schemas
  - CreateReview validation

## Features Tested

### ✅ Core Functionality
- Homepage sections rendering
- Navigation between pages
- Sidebar filters (Tours, Cars)
- Pagination
- Language switching
- Responsive layouts

### ✅ New Features (Added in Session)
- Book Now modals (Tours, Cars, Special Tour)
- Review system with auto-rating
- Testimonials with tour names
- Hero section with reviews
- Contact form with Telegram
- Google Maps integration

### ✅ Data Integrity
- All collections accessible
- Relationships populated correctly
- Localization working (3 languages)
- Filter validation
- Schema validation

## Prerequisites

### For E2E Tests
1. Start dev server: `pnpm dev`
2. Ensure database is running
3. Have test data in Payload CMS

### For Integration Tests
1. Database must be accessible
2. Payload CMS configured correctly

### For Unit Tests
No prerequisites needed

## CI/CD Integration

Tests are configured to run in CI environments with:
- Retry logic (2 retries in CI)
- Single worker in CI
- HTML reports generated
- Coverage reports

## Environment Variables

Some tests may require:
```env
DATABASE_URI=your_db_connection_string
PAYLOAD_SECRET=your_secret
NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=your_bot_token
NEXT_PUBLIC_TELEGRAM_CHAT_ID=your_chat_id
```

## Troubleshooting

### E2E Tests Failing
- Ensure dev server is running on port 3000
- Check if database has test data
- Clear browser cache: `pnpm exec playwright clean`

### Integration Tests Failing
- Verify database connection
- Check Payload configuration
- Ensure migrations are up to date

### Unit Tests Failing
- Check if utilities are properly exported
- Verify import paths
- Run `pnpm install` to ensure all deps are installed

## Writing New Tests

### E2E Test Example
```typescript
test('should do something', async ({ page }) => {
  await page.goto('/en/your-page')
  await expect(page.locator('h1')).toBeVisible()
})
```

### Unit Test Example
```typescript
it('should validate data', () => {
  const result = myFunction(input)
  expect(result).toBe(expected)
})
```

### Integration Test Example
```typescript
it('should fetch data from API', async () => {
  const data = await payload.find({
    collection: 'tours',
  })
  expect(data).toBeDefined()
})
```

## Test Reports

### E2E Report
After running `pnpm test:e2e`, open:
```
playwright-report/index.html
```

### Coverage Report
After running with `--coverage`, open:
```
coverage/index.html
```

## Notes

- E2E tests run slower (browser automation)
- Unit tests run very fast (pure JS)
- Integration tests require database connection
- All tests use TypeScript
- Tests follow AAA pattern (Arrange, Act, Assert)

