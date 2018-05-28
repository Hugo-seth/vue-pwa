const workboxConfig = {
  importWorkboxFrom: 'local',
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      // To match cross-origin requests, use a RegExp that matches
      // the start of the origin:
      urlPattern: new RegExp('^https://api'),
      handler: 'staleWhileRevalidate',
      options: {
        // Configure which responses are considered cacheable.
        cacheableResponse: {
          statuses: [200]
        }
      }
    },
    {
      urlPattern: new RegExp('^https://cdn'),
      // Apply a network-first strategy.
      handler: 'networkFirst',
      options: {
        // Fall back to the cache after 2 seconds.
        networkTimeoutSeconds: 2,
        cacheableResponse: {
          statuses: [200]
        }
      }
    }
  ]
}

module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('workbox').tap(args => {
        Object.assign(args[0], workboxConfig)
        // console.log(args[0])
        return args
      })
    }
  }
}
