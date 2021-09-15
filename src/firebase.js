import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZEwiLspcLYmhLUbjuvLXLrr6sUfJc5Ts",
  authDomain: "connect-691c6.firebaseapp.com",
  projectId: "connect-691c6",
  storageBucket: "connect-691c6.appspot.com",
  messagingSenderId: "66268883415",
  appId: "1:66268883415:web:7f1ab5deb72cdfa8254392",
  measurementId: "G-D1Y9JVCGMX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider, storage };
export default db;
