const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  getToken(): string | null {
    return this.token;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    console.log(`📤 API Request: ${options.method || 'GET'} ${url}`);

    const response = await fetch(url, { ...options, headers });

    console.log(`📥 API Response: ${response.status} ${response.statusText}`);

    // Handle unauthorized
    if (response.status === 401) {
      this.clearToken();
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
      throw new Error('Session expired. Please login again.');
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  // ==================== AUTH ENDPOINTS ====================

  async register(email: string, password: string, name: string, phone?: string) {
    const data = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, phone }),
    });
    this.setToken(data.accessToken);
    return data;
  }

  async login(email: string, password: string) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.accessToken);
    return data;
  }

  async logout() {
    this.clearToken();
  }

  async getProfile() {
    return this.request('/users/profile');
  }

  async updateProfile(data: { name?: string; phone?: string }) {
    return this.request('/users/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/users/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // ==================== FERRIES ENDPOINTS ====================

  async getShips() {
    return this.request('/ferries');
  }

  async getShipById(id: string) {
    return this.request(`/ferries/${id}`);
  }

  async searchShips(params: { routeFrom?: string; routeTo?: string; date?: string; type?: string }) {
    // Filter out undefined, null, and 'undefined' string values
    const filteredParams: Record<string, string> = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '' && value !== 'undefined') {
        filteredParams[key] = value;
      }
    });
    
    const query = new URLSearchParams(filteredParams).toString();
    const url = `/ferries/search${query ? `?${query}` : ''}`;
    console.log('🔍 Search URL:', `${API_BASE}${url}`);
    return this.request(url);
  }

  async getAvailableRoutes() {
    return this.request('/ferries/routes');
  }

  // ==================== BOOKINGS ENDPOINTS ====================

  async createBooking(data: any) {
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyBookings() {
    return this.request('/bookings/my');
  }

  async getBookingById(id: string) {
    return this.request(`/bookings/${id}`);
  }

  async cancelBooking(id: string) {
    return this.request(`/bookings/${id}/cancel`, { method: 'POST' });
  }

  // ==================== PAYMENTS ENDPOINTS ====================

  async getPaymentMethods() {
    return this.request('/payments/methods');
  }

  async createPaymentIntent(bookingId: string, amount: number, method: string) {
    return this.request('/payments/create-intent', {
      method: 'POST',
      body: JSON.stringify({ bookingId, amount, method }),
    });
  }

  async getPaymentStatus(bookingId: string) {
    return this.request(`/payments/status/${bookingId}`);
  }

  async capturePayment(paymentId: string) {
    return this.request('/payments/capture', {
      method: 'POST',
      body: JSON.stringify({ paymentId }),
    });
  }
}

export const api = new ApiClient();