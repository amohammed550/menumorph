import React from 'react'

const ResultPanel = ({ menuData }) => {
  if (!menuData) return null

  return (
    <section className="result-panel-section">
      <div className="container">
        <div className="result-header">
          <h2 className="section-title">Your Optimized Menu</h2>
          <p className="generated-time">Generated: {menuData.generatedAt}</p>
        </div>

        <div className="menu-results">
          <div className="dishes-grid">
            {menuData.optimizedDishes.map((dish) => (
              <div key={dish.id} className="dish-card">
                <div className="dish-header">
                  <span className="dish-category">{dish.category}</span>
                  <span className="popularity-score">⭐ {dish.popularityScore}%</span>
                </div>
                <h3 className="dish-name">{dish.name}</h3>
                <div className="dish-details">
                  <div className="price-info">
                    <span className="recommended-price">${dish.recommendedPrice}</span>
                    <span className="profit-margin">{dish.profitMargin}% margin</span>
                  </div>
                  <p className="ai-recommendation">{dish.recommendation}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="ai-insights">
            <h3 className="insights-title">AI-Generated Insights</h3>
            <ul className="insights-list">
              {menuData.insights.map((insight, index) => (
                <li key={index} className="insight-item">
                  <span className="insight-icon">💡</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResultPanel

