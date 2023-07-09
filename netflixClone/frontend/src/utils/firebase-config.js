import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyACVDBAX2SERRMyq_7ZZrsZvv4QYsalYGE",
    authDomain: "reactnetflixclone-a7c43.firebaseapp.com",
    projectId: "reactnetflixclone-a7c43",
    storageBucket: "reactnetflixclone-a7c43.appspot.com",
    messagingSenderId: "142199946084",
    appId: "1:142199946084:web:1b84945b25b5abd50e1871",
    measurementId: "G-P7LZBWBWHW"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);