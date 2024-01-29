import { expect, test } from '@playwright/test'

test('Check health Endpoint', async ({ page }) => {
  await page.goto('http://localhost:3000/health')

  const response = await page.evaluate(async () => {
    const apiUrl = 'http://localhost:3000/health'
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const apiResponse = await fetch(apiUrl, fetchOptions)
    return apiResponse.json()
  })

  expect(response).toMatchObject({ healthy: true })
})
