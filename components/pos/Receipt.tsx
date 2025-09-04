
import React from 'react';
import Modal from '../common/Modal';
import { Order } from '../../types';
import { LogoIcon } from '../icons/Icons';

interface ReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

const Receipt: React.FC<ReceiptProps> = ({ isOpen, onClose, order }) => {

    const handlePrint = () => {
        const printContent = document.getElementById('receipt-content');
        if (printContent) {
            const printable = `
                <html>
                    <head>
                        <title>Receipt</title>
                        <script src="https://cdn.tailwindcss.com"></script>
                        <style>
                            @page { size: auto; margin: 0.5cm; }
                            body { font-family: sans-serif; }
                        </style>
                    </head>
                    <body class="p-4">${printContent.innerHTML}</body>
                </html>
            `;
            const newWindow = window.open('', '_blank');
            if (newWindow) {
                newWindow.document.write(printable);
                newWindow.document.close();
                newWindow.focus();
                setTimeout(() => {
                    newWindow.print();
                    newWindow.close();
                }, 250);
            }
        }
    };
    
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order Complete" size="sm">
        <div id="receipt-content" className="text-sm text-neutral-800">
            <div className="text-center mb-6">
                <LogoIcon className="w-12 h-12 mx-auto text-primary" />
                <h2 className="text-xl font-bold mt-2">Zenith Cafe</h2>
                <p className="text-xs text-neutral-500">123 Market St, San Francisco, CA</p>
            </div>
            <div className="mb-4">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Date:</strong> {order.createdAt.toLocaleString()}</p>
            </div>
            <div className="border-t border-b border-dashed py-2 space-y-1">
                {order.items.map(item => (
                    <div key={item.id} className="flex justify-between">
                        <span>{item.quantity}x {item.name}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="py-2 space-y-1">
                <div className="flex justify-between"><span>Subtotal:</span><span>${order.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax:</span><span>${order.tax.toFixed(2)}</span></div>
                {order.discount > 0 && <div className="flex justify-between"><span>Discount:</span><span>-${order.discount.toFixed(2)}</span></div>}
                <div className="flex justify-between font-bold text-base mt-2 pt-2 border-t"><span>Total:</span><span>${order.total.toFixed(2)}</span></div>
            </div>
            <div className="text-center mt-6">
                <p className="font-semibold">Thank you for your purchase!</p>
            </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
             <button onClick={onClose} className="px-4 py-2 rounded-lg bg-neutral-200 hover:bg-neutral-300">Close</button>
             <button onClick={handlePrint} className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark">Print Receipt</button>
        </div>
    </Modal>
  );
};

export default Receipt;
