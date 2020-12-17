import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZuVPhxD5iXj6kPWqVF676H4-8qqThiIE",
  authDomain: "booking-app-409ad.firebaseapp.com",
  projectId: "booking-app-409ad",
  storageBucket: "booking-app-409ad.appspot.com",
  messagingSenderId: "497675010455",
  appId: "1:497675010455:web:0f318e7335b9a96e7b04d2",
  measurementId: "G-C3P33FFBGK",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const bookings = [];
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        bookings,
        ...additionalData,
      });
    } catch (error) {
      console.log("error", error.message);
    }
  }

  return userRef;
};

export const addBookingToUser = async (userId, bookingId) => {
  const userRef = firestore.doc(`/users/${userId}`);
  const userSnapshot = userRef.get();

  if ((await userSnapshot).exists) {
    try {
      await userRef.update({
        bookings: firebase.firestore.FieldValue.arrayUnion(bookingId),
      });
    } catch (error) {
      console.log(error);
    }
  }
};



firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const facebookProvider = new firebase.auth.FacebookAuthProvider();
facebookProvider.setCustomParameters({ display: "popup" });
export const signInWithFacebook = () => auth.signInWithPopup(facebookProvider);

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;

