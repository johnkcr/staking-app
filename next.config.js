module.exports = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  webpack5: false,
  webpack: (config) => {
  
    // Unset client-side javascript that only works server-side
    //config.resolve.fallback = { fs: false, module: false, "crypto": require.resolve("crypto-browserify") };
    // config.resolve.aliasFields = ['browser', 'browser.esm'] ;
  
    return config;
  },
};
