
import React, { useContext, useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AppContext } from '../../contexts/AppContext';
import { generateSalesSummary } from '../../services/geminiService';
import Card from '../common/Card';

const DashboardView: React.FC = () => {
    const { orders } = useContext(AppContext);
    const [aiSummary, setAiSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const stats = useMemo(() => {
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = orders.length;
        return { totalRevenue, totalOrders };
    }, [orders]);
    
    const chartData = useMemo(() => {
        // Simple mock data for chart
        return [
            { name: 'Mon', Sales: 4000 },
            { name: 'Tue', Sales: 3000 },
            { name: 'Wed', Sales: 2000 },
            { name: 'Thu', Sales: 2780 },
            { name: 'Fri', Sales: 1890 },
            { name: 'Sat', Sales: 2390 },
            { name: 'Sun', Sales: stats.totalRevenue > 0 ? stats.totalRevenue : 3490 },
        ];
    }, [stats.totalRevenue]);

    const handleGenerateSummary = async () => {
        setIsLoading(true);
        setAiSummary('');
        try {
            const summary = await generateSalesSummary(orders);
            setAiSummary(summary);
        } catch (error) {
            setAiSummary('Failed to generate summary.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                    <h3 className="text-neutral-500 text-sm font-medium">Total Revenue</h3>
                    <p className="text-3xl font-bold text-primary">${stats.totalRevenue.toFixed(2)}</p>
                </Card>
                <Card>
                    <h3 className="text-neutral-500 text-sm font-medium">Total Orders</h3>
                    <p className="text-3xl font-bold text-secondary">{stats.totalOrders}</p>
                </Card>
                 <Card>
                    <h3 className="text-neutral-500 text-sm font-medium">Avg. Order Value</h3>
                    <p className="text-3xl font-bold text-accent">${(stats.totalOrders > 0 ? stats.totalRevenue / stats.totalOrders : 0).toFixed(2)}</p>
                </Card>
                 <Card>
                    <h3 className="text-neutral-500 text-sm font-medium">New Customers</h3>
                    <p className="text-3xl font-bold text-red-500">{stats.totalOrders}</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Weekly Sales</h3>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Sales" fill="#4f46e5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
                <Card>
                    <h3 className="text-lg font-semibold mb-2">AI Sales Summary</h3>
                    <p className="text-sm text-neutral-500 mb-4">Get AI-powered insights on today's performance.</p>
                    <button 
                        onClick={handleGenerateSummary} 
                        disabled={isLoading}
                        className="w-full bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark disabled:bg-neutral-400 transition-colors"
                    >
                        {isLoading ? 'Generating...' : 'Generate Summary'}
                    </button>
                    {aiSummary && (
                        <div className="mt-4 p-4 bg-neutral-100 rounded-lg text-sm text-neutral-700 whitespace-pre-wrap">
                           {aiSummary.split('**').map((part, index) => 
                                index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                           )}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default DashboardView;
