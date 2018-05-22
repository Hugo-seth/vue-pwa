/* eslint-disable no-console */

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        // Registration was successful
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope
        )
      })
      .catch(err => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err)
      })
  }
}
