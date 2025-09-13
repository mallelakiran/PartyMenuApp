import React from 'react';

function Cart({ cartItems, dishes, onRemoveFromCart, onClearCart, onCheckout }) {
  const getCartItemsWithDetails = () => {
    return cartItems.map(itemId => {
      const dish = dishes.find(d => d.id === itemId);
      return dish;
    }).filter(Boolean);
  };

  const cartItemsWithDetails = getCartItemsWithDetails();
  const totalAmount = cartItemsWithDetails.reduce((sum, dish) => sum + dish.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <p className="empty-cart">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Cart ({cartItems.length} items)</h2>
        <button className="clear-cart-btn" onClick={onClearCart}>
          Clear All
        </button>
      </div>
      
      <div className="cart-items">
        {cartItemsWithDetails.map(dish => (
          <div key={dish.id} className="cart-item">
            <div className="cart-item-info">
              <h4>{dish.name}</h4>
              <span className={`dish-type ${dish.type.toLowerCase()}`}>
                {dish.type === 'VEG' ? '🟢' : '🔴'} {dish.type}
              </span>
            </div>
            <div className="cart-item-price">
              <span className="price">₹{dish.price}</span>
              <button 
                className="remove-item-btn"
                onClick={() => onRemoveFromCart(dish.id)}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-total">
        <div className="total-amount">
          <strong>Total: ₹{totalAmount}</strong>
        </div>
        <button className="checkout-btn" onClick={onCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
