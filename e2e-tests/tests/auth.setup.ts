import { test as setup } from '../test'

const authFile = 'e2e-tests/playwright/.auth/user.json'

setup('authenticate', async ({ page, user }) => {
  await page.goto('/')
  await page.getByLabel('Username').fill(user.username)
  await page.getByLabel('Password').fill(user.password)
  await page.getByRole('button', { name: 'Sign in' }).click()

  await page.context().storageState({ path: authFile })
})
