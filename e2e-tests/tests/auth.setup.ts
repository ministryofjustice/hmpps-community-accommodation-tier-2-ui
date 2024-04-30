import { expect } from '@playwright/test'
import { test as setup } from '../test'

setup('signOut', async ({ page }) => {
  await page.goto('/sign-out')
  await expect(page.locator('h1')).toContainText('Sign in')
})
