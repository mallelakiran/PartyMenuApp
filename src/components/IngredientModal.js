import React from "react";

function IngredientModal({ dish, onClose }) {
  if (!dish) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{dish.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="dish-image-modal">
            <img src={dish.image} alt={dish.name} />
          </div>
          
          <p className="dish-description-modal">{dish.description}</p>
          
          <div className="ingredients-section">
            <h3>Ingredients:</h3>
            <ul className="ingredients-list">
              {dish.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  <span className="ingredient-name">{ingredient.name}</span>
                  <span className="ingredient-quantity">{ingredient.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IngredientModal;
