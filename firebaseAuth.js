import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAqn03djbZGLAhGhBiPpPpTOUtJTcrDnfs",
  authDomain: "register-ba999.firebaseapp.com",
  projectId: "register-ba999",
  storageBucket: "register-ba999.appspot.com",
  messagingSenderId: "207342847435",
  appId: "1:207342847435:web:4b99b742f3ed5e603ba24e",
};

const app = initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", function () {
  const signup = document.getElementById("submit");

  if (signup) {
    signup.addEventListener("click", async (event) => {
      event.preventDefault();
      const email = document.getElementById("signUpEmail").value;
      const password = document.getElementById("signUpPassword").value;
      const username = document.getElementById("username").value;

      if (!email || !password || !username) {
        alert("Please fill in all fields.");
        return;
      }

      if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
      }

      if (!navigator.onLine) {
        alert(
          "No internet connection. Please check your network and try again."
        );
        return;
      }

      const auth = getAuth();
      const db = getFirestore();

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const userData = { email, username };
        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef, userData);
        setTimeout(() => {
          window.location.href = "login.html";
        }, 500);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user:", errorMessage);

        if (errorCode === "auth/email-already-in-use") {
          alert("Email address already exists");
        } else if (errorCode === "auth/invalid-email") {
          alert("Invalid email address");
        } else if (errorCode === "auth/weak-password") {
          alert("Password should be at least 6 characters");
        } else if (errorCode === "auth/network-request-failed") {
          alert("Network error. Please check your connection and try again.");
        } else {
          alert("Unable to create user: " + errorMessage);
        }
      }
    });
  }

  const signin = document.getElementById("button");

  if (signin) {
    signin.addEventListener("click", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      console.log("Signing in with:", email, password);

      if (!navigator.onLine) {
        alert(
          "No internet connection. Please check your network and try again."
        );
        return;
      }

      const auth = getAuth();

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("Signed in user:", user);
        localStorage.setItem("loggedInUserId", user.uid);
        setTimeout(() => {
          window.location.href = "home.html";
        }, 500);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);

        if (errorCode === "auth/user-not-found") {
          alert("No user corresponding to this email. Please register.");
        } else if (errorCode === "auth/wrong-password") {
          alert("Incorrect password for the provided email.");
        } else if (errorCode === "auth/network-request-failed") {
          alert("Network error. Please check your connection and try again.");
        } else {
          alert("Error signing in: " + errorMessage);
        }
      }
    });
  }
});
