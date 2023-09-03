import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const currencies = searchParams.get('currencies')
  const res = await fetch(
    `https://currency-converter-app-production.up.railway.app/currencies/rates?currencies=${currencies}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': token || '',
      },
    }
  )
  const data = await res.json()

  return NextResponse.json({ data })
}
