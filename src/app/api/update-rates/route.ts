import { NextRequest, NextResponse } from 'next/server'
import { connectToDb } from '../../../../server/db/connectToDb'
import { Record } from '../../../../server/db/record.model'
import { getCurrencyRatesFromGoogle } from '../../../../server/utils/getCurrencyRatesFromGoogle'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  try {
    await connectToDb()

    await updateCurrenciesRates()

    return NextResponse.json(
      {
        data: { message: 'Currencies rates updated' },
      },
      {
        status: 200,
      }
    )
  } catch (err) {
    console.error(`Error updating currencies rates: ${err}`)
  }
}

async function updateCurrenciesRates() {
  try {
    const googleData = await getCurrencyRatesFromGoogle()
    const records = await Record.find().sort({ createdAt: -1 }).limit(1)

    const { createdAt, updatedAt } = records[0] ?? {}

    console.log(
      'updateCurrenciesRates',
      JSON.stringify({ createdAt, updatedAt }, null, 2)
    )

    await Record.findOneAndUpdate(
      {
        createdAt: createdAt || new Date(),
      },
      { currencies: googleData, updatedAt: new Date() },
      { upsert: true }
    )
  } catch (err) {
    console.error(`Error updating currencies rates: ${err}`)
  }
}
