import { useState, useEffect } from 'react'
import Header from './components/Header'
import MenuForm from './components/MenuForm'
import ResultPanel from './components/ResultPanel'
import Footer from './components/Footer'

function App() {
  const [menuData, setMenuData] = useState(null)
  const [formData, setFormData] = useState({
    restaurantType: '',
    popularDishes: '',
    priceRange: ''
  })

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedMenuData = localStorage.getItem('menumorph_menuData')
    const savedFormData = localStorage.getItem('menumorph_formData')
    
    if (savedMenuData) {
      setMenuData(JSON.parse(savedMenuData))
    }
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData))
    }
  }, [])

  // Handle form submission
  const handleFormSubmit = (data) => {
    setFormData(data)
    // Simulate AI/ML menu optimization
    const optimizedMenu = generateOptimizedMenu(data)
    setMenuData(optimizedMenu)
    
    // Save to localStorage
    localStorage.setItem('menumorph_menuData', JSON.stringify(optimizedMenu))
    localStorage.setItem('menumorph_formData', JSON.stringify(data))
  }

  // Mock AI/ML menu optimization function
  const generateOptimizedMenu = (data) => {
    const dishes = data.popularDishes.split(',').map(d => d.trim()).filter(d => d)
    
    return {
      restaurantType: data.restaurantType,
      optimizedDishes: dishes.map((dish, index) => ({
        id: index + 1,
        name: dish,
        recommendedPrice: calculateOptimalPrice(data.priceRange),
        category: getDishCategory(dish),
        recommendation: getAIMessage(dish, data.restaurantType),
        popularityScore: Math.floor(Math.random() * 30) + 70, // 70-100
        profitMargin: (Math.random() * 20 + 15).toFixed(1) // 15-35%
      })),
      insights: [
        `${data.restaurantType} restaurants show 23% higher revenue with category grouping`,
        'Menu items priced at $' + calculateOptimalPrice(data.priceRange) + ' range show optimal conversion',
        'Adding complementary pairings can increase average order value by 18%'
      ],
      generatedAt: new Date().toLocaleString()
    }
  }

  const calculateOptimalPrice = (range) => {
    if (range === 'budget') return (Math.random() * 5 + 8).toFixed(2)
    if (range === 'mid-range') return (Math.random() * 10 + 15).toFixed(2)
    if (range === 'premium') return (Math.random() * 20 + 30).toFixed(2)
    return (Math.random() * 10 + 12).toFixed(2)
  }

  const getDishCategory = (dish) => {
    const dishLower = dish.toLowerCase()
    if (dishLower.includes('salad') || dishLower.includes('soup')) return 'Appetizers'
    if (dishLower.includes('pasta') || dishLower.includes('pizza')) return 'Mains'
    if (dishLower.includes('cake') || dishLower.includes('ice cream')) return 'Desserts'
    return 'Mains'
  }

  const getAIMessage = (dish, restaurantType) => {
    const messages = [
      `High demand item - recommend featured placement`,
      `Price optimization suggests 8-12% margin increase potential`,
      `Customer reviews indicate strong pairing opportunity`,
      `Trending item in ${restaurantType} category`,
      `Optimal for upselling - consider combo suggestions`
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <MenuForm onSubmit={handleFormSubmit} initialData={formData} />
        {menuData && <ResultPanel menuData={menuData} />}
      </main>
      <Footer />
    </div>
  )
}

export default App

