/* eslint-disable no-restricted-globals */
console.log('Loaded service worker!');

self.addEventListener('push', (ev) => {
  const data = ev.data.json();

  self.registration.showNotification(data.title, {
    body: data.name,
    icon:
      'https://cdn2.iconfinder.com/data/icons/app-construction-bold-line/128/1-47-2-512.png',
  });
});
