import puppeteer from 'puppeteer-core'

export async function startBrowser() {
  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_TOKEN}`,
    })

    return browser
  } catch (err: any) {
    throw new Error('Could not create a browser instance => : ', err)
  }
}
