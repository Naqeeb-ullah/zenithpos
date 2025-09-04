
import { GoogleGenAI } from "@google/genai";
import { Order } from '../types';

export const generateSalesSummary = async (orders: Order[]): Promise<string> => {
  // Guard against API key not being set.
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return "API key not configured. Please set the API_KEY environment variable.";
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const simplifiedOrders = orders.map(order => ({
    total: order.total.toFixed(2),
    itemCount: order.items.reduce((acc, item) => acc + item.quantity, 0),
    items: order.items.map(item => `${item.quantity}x ${item.name}`).join(', '),
    paymentMethod: order.paymentMethod,
    time: order.createdAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }));

  if (simplifiedOrders.length === 0) {
    return "No sales data available for today to generate a summary.";
  }

  const prompt = `
    As an expert business analyst for a coffee shop, analyze the following sales data for today and provide a concise summary with actionable insights.

    Data:
    ${JSON.stringify(simplifiedOrders, null, 2)}

    Please structure your response in markdown format with the following sections:
    - **Sales Overview**: A brief summary of total revenue and number of orders.
    - **Top Performers**: Identify the most frequently sold items.
    - **Peak Hours**: Based on order times, suggest the busiest periods.
    - **Actionable Insights**: Provide one or two simple recommendations (e.g., promote a slow-moving item, suggest a combo deal based on popular pairings).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "An error occurred while generating the sales summary. Please check the console for details.";
  }
};
