// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBmX_0IFHmalTw0BjKu2_gML8fje1gjgM",
  authDomain: "spare-parts-delivery.firebaseapp.com",
  projectId: "spare-parts-delivery",
  storageBucket: "spare-parts-delivery.appspot.com",
  messagingSenderId: "541692476776",
  appId: "1:541692476776:web:7fe4665568e8dda689aadd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage, ref, uploadBytesResumable, getDownloadURL };