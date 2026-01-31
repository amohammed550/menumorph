import { useState, useEffect } from 'react'

const MenuForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    restaurantType: initialData?.restaurantType || '',
    popularDishes: initialData?.popularDishes || '',
    priceRange: initialData?.priceRange || ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.restaurantType && formData.popularDishes && formData.priceRange) {
      onSubmit(formData)
    } else {
      alert('Please fill in all fields')
    }
  }

  return (
    <section className="menu-form-section">
      <div className="container">
        <h2 className="section-title">Optimize Your Menu with AI</h2>
        <p className="section-subtitle">
          Tell us about your restaurant and let AI analyze the best menu strategy for maximum revenue
        </p>
        
        <form className="menu-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="restaurantType">Restaurant Type</label>
            <input
              type="text"
              id="restaurantType"
              name="restaurantType"
              value={formData.restaurantType}
              onChange={handleChange}
              placeholder="e.g., Italian, Mexican, Asian Fusion, Casual Dining"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="popularDishes">Popular Dishes (comma-separated)</label>
            <textarea
              id="popularDishes"
              name="popularDishes"
              value={formData.popularDishes}
              onChange={handleChange}
              placeholder="e.g., Margherita Pizza, Caesar Salad, Tiramisu, Pasta Carbonara"
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="priceRange">Average Price Range</label>
            <select
              id="priceRange"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              required
            >
              <option value="">Select price range</option>
              <option value="budget">Budget ($8-$15)</option>
              <option value="mid-range">Mid-Range ($15-$25)</option>
              <option value="premium">Premium ($25+)</option>
            </select>
          </div>

          <button type="submit" className="generate-btn">
            <span>Generate Optimized Menu</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </section>
  )
}

export default MenuForm

