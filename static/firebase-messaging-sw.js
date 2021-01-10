
importScripts(
  'https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/8.0.1/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyBaglTYdI8UVzTJO_IIx5jC--FaGIAtyCE","authDomain":"az-company-ltd.firebaseapp.com","databaseURL":"https:\u002F\u002Faz-company-ltd-default-rtdb.firebaseio.com","projectId":"az-company-ltd","storageBucket":"az-company-ltd.appspot.com","messagingSenderId":"740280241247","appId":"1:740280241247:web:eb3fb9349addfbd4a69fea","measurementId":"G-W281R96YG2"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

// Setup event listeners for actions provided in the config:
self.addEventListener('notificationclick', function(e) {
  const actions = [{"action":"goToLupasGithub","url":"https:\u002F\u002Fgithub.com\u002Flupas"},{"action":"goToModuleGithub","url":"https:\u002F\u002Fgithub.com\u002Fnuxt-community\u002Ffirebase-module"}]
  const action = actions.find(x => x.action === e.action)
  const notification = e.notification

  if (!action) return

  if (action.url) {
    clients.openWindow(action.url)
    notification.close()
  }
})
