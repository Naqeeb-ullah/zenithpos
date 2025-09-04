
import React, { useContext } from 'react';
import { AppContext } from './contexts/AppContext';
import { View } from './types';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashboardView from './components/views/DashboardView';
import POSView from './components/views/POSView';
import OrdersView from './components/views/OrdersView';
import ProductsView from './components/views/ProductsView';
import SettingsView from './components/views/SettingsView';

const App: React.FC = () => {
  const { activeView } = useContext(AppContext);

  const renderView = () => {
    switch (activeView) {
      case View.DASHBOARD:
        return <DashboardView />;
      case View.POS:
        return <POSView />;
      case View.ORDERS:
        return <OrdersView />;
      case View.PRODUCTS:
        return <ProductsView />;
      case View.SETTINGS:
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-neutral-100 text-neutral-800">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 p-4 md:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
