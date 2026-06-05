import { expect, test } from '@playwright/test'
import { createServer, type ViteDevServer } from 'vite'

const mypageTitle = '\uB9C8\uC774\uD398\uC774\uC9C0'
const saveSettings = /\uC124\uC815 \uC800\uC7A5/
const caregiverName = '\uAE40\uBBFC\uC218'
const baseUrl = 'http://127.0.0.1:5297'

let server: ViteDevServer | undefined

test.describe.configure({ mode: 'serial' })

test.beforeAll(async () => {
  server = await createServer({
    configFile: './vite.config.ts',
    server: {
      host: '127.0.0.1',
      port: 5297,
      strictPort: true,
    },
  })

  await server.listen()
})

test.afterAll(async () => {
  await server?.close()
})

test('fits the caregiver mypage in one 1920 by 1080 desktop viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 })
  await page.goto(`${baseUrl}/caregiver/mypage`, {
    waitUntil: 'domcontentloaded',
  })

  await expect(
    page.getByRole('heading', { level: 1, name: mypageTitle }),
  ).toBeVisible()
  await expect(page.getByText(caregiverName)).toBeVisible()
  await expect(page.getByRole('button', { name: saveSettings })).toBeVisible()

  const viewportFit = await page.evaluate(() => ({
    clientHeight: document.documentElement.clientHeight,
    clientWidth: document.documentElement.clientWidth,
    scrollHeight: document.documentElement.scrollHeight,
    scrollWidth: document.documentElement.scrollWidth,
  }))

  expect(viewportFit.scrollHeight).toBeLessThanOrEqual(
    viewportFit.clientHeight + 1,
  )
  expect(viewportFit.scrollWidth).toBeLessThanOrEqual(
    viewportFit.clientWidth + 1,
  )
})

test('keeps the caregiver mypage usable on mobile without horizontal overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto(`${baseUrl}/caregiver/mypage`, {
    waitUntil: 'domcontentloaded',
  })

  await expect(
    page.getByRole('heading', { level: 1, name: mypageTitle }),
  ).toBeVisible()
  await expect(page.getByText(caregiverName)).toBeVisible()

  const saveButton = page.getByRole('button', { name: saveSettings })
  await saveButton.scrollIntoViewIfNeeded()
  await expect(saveButton).toBeVisible()

  const mobileOverflow = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }))

  expect(mobileOverflow.scrollWidth).toBeLessThanOrEqual(
    mobileOverflow.clientWidth + 1,
  )
})
