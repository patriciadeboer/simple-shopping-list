import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

const App = () => {
  // HINT: each "item" in our list names a name, a boolean to tell if its been completed, and a quantity
  const [items, setItems] = useState([
    { itemName: 'Bananas', quantity: 6, isSelected: false },
    { itemName: 'Limes', quantity: 2, isSelected: true },
    { itemName: 'Ginger Beer', quantity: 1, isSelected: false },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [totalCount, setTotalCount] = useState(9);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddItem = () => {
    const newItem = { itemName: inputValue, quantity: 1, isSelected: false };
    setItems([...items, newItem]);
    setInputValue('');
  };

  const handleIncrement = (type, index) => {
    const updatedItems = [...items];
    if (type === 'decrease' && updatedItems[index].quantity > 0) {
      updatedItems[index].quantity--;
    } else if (type === 'increase') {
      updatedItems[index].quantity++;
    }
    setItems(updatedItems);
    calculateTotal();
  };

  const toggleComplete = (idx) => {
    const updatedItems = [...items];
    updatedItems[idx].isSelected = !updatedItems[idx].isSelected;
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    const newCount = items.reduce((accum, item) => {
      return (accum += item.quantity);
    }, 0);
    setTotalCount(newCount);
  };

  return (
    <div className="app-background">
      <div className="main-container">
        <div className="add-item-box">
          <input
            value={inputValue}
            className="add-item-input"
            placeholder="Add an item..."
            onChange={handleInputChange}
          />
          <FontAwesomeIcon icon={faPlus} onClick={handleAddItem} />
        </div>
        <div className="item-list">
          {items.map((item, idx) => (
            <div className="item-container">
              <div className="item-name" onClick={() => toggleComplete(idx)}>
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="completed">{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div className="quantity">
                <button>
                  <FontAwesomeIcon
                    onClick={() => handleIncrement('decrease', idx)}
                    icon={faChevronLeft}
                  />
                </button>
                <span>{item.quantity}</span>
                <button>
                  <FontAwesomeIcon
                    onClick={() => handleIncrement('increase', idx)}
                    icon={faChevronRight}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="total">Total: {totalCount}</div>
      </div>
    </div>
  );
};

export default App;
