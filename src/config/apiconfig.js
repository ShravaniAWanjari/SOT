const apiConfig = {
    baseUrl: 'https://dev.sajayr.tech/',
    
    getUrl(endpoint) {
      const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      return `${this.baseUrl}${path}`;
    }
  };
  
  export default apiConfig;