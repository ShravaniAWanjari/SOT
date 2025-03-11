const apiConfig = {
    baseUrl: 'https://sot-info-backend.onrender.com',
    
    getUrl(endpoint) {
      const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      return `${this.baseUrl}${path}`;
    }
  };
  
  export default apiConfig;