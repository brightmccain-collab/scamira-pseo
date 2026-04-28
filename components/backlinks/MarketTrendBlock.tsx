interface TrendData {
  title: string
  insights: string[]
  impact: 'high' | 'medium' | 'low'
}

interface MarketTrendBlockProps {
  trends: TrendData[]
  country: string
  className?: string
}

export function MarketTrendBlock({ trends, country, className = '' }: MarketTrendBlockProps) {
  const getImpactColor = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getImpactLabel = (impact: 'high' | 'medium' | 'low') => {
    switch (impact) {
      case 'high':
        return 'High Impact'
      case 'medium':
        return 'Medium Impact'
      case 'low':
        return 'Low Impact'
      default:
        return 'Unknown Impact'
    }
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trends.map((trend, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{trend.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getImpactColor(trend.impact)}`}>
                {getImpactLabel(trend.impact)}
              </span>
            </div>
            <ul className="space-y-3">
              {trend.insights.map((insight, insightIndex) => (
                <li key={insightIndex} className="flex items-start">
                  <span className="text-blue-600 mt-1 mr-2">•</span>
                  <span className="text-gray-700 text-sm leading-relaxed">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Summary Analysis */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Market Analysis Summary for {country}</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          The {country} gold market shows distinct patterns influenced by local economic conditions, 
          currency stability, and cryptocurrency adoption rates. Key factors driving investment decisions 
          include inflation concerns, wealth preservation needs, and the growing integration of digital 
  assets with traditional precious metals markets.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {trends.filter(t => t.impact === 'high').length}
            </div>
            <div className="text-sm text-gray-600">High Impact Trends</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-2">
              {trends.filter(t => t.impact === 'medium').length}
            </div>
            <div className="text-sm text-gray-600">Medium Impact Trends</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {trends.filter(t => t.impact === 'low').length}
            </div>
            <div className="text-sm text-gray-600">Low Impact Trends</div>
          </div>
        </div>
      </div>
    </div>
  )
}
