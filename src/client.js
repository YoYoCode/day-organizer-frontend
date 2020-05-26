// Hard-coded, replace with your public key
const publicVapidKey =
  'BGO4zJnXGHGmiFLr01qVjE7B7Z6asmeuInstPJbwCBJCTw90WJiVuFeVBAORwmvSxiVbTHFAKCDwtSicedcmuQ8';

const {Dunzo} = require('./services/api.js');
export function register(user) {
  if ('serviceWorker' in navigator) {
    console.log('Registering service worker');

    run().catch((error) => console.error(error));
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  async function run() {
    console.log('Registering service worker');

    Notification.requestPermission(async (status) => {
      console.log('Notification permission status:', status);
      if (status === 'granted') {
        const registration = await navigator.serviceWorker.register(
          'worker.js',
          {
            scope: '/',
          }
        );

        console.log('Registered service worker');

        // await registration.
        await navigator.serviceWorker.ready;

        console.log('Registering push');

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });

        console.log('Registered push');

        console.log('Sending push');

        await Dunzo.notificationSubscriber({subscription, user});

        console.log('Sent push');
      }
    });
  }
}
