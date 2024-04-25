import { Page } from '@playwright/test'

export const signIn = async (page: Page, user: { username: string; password: string }) => {
  await page.goto('/')
  await page.getByLabel('Username').fill(user.username)
  await page.getByLabel('Password').fill(user.password)
  await page.getByRole('button', { name: 'Sign in' }).click()
}
