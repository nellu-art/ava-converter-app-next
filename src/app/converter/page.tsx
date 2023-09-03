import { Content } from '@/app/converter/_components/Content'

async function fetchSupportedCurrenciesList(apiKey: string) {
  const res = await fetch(
    'https://currency-converter-app-production.up.railway.app/currencies/list',
    {
      headers: {
        'x-api-key': apiKey,
      },
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch supported currencies list')
  }

  return res.json()
}

export default async function MainPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const token = searchParams.token

  if (!token || Array.isArray(token)) {
    throw new Error('Token is not provided')
  }

  const data = await fetchSupportedCurrenciesList(token)

  const supportedCurrencies =
    typeof data === 'object' && data && 'data' in data ? data.data : []

  return (
    <main className="flex h-screen flex-col items-center lg:p-24 p-4 pt-[60px] relative">
      <div className="max-w-5xl w-full h-full font-mono">
        <Content supportedCurrencies={supportedCurrencies} />
      </div>
    </main>
  )
}
