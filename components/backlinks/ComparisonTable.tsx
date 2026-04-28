interface ComparisonItem {
  metric: string
  gold: string
  crypto: string
  winner: 'gold' | 'crypto'
  explanation: string
}

interface ComparisonTableProps {
  data: ComparisonItem[]
  country: string
  className?: string
}

export function ComparisonTable({ data, country, className = '' }: ComparisonTableProps) {
  const getWinnerColor = (winner: 'gold' | 'crypto') => {
    return winner === 'gold' ? 'text-yellow-600' : 'text-blue-600'
  }

  const getWinnerBadge = (winner: 'gold' | 'crypto') => {
    return winner === 'gold' ? '🥇 Gold' : '🥈 Crypto'
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Investment Metric
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-yellow-600">
                  🥇 Gold
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-blue-600">
                  🥈 Cryptocurrency
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Preferred for {country}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {item.metric}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    {item.gold}
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700">
                    {item.crypto}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getWinnerColor(item.winner)} bg-opacity-10 ${item.winner === 'gold' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                      {getWinnerBadge(item.winner)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Explanations */}
      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-semibold mb-4">Detailed Analysis for {country} Investors</h3>
        {data.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="font-semibold">{item.metric}</h4>
              <span className={`text-sm px-2 py-1 rounded ${item.winner === 'gold' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                {getWinnerBadge(item.winner)}
              </span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {item.explanation}
            </p>
          </div>
        ))}
      </div>

      {/* Recommendation Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-3 text-blue-900">
          💡 Investment Strategy Recommendation for {country}
        </h3>
        <p className="text-blue-800 leading-relaxed">
          Based on the comparative analysis, {country} investors should consider a balanced approach: 
          allocate 60-70% to gold for stability and inflation protection, with 30-40% in 
          quality cryptocurrencies for growth potential. Our Dubai and Cairo sourcing ensures optimal 
          pricing and security for the gold portion of your portfolio.
        </p>
      </div>
    </div>
  )
}
