interface InsightCard {
  title: string
  value: string
  trend: 'up' | 'down' | 'stable'
  description: string
}

interface GoldInsightCardsProps {
  insights: InsightCard[]
  country: string
}

export function GoldInsightCards({ insights, country }: GoldInsightCardsProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return '📈'
      case 'down':
        return '📉'
      case 'stable':
        return '📊'
      default:
        return '📊'
    }
  }

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      case 'stable':
        return 'text-blue-600'
      default:
        return 'text-blue-600'
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {insights.map((insight, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{insight.title}</h3>
            <span className={`text-2xl ${getTrendColor(insight.trend)}`}>
              {getTrendIcon(insight.trend)}
            </span>
          </div>
          <div className="text-3xl font-bold mb-3 text-gray-900">
            {insight.value}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {insight.description}
          </p>
        </div>
      ))}
    </div>
  )
}
