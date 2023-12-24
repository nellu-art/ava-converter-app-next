import { Content } from '@/app/converter/_components/Content'
import { currenciesWithCountry } from '../../../server/constants/currencies'

export default async function MainPage() {
  const data = currenciesWithCountry

  return (
    <main className="flex h-screen flex-col items-center lg:p-24 p-4 pt-[60px] relative">
      <div className="max-w-5xl w-full h-full font-mono">
        <Content supportedCurrencies={data} />
      </div>
    </main>
  )
}
