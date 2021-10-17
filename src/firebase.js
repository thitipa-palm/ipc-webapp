// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// //import { getDatabase } from "firebase/database";
// import { getDatabase, ref, onValue} from "firebase/database";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBprVQ8J91lqmrgArwV9yZiNcPV-Cv4EQ8",
//   authDomain: "ipcsystem.firebaseapp.com",
//   databaseURL: "https://ipcsystem-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "ipcsystem",
//   storageBucket: "ipcsystem.appspot.com",
//   messagingSenderId: "376330449856",
//   appId: "1:376330449856:web:610b8564d227edebcd4e25",
//   measurementId: "G-5ME94M7PL9"
// };

// // Initialize Firebase
// const firebase = initializeApp(firebaseConfig);
// const database = getDatabase(firebase);
// // eslint-disable-next-line
// const analytics = getAnalytics(firebase);
// console.log(firebase);
// console.log(database);


// const db = getDatabase();
// const starCountRef = ref(db);
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

// export default {firebase , database};

// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// // Follow this pattern to import other Firebase services
// // import { } from 'firebase/<service>';

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBprVQ8J91lqmrgArwV9yZiNcPV-Cv4EQ8",
//   authDomain: "ipcsystem.firebaseapp.com",
//   databaseURL: "https://ipcsystem-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "ipcsystem",
//   storageBucket: "ipcsystem.appspot.com",
//   messagingSenderId: "376330449856",
//   appId: "1:376330449856:web:610b8564d227edebcd4e25",
//   measurementId: "G-5ME94M7PL9"
// };

// import { FirebaseApp, initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyBprVQ8J91lqmrgArwV9yZiNcPV-Cv4EQ8",
//   authDomain: "ipcsystem.firebaseapp.com",
//   databaseURL: "https://ipcsystem-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "ipcsystem",
//   storageBucket: "ipcsystem.appspot.com",
//   messagingSenderId: "376330449856",
//   appId: "1:376330449856:web:610b8564d227edebcd4e25",
//   measurementId: "G-5ME94M7PL9"
// };

// // Initialize Firebase
// const app: FirebaseApp = initializeApp(firebaseConfig);

// const db = getDatabase(app);
// // eslint-disable-next-line
// const auth = getAuth(app);
// console.log(db);

// export default db;

// import firebase from 'firebase';


//   const firebaseConfig = {
//     apiKey: "AIzaSyBVQCwWncgEtYQCwEqtr55wcexAwuERAOQ",
//     authDomain: "icamb-8f692.firebaseapp.com",
//     databaseURL: "https://icamb-8f692-default-rtdb.firebaseio.com",
//     projectId: "icamb-8f692",
//     storageBucket: "icamb-8f692.appspot.com",
//     messagingSenderId: "645549606709",
//     appId: "1:645549606709:web:ebc2071688fe69f8056e7c"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

// export default firebase;


// import firebase from "firebase";
// console.log(firebase);
// firebase.initializeApp({
//   apiKey: "AIzaSyBprVQ8J91lqmrgArwV9yZiNcPV-Cv4EQ8",
//   authDomain: "ipcsystem.firebaseapp.com",
//   databaseURL: "https://ipcsystem-default-rtdb.firebaseio.com",
//   projectId: "ipcsystem",
//   storageBucket: "ipcsystem.appspot.com",
//   messagingSenderId: "376330449856",
//   appId: "1:376330449856:web:610b8564d227edebcd4e25"                     // Analytics
// });

  // const firebaseConfig = {
  //   apiKey: "AIzaSyBVQCwWncgEtYQCwEqtr55wcexAwuERAOQ",
  //   authDomain: "icamb-8f692.firebaseapp.com",
  //   databaseURL: "https://icamb-8f692-default-rtdb.firebaseio.com",
  //   projectId: "icamb-8f692",
  //   storageBucket: "icamb-8f692.appspot.com",
  //   messagingSenderId: "645549606709",
  //   appId: "1:645549606709:web:ebc2071688fe69f8056e7c"
  // };
  // // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);

// export default firebase;

// import { initializeApp } from 'firebase/app';
// //import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// import { getDatabase, ref, child, get } from "firebase/database";
// // Follow this pattern to import other Firebase services
// // import { } from 'firebase/<service>';

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBprVQ8J91lqmrgArwV9yZiNcPV-Cv4EQ8",
//   authDomain: "ipcsystem.firebaseapp.com",
//   databaseURL: "https://ipcsystem-default-rtdb.firebaseio.com",
//   projectId: "ipcsystem",
//   storageBucket: "ipcsystem.appspot.com",
//   messagingSenderId: "376330449856",
//   appId: "1:376330449856:web:610b8564d227edebcd4e25"   
// };

// const app = initializeApp(firebaseConfig);

// const database = getDatabase(app);
// console.log(database);

// const dbRef = ref(getDatabase());
// get(child(dbRef, `sensor`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });

// export default dbRef;

import firebase from 'firebase';

  const firebaseConfig = {
  apiKey: "AIzaSyBprVQ8J91lqmrgArwV9yZiNcPV-Cv4EQ8",
  authDomain: "ipcsystem.firebaseapp.com",
  databaseURL: "https://ipcsystem-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ipcsystem",
  storageBucket: "ipcsystem.appspot.com",
  messagingSenderId: "376330449856",
  appId: "1:376330449856:web:610b8564d227edebcd4e25"  

  // apiKey: "AIzaSyBVQCwWncgEtYQCwEqtr55wcexAwuERAOQ",
  //   authDomain: "icamb-8f692.firebaseapp.com",
  //   databaseURL: "https://icamb-8f692-default-rtdb.firebaseio.com",
  //   projectId: "icamb-8f692",
  //   storageBucket: "icamb-8f692.appspot.com",
  //   messagingSenderId: "645549606709",
  //   appId: "1:645549606709:web:ebc2071688fe69f8056e7c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;