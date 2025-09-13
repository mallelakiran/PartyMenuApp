import React from "react";

function DishCard({ dish, onAddDish, onRemoveDish, isSelected, onViewIngredients }) {
  return (
    <div className="dish-card">
      <div className="dish-image-container">
        <img src={dish.image} alt={dish.name} className="dish-image" />
        <div className={`dish-type-indicator ${dish.type.toLowerCase()}`}>
          {dish.type === 'VEG' ? '🟢' : '🔴'}
        </div>
      </div>
      
      <div className="dish-content">
        <h3 className="dish-name">{dish.name}</h3>
        <p className="dish-description">{dish.description}</p>
        <div className="dish-price">₹{dish.price}</div>
        
        <div className="ingredients-section">
          <h4 className="ingredients-title">Ingredients:</h4>
          <div className="ingredients-list-card">
            {dish.ingredients.map((ingredient, index) => (
              <span key={index} className="ingredient-tag">
                {ingredient.name} ({ingredient.quantity})
              </span>
            ))}
          </div>
        </div>
        
        <div className="dish-actions">
          <button
            className={`add-remove-btn ${isSelected ? 'remove' : 'add'}`}
            onClick={() => isSelected ? onRemoveDish(dish.id) : onAddDish(dish.id)}
          >
            {isSelected ? 'Remove' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DishCard;
