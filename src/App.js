import React, { useState, useMemo } from "react";
import Filters from "./components/Filters";
import DishList from "./components/DishList";
import IngredientModal from "./components/IngredientModal";
import Cart from "./components/Cart";
import OrderSuccess from "./components/OrderSuccess";
import { dishes } from "./data/mockDishes";
import './App.css';

function App() {
  // State management
  const [selectedCategory, setSelectedCategory] = useState("STARTER");
  const [searchTerm, setSearchTerm] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [currentDish, setCurrentDish] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  // Filter dishes based on current state
  const filteredDishes = useMemo(() => {
    return dishes.filter(dish => {
      // Category filter
      if (dish.mealType !== selectedCategory) return false;
      
      // Search filter (case-insensitive)
      if (searchTerm && !dish.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Diet filter
      if (vegOnly && nonVegOnly) {
        // Both selected - show all
        return true;
      } else if (vegOnly) {
        return dish.type === "VEG";
      } else if (nonVegOnly) {
        return dish.type === "NON-VEG";
      }
      
      // No diet filter or neither selected - show all
      return true;
    });
  }, [selectedCategory, searchTerm, vegOnly, nonVegOnly]);

  // Calculate category counts for selected dishes
  const categoryCounts = useMemo(() => {
    const counts = { "STARTER": 0, "MAIN COURSE": 0, "DESSERT": 0, "SIDES": 0 };
    selectedDishes.forEach(dishId => {
      const dish = dishes.find(d => d.id === dishId);
      if (dish) {
        counts[dish.mealType]++;
      }
    });
    return counts;
  }, [selectedDishes]);

  // Event handlers
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleVegOnlyChange = (checked) => {
    setVegOnly(checked);
  };

  const handleNonVegOnlyChange = (checked) => {
    setNonVegOnly(checked);
  };

  const handleAddDish = (dishId) => {
    setSelectedDishes(prev => [...prev, dishId]);
  };

  const handleRemoveDish = (dishId) => {
    setSelectedDishes(prev => prev.filter(id => id !== dishId));
  };

  const handleViewIngredients = (dish) => {
    setCurrentDish(dish);
  };

  const handleCloseModal = () => {
    setCurrentDish(null);
  };

  const handleClearCart = () => {
    setSelectedDishes([]);
  };

  const handleToggleCart = () => {
    setShowCart(prev => !prev);
  };

  const handleCheckout = () => {
    setShowOrderSuccess(true);
  };

  const handleOrderComplete = () => {
    setShowOrderSuccess(false);
    setShowCart(false);
    setSelectedDishes([]);
  };

  const handleGoHome = () => {
    setShowCart(false);
    setShowOrderSuccess(false);
  };

  const totalSelectedCount = selectedDishes.length;
  const totalAmount = useMemo(() => {
    return selectedDishes.reduce((sum, dishId) => {
      const dish = dishes.find(d => d.id === dishId);
      return sum + (dish ? dish.price : 0);
    }, 0);
  }, [selectedDishes]);

  return (
    <div className="App">
      <div className="app-header">
        <h1 className="home-title" onClick={handleGoHome}>🏠 Party Menu Selection</h1>
        <p>Choose your favorite dishes for the perfect party menu!</p>
      </div>

      <Filters
        activeCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        vegOnly={vegOnly}
        nonVegOnly={nonVegOnly}
        onVegOnlyChange={handleVegOnlyChange}
        onNonVegOnlyChange={handleNonVegOnlyChange}
        categoryCounts={categoryCounts}
      />

      <div className="app-layout">
        <div className="main-content">
          {!showCart ? (
            <DishList
              dishes={filteredDishes}
              onAddDish={handleAddDish}
              onRemoveDish={handleRemoveDish}
              selectedDishes={selectedDishes}
              onViewIngredients={handleViewIngredients}
            />
          ) : (
            <Cart
              cartItems={selectedDishes}
              dishes={dishes}
              onRemoveFromCart={handleRemoveDish}
              onClearCart={handleClearCart}
              onCheckout={handleCheckout}
            />
          )}
        </div>
      </div>

      {totalSelectedCount > 0 && (
        <div className="cart-toggle-bar">
          <div className="cart-summary">
            <span className="cart-info">
              {totalSelectedCount} items • ₹{totalAmount}
            </span>
            <button 
              className="view-cart-btn"
              onClick={handleToggleCart}
            >
              {showCart ? 'Continue Shopping' : 'View Cart'}
            </button>
          </div>
        </div>
      )}

      <IngredientModal
        dish={currentDish}
        onClose={handleCloseModal}
      />

      {showOrderSuccess && (
        <OrderSuccess onComplete={handleOrderComplete} />
      )}
    </div>
  );
}

export default App;
