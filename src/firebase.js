// Store Firebase config and handle initialization
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPID
}

firebase.initializeApp(config)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider()

// collection references
const itemsCollection = db.collection('items')

// export utils/refs
export { db, auth, GoogleAuthProvider, itemsCollection }
