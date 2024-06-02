if (typeof globalThis.import === 'undefined') {
  globalThis.import = {};
}

globalThis.import.meta = {
  env: {
    VITE_API_TOKEN: 'mock-token'
  }
};