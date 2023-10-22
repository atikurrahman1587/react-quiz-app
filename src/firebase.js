import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyChB9J68sm9GxeJxQuQX1m5nwyiwheKNns",
    authDomain: "react-quiz-dev-1a950.firebaseapp.com",
    databaseURL: "https://react-quiz-dev-1a950-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "react-quiz-dev-1a950",
    storageBucket: "react-quiz-dev-1a950.appspot.com",
    messagingSenderId: "276999324045",
    appId: "1:276999324045:web:fb2cfa8e97f8c5421f3dc4"
};

const app = initializeApp(firebaseConfig);

export default app;