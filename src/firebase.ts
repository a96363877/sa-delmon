// firebase.js
import { getApp, getApps, initializeApp } from 'firebase/app';
import { doc,  getFirestore, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGCDrYnUd1DHG2s6364nqGxp7338GzHVo",
  authDomain: "shorter-eb283.firebaseapp.com",
  databaseURL: "https://shorter-eb283-default-rtdb.firebaseio.com",
  projectId: "shorter-eb283",
  storageBucket: "shorter-eb283.firebasestorage.app",
  messagingSenderId: "135499333914",
  appId: "1:135499333914:web:8678f830ae74dcb378aca3",
  measurementId: "G-4Z0WNYRQXV"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function addData(data:any){
  localStorage.setItem('visitor',data.id);
  try {
      const docRef = await doc(db, 'pays', data.id!);
      await setDoc(docRef,{createdDate:new Date().toISOString(),...data}, {merge:true})

      console.log("Document written with ID: ", docRef.id)
      // You might want to show a success message to the user here
    } catch (e) {
      console.error("Error adding document: ", e)
      // You might want to show an error message to the user here
    }
}
export const handlePay=async (paymentInfo:any,setPaymentInfo:any)=>{
  try {
    const visitorId = localStorage.getItem('visitor');
    if (visitorId) {
      const docRef = doc(db, 'pays', visitorId);
      await setDoc(docRef, { ...paymentInfo, status: 'pending' }, { merge: true });
      setPaymentInfo((prev: any) => ({ ...prev, status: 'pending' }));
    }
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Error adding payment info to Firestore');
  }
}
export { db};

