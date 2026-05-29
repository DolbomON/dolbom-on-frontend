import { expect, test } from '@playwright/test'
import { createServer, type ViteDevServer } from 'vite'

const baseUrl = 'http://127.0.0.1:5173'
const headingName =
  '\uC624\uB298\uC758 \uC548\uBD80\uB97C \uC27D\uACE0 \uC548\uC804\uD558\uAC8C \uAE30\uB85D\uD558\uC138\uC694'
const primaryCtaPattern = /\uC624\uB298 \uC0C1\uD0DC \uC785\uB825\uD558\uAE30/

let server: ViteDevServer | undefined

test.beforeAll(async () => {
  if (await isServerAvailable()) {
    return
  }

  server = await createServer({
    configFile: './vite.config.ts',
    server: {
      host: '127.0.0.1',
      port: 5173,
      strictPort: true,
    },
  })

  await server.listen()
})

test.afterAll(async () => {
  await server?.close()
})

test('opens the landing page', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: headingName })).toBeVisible()
  await expect(
    page.getByRole('link', { name: primaryCtaPattern }),
  ).toBeVisible()
})

async function isServerAvailable() {
  try {
    const response = await fetch(baseUrl)
    return response.ok
  } catch {
    return false
  }
}
