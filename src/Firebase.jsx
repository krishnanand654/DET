import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBL_3bTUKCePGVnc-MVov_jrdQXzGfCcpE",
  authDomain: "det-app-web.firebaseapp.com",
  projectId: "det-app-web",
  storageBucket: "det-app-web.appspot.com",
  messagingSenderId: "253867407442",
  appId: "1:253867407442:web:6cc60fd44051e0829dc78b",
  measurementId: "G-V7ZNENZF9E",
};

export const app = initializeApp(firebaseConfig);
