import 'firebase/firestore';
import 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

// console.log( process.env );

// version variable
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
  };

//version dev
// const firebaseConfigTesting = {
//     apiKey: "AIzaSyC75BWtZlXnzH0A7zVSushIKQD21gKGeFY",
//     authDomain: "react-app-curso-d4f28.firebaseapp.com",
//     projectId: "react-app-curso-d4f28",
//     storageBucket: "react-app-curso-d4f28.appspot.com",
//     messagingSenderId: "101782257619",
//     appId: "1:101782257619:web:c28386c3fb9450b39ff926",
//   };  

// version test
// const firebaseConfigTesting = {
//     apiKey: "AIzaSyAdLy3dW59SMXXJxMpIrcBn7ULL_5AVHLY",
//     authDomain: "react-pruebas-e44ba.firebaseapp.com",
//     projectId: "react-pruebas-e44ba",
//     storageBucket: "react-pruebas-e44ba.appspot.com",
//     messagingSenderId: "487681579400",
//     appId: "1:487681579400:web:ceaa31015e2ce1ef46823d",
//     measurementId: "G-EVZFTR3K48"
//   };  


      const app = initializeApp(firebaseConfig);


 
  const db = getFirestore();
   
  const googleAuthProvider = new GoogleAuthProvider();
   
  export{
      db,
      googleAuthProvider
  }
  