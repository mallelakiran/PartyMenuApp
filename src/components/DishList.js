import React from "react";
import DishCard from "./DishCard";

function DishList({ dishes, onAddDish, onRemoveDish, selectedDishes, onViewIngredients }) {
  if (dishes.length === 0) {
    return (
      <div className="no-dishes">
        <p>No dishes found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="dish-list">
      {dishes.map(dish => (
        <DishCard
          key={dish.id}
          dish={dish}
          onAddDish={onAddDish}
          onRemoveDish={onRemoveDish}
          isSelected={selectedDishes.includes(dish.id)}
          onViewIngredients={onViewIngredients}
        />
      ))}
    </div>
  );
}

export default DishList;
