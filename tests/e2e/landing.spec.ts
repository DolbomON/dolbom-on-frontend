import { expect, test } from '@playwright/test'
import { createServer, type ViteDevServer } from 'vite'

let server: ViteDevServer

test.beforeAll(async () => {
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
  await server.close()
})

test('opens the landing page', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'DolbomON' })).toBeVisible()
})
