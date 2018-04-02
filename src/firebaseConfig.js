import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyC7yNidOnAQns5-yqDyzsrdl6KIWPuLRg4",
  authDomain: "dailybreadio-7c3a1.firebaseapp.com",
  databaseURL: "https://dailybreadio-7c3a1.firebaseio.com",
  projectId: "dailybreadio-7c3a1",
  storageBucket: "dailybreadio-7c3a1.appspot.com",
  messagingSenderId: "988161405132"
}

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.database()

export const dbBillsRef = db.ref('bills')
export const dbExpensesRef = db.ref('expenses')