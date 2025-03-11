
// API Client for Focus Cubes
const API_BASE_URL = '/api';

// Get auth token from localStorage
const getToken = () => localStorage.getItem('authToken');

// API request helper
async function apiRequest(endpoint, method = 'GET', data = null) {
  const headers = {
    'Content-Type': 'application/json'
  };
  
  // Add auth token if available
  const token = getToken();
  if (token) {
    headers['x-auth-token'] = token;
  }
  
  const config = {
    method,
    headers
  };
  
  if (data) {
    config.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.message || 'API request failed');
    }
    
    return responseData;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Auth methods
const auth = {
  login: async (email, password) => {
    const data = await apiRequest('/users/login', 'POST', { email, password });
    localStorage.setItem('authToken', data.token);
    return data;
  },
  
  register: async (userData) => {
    const data = await apiRequest('/users/register', 'POST', userData);
    localStorage.setItem('authToken', data.token);
    return data;
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
  },
  
  isAuthenticated: () => {
    return !!getToken();
  }
};

// Mood tracking methods
const moods = {
  getAllEntries: async () => {
    return apiRequest('/moods');
  },
  
  addEntry: async (moodData) => {
    return apiRequest('/moods', 'POST', moodData);
  }
};

// Export the API client
window.apiClient = {
  auth,
  moods
};
