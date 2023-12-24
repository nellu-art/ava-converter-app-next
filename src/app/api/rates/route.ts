import { NextResponse } from 'next/server'
import { Record } from '../../../../server/db/record.model'
import { getCurrencyRatesFromGoogle } from '../../../../server/utils/getCurrencyRatesFromGoogle'
import { connectToDb } from '../../../../server/db/connectToDb'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userCurrencies = searchParams.get('currencies')

  if (!userCurrencies) {
    return NextResponse.redirect(new URL('/error', request.url))
  }

  const mappedUserCurrencies = userCurrencies.length
    ? userCurrencies.split(',').map((currency) =>
        currency
          .trim()
          .toUpperCase()
          .replace(/[^A-Z]/g, '')
      )
    : undefined

  try {
    await connectToDb()

    const data = await getCurrencyRatesFromDb()

    console.log('data from db', JSON.stringify(data, null, 2))

    if (!data.updatedAt || !data.createdAt || !data.currencies.length) {
      const googleData = await getCurrencyRatesFromGoogle(mappedUserCurrencies)
      console.log('googleData', JSON.stringify(googleData, null, 2))

      data.currencies = googleData
      data.updatedAt = new Date()
      data.createdAt = data.createdAt || new Date()
    } else if (mappedUserCurrencies?.length) {
      data.currencies = data.currencies.filter(({ name }) =>
        mappedUserCurrencies.includes(name)
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.redirect(new URL('/error', request.url))
  }
}

async function getCurrencyRatesFromDb(): Promise<{
  currencies: { name: string; value: number | string }[]
  updatedAt: Date | null
  createdAt: Date | null
}> {
  try {
    const records = await Record.find().sort({ createdAt: -1 }).limit(1)
    if (!records.length) {
      return {
        currencies: [],
        updatedAt: null,
        createdAt: null,
      }
    }

    const { currencies, updatedAt, createdAt } = records[0]

    return { currencies, updatedAt, createdAt }
  } catch (err) {
    throw new Error(`Error getting currency rates from db: ${err}`)
  }
}
