import { test as setup } from '../test'

const authFile = 'e2e-tests/playwright/.auth/user.json'

setup('authenticateAsPom', async ({ page, pomUser }) => {
  await page.goto('/')
  await page.getByLabel('Username').fill(pomUser.username)
  await page.getByLabel('Password').fill(pomUser.password)
  await page.getByRole('button', { name: 'Sign in' }).click()

  await page.context().storageState({ path: authFile })
})
