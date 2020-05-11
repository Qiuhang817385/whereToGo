// 1.不能访问dom
// 2.不能访问例如locastorage之类的对象
// 可以访问self，代表sw的全局作用域对象
/* 
  3个生命周期
  install
  activate
fetch
 */
// 定义缓存名字 
const CACHE_NAME = 'CACHE-V1';
// 只一次，拉取资源
self.addEventListener('install', event => {
  ///可以生成多个缓存集合
  console.log('install', event)
  // 1.event.waitUntil();传入一个promise，promise完成之后，install才真正完成，会推迟active的执行
  // event.waitUntil(new Promise((resolve, reject) => {
  //   setTimeout(resolve, 3000);
  // }))
  // 2.self.skipWaiting()强制停止旧的serviceWorker，开新的
  // event.waitUntil(self.skipWaiting())

  event.waitUntil(caches.open(CACHE_NAME).then(cache => {
    // 应该自动写入
    cache.addAll([
      '/',
      './index.css'
    ])
  }));
})
// 清除上一个版本无用缓存
self.addEventListener('activate', event => {
  console.log('activate', event)
  // 1.event.waitUntil
  // 2.self.clients.claim()claim指的是service控制的所有页面
  // event.waitUntil(self.clients.claim())

  // 会移除旧的缓存
  // 清除缓存,灵活自定义是否需要清除的缓存
  event.waitUntil(caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(cacheName => {
      if (cacheName !== CACHE_NAME) {
        return caches.delete(cacheName);
      }
    }));
  }))

})

// 可以发生无数次
self.addEventListener('fetch', event => {
  // 会捕获外联资源的请求，比如index.html引入一个css文件
  console.log('fetch', event)
  event.respondWith(caches, open(CACHE_NAME).then(cache => {
    return cache.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request).then(response => {
        cache.put(event.request, response.clone());
        return response;
      })
    })
  }))
})
// 还有推送push和同步