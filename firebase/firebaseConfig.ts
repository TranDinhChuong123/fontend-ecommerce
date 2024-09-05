// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCizW89xEXDS9QKGHMHCuiIHFhrkip8LcE",
    authDomain: "verify-otp-c5a0d.firebaseapp.com",
    projectId: "verify-otp-c5a0d",
    storageBucket: "verify-otp-c5a0d.appspot.com",
    messagingSenderId: "397754310072",
    appId: "1:397754310072:web:2050436ba573a46444834d",
    measurementId: "G-0Z6KRRWLV3"
};
// const firebaseConfig = {
//     apiKey: "AIzaSyBXau-o7NAh4Hn0L6vSjsN3hH8udMdELVU",
//     authDomain: "verify-otp-41c2b.firebaseapp.com",
//     projectId: "verify-otp-41c2b",
//     storageBucket: "verify-otp-41c2b.appspot.com",
//     messagingSenderId: "780803348333",
//     appId: "1:780803348333:web:fe7d52a99a3dd8e7c26c64",
//     measurementId: "G-F9JS6DXF8F"
// };

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth };