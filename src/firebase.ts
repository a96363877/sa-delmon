// firebase.js
import { getApp, getApps, initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getDatabase} from 'firebase/database';

const firebaseConfig = {
  
  apiKey: "AIzaSyDqUCm3TP3YQ5stW9mWLACTiW6WowQMrfE",
  authDomain: "swed-8d73b.firebaseapp.com",
  projectId: "swed-8d73b",
  storageBucket: "swed-8d73b.firebasestorage.app",
  messagingSenderId: "685168570681",
  appId: "1:685168570681:web:b2f367991b4f57c4ec38e8",
  measurementId: "G-RW2J2Z9PXD"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);

export async function addData(data: any) {
  localStorage.setItem('visitor', data.id);
  try {
    const docRef = await doc(db, 'pays', data.id!);
    await setDoc(docRef, data,     { merge: true });

    console.log('Document written with ID: ', docRef.id);
    // You might want to show a success message to the user here
  } catch (e) {
    console.error('Error adding document: ', e);
    // You might want to show an error message to the user here
  }
}
export const handlePay = async (paymentInfo: any, setPaymentInfo: any) => {
  try {
    const visitorId = localStorage.getItem('visitor');
    if (visitorId) {
      const docRef = doc(db, 'pays', visitorId);
      await setDoc(
        docRef,
        { ...paymentInfo, status: 'pending' },
        { merge: true }
      );
      setPaymentInfo((prev: any) => ({ ...prev, status: 'pending' }));
    }
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Error adding payment info to Firestore');
  }
};
export { db, database};
