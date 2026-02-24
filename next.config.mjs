/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      runtimeChunk: {
        name: 'runtime',
      },
      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          react: {
            name: 'react',
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    };
    return config;
  },
};

export default nextConfig;
