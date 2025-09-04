
import React, { useContext } from 'react';
import Modal from '../common/Modal';
import { AppContext } from '../../contexts/AppContext';
import { PaymentMethod, Order } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartDetails: {
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
  };
  onSuccess: (order: Order) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cartDetails, onSuccess }) => {
  const { completeOrder, cart } = useContext(AppContext);

  const handlePayment = (method: PaymentMethod) => {
    completeOrder(method, cartDetails);
    // In a real app, we'd get the created order back. Here we construct it for the receipt.
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: cart,
      paymentMethod: method,
      ...cartDetails,
      createdAt: new Date()
    };
    onSuccess(newOrder);
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Complete Payment">
      <div className="space-y-6">
        <div className="bg-neutral-100 p-4 rounded-lg text-center">
          <p className="text-neutral-600">Total Amount Due</p>
          <p className="text-4xl font-bold text-primary">${cartDetails.total.toFixed(2)}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Select Payment Method</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(Object.values(PaymentMethod)).map(method => (
              <button 
                key={method}
                onClick={() => handlePayment(method)}
                className="p-4 border rounded-lg text-center font-semibold hover:bg-primary hover:text-white hover:border-primary transition-colors"
              >
                {method}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
