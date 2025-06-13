const firebaseConfig = {
  apiKey: "AIzaSyBqjaLgabOuFb6k8LIJXovKOZMjtxc3CjU",
  authDomain: "clinicapp-a2f2a.firebaseapp.com",
  projectId: "clinicapp-a2f2a",
  storageBucket: "clinicapp-a2f2a.appspot.com",
  messagingSenderId: "313561643437",
  appId: "1:313561643437:web:194a95f5667928cfe78924",
  measurementId: "G-YB9QF191NY"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
