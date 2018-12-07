// Register Service Worker

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js', {scope:'/'})
    .then(function(regist) {
      console.log('Service Worker registered', regist.scope);
    })
    .catch(function(err) {
      console.log('Service Worker failed: ', err);
    });
  }
