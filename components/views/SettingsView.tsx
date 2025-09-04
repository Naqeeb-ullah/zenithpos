
import React from 'react';
import Card from '../common/Card';

const SettingsView: React.FC = () => {
  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <p className="text-neutral-600">
        This is where application settings, user management, and branch configurations would be managed.
        Features like loyalty programs, tax rules, and receipt customization would be available here.
      </p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg">User Roles</h3>
            <p className="text-sm text-neutral-500">Define permissions for Admin, Manager, and Cashier roles.</p>
        </div>
         <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg">Branch Management</h3>
            <p className="text-sm text-neutral-500">Add or edit store locations and manage their inventories.</p>
        </div>
         <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg">Invoice Customization</h3>
            <p className="text-sm text-neutral-500">Customize the look and feel of your printed receipts.</p>
        </div>
         <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg">API Keys</h3>
            <p className="text-sm text-neutral-500">Manage integrations with third-party services.</p>
        </div>
      </div>
    </Card>
  );
};

export default SettingsView;
