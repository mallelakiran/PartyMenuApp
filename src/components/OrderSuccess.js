import React, { useEffect } from 'react';

function OrderSuccess({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="order-success-overlay">
      <div className="order-success-container">
        <div className="checkmark-animation">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark-check" fill="none" d="m14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h2 className="success-title">Order Placed Successfully!</h2>
        <p className="success-message">Thank you for your order. Your party menu is being prepared.</p>
        <div className="success-timer">
          <div className="timer-bar"></div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
