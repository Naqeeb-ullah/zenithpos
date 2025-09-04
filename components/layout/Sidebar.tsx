
import React, { useContext } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { View } from '../../types';
import { DashboardIcon, POSIcon, OrdersIcon, ProductsIcon, SettingsIcon, LogoIcon } from '../icons/Icons';

const Sidebar: React.FC = () => {
  const { activeView, setActiveView } = useContext(AppContext);

  const navItems = [
    { view: View.DASHBOARD, label: 'Dashboard', icon: DashboardIcon },
    { view: View.POS, label: 'POS', icon: POSIcon },
    { view: View.ORDERS, label: 'Orders', icon: OrdersIcon },
    { view: View.PRODUCTS, label: 'Products', icon: ProductsIcon },
    { view: View.SETTINGS, label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <div className="w-20 lg:w-64 bg-neutral-900 text-white flex flex-col">
      <div className="flex items-center justify-center lg:justify-start lg:pl-6 h-20 border-b border-neutral-700">
        <LogoIcon className="w-8 h-8 text-primary" />
        <span className="hidden lg:block ml-3 text-2xl font-bold">Zenith POS</span>
      </div>
      <nav className="flex-1 px-2 lg:px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = activeView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={`flex items-center justify-center lg:justify-start p-3 rounded-lg w-full text-left transition-colors duration-200 ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="hidden lg:block ml-4 font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-neutral-700">
        <div className="flex items-center">
            <img className="h-10 w-10 rounded-full object-cover" src="https://picsum.photos/seed/user/100" alt="User" />
            <div className="hidden lg:block ml-3">
                <p className="text-sm font-semibold text-white">Jane Doe</p>
                <p className="text-xs text-neutral-400">Admin</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
