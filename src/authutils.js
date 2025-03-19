// Utility functions for authentication management
/**
 * Checks if the token has expired and performs a logout if necessary
 * @returns {boolean} true if the token is expired and user was logged out
 */
export const checkTokenExpiration = () => {
    const tokenExpiry = localStorage.getItem('token_expiry');
    
    if (tokenExpiry) {
      const expiryTime = parseInt(tokenExpiry, 10);
      const currentTime = new Date().getTime();
      
      if (currentTime > expiryTime) {
        logout();
        return true;
      }
    }
    
    return false;
  };
  
  /**
   * Clear all auth data from localStorage
   */
  export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
    localStorage.removeItem('user');
    console.log('User logged out');
  };
  
  /**
   * Store authentication tokens with 48-hour expiration
   * @param {Object} data - Authentication data received from server
   */
  export const storeAuthData = (data) => {
    const expiryTime = new Date().getTime() + (48 * 60 * 60 * 1000); // 48 hours
    
    if (data.access) {
      // JWT auth format
      localStorage.setItem('access_token', data.access);
      
      if (data.refresh) {
        localStorage.setItem('refresh_token', data.refresh);
      }
    } else if (data.token) {
      // Legacy token format
      localStorage.setItem('token', data.token);
    }
    
    // Set expiration time
    localStorage.setItem('token_expiry', expiryTime.toString());
    
    // Store user data if available
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
  };
  
  /**
   * Check if user is authenticated
   * @returns {boolean} true if user is authenticated and token is not expired
   */
  export const isAuthenticated = () => {
    // First check if token has expired
    if (checkTokenExpiration()) {
      return false;
    }
    
    // Check for authentication tokens
    return !!(localStorage.getItem('access_token') || localStorage.getItem('token'));
  };
  
  export default {
    checkTokenExpiration,
    logout,
    storeAuthData,
    isAuthenticated
  };