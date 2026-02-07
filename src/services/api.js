import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// Mock data generators
export const generateMockMetrics = () => ({
  users: Math.floor(Math.random() * 1000) + 5000,
  revenue: Math.floor(Math.random() * 50000) + 150000,
  orders: Math.floor(Math.random() * 500) + 2000,
  conversions: (Math.random() * 5 + 15).toFixed(1),
});

export const generateChartData = (days = 7) => {
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    sales: Math.floor(Math.random() * 5000) + 10000,
    users: Math.floor(Math.random() * 1000) + 2000,
    revenue: Math.floor(Math.random() * 20000) + 30000,
  }));
};

// API calls
export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    // Return mock data if API fails
    return Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'User', 'Manager'][Math.floor(Math.random() * 3)],
      status: ['Active', 'Inactive'][Math.floor(Math.random() * 2)],
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
      joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    }));
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    return data;
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    return true;
  }
};

export default api;
