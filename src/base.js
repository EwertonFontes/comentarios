import Rebase from 're-base'
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAmOfAFGvpz8WRy26DXWuyE2xFP7zsyVWI',
  authDomain: 'reactjs-c2a65.firebaseapp.com',
  databaseURL: 'https://reactjs-c2a65.firebaseio.com',
  projectId: 'reactjs-c2a65',
  storageBucket: 'reactjs-c2a65.appspot.com',
  messagingSenderId: '1050740554935'
})
const db = firebase.database(firebaseApp)
const base = Rebase.createClass(db)

export const providers = {
  'facebook': new firebase.auth.FacebookAuthProvider()
}

export const auth = firebaseApp.auth()
export default base
