import { Page } from '@playwright/test'

export const signIn = async (page: Page, user: { username: string; password: string }) => {
  await page.goto('/sign-in')
  const signInUrl = new URL(page.url())
  signInUrl.pathname = signInUrl.pathname.replace(/\/sign-in$/, '/sign-in-other')
  await page.goto(signInUrl.toString())
  await page.getByLabel('Username').fill(user.username)
  await page.getByLabel('Password').fill(user.password)
  await page.getByRole('button', { name: 'Sign in' }).click()
}
