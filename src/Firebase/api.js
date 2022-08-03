import { initializeApp } from 'firebase/app';
//import { collection, query, where, getDocs } from "firebase/firestore";
import { firebaseConfig } from './config'
import { getFirestore, collection, query, where, getDocs, Timestamp, doc, updateDoc, addDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// JqwqJNbHtfXocFRkpMfOhZBuo6T2

export const addDocument = async (theCollection, obj) => {
  return  await addDoc(collection(db, theCollection), obj);
}

export const getUserIndicators = async (userId) => {
  const data = []

  const q = query(collection(db, "userIndicators")
    , where("user", "==", userId)
    , where("deleted", "==", false)
  )

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach( doc => {    
    data.push({userIndicator:doc.id, ...doc.data()})
  })

  // console.log(data)

  return data
}

export const getActivitysOfDay = async (userId, dayStart, dayEnd) => {
 
  const dataResume = []

  const q = query(collection(db, "activity")
    , where("user", "==", userId)
    , where("date", ">=", Timestamp.fromDate(dayStart))
    , where("date", "<=", Timestamp.fromDate(dayEnd))
  )

  const querySnapshot = await getDocs(q)

  querySnapshot.forEach(doc => dataResume.push(doc.data()))

  //console.log('getActivitysOfDay ', dataResume)

  return dataResume
}

export const updateIndicator = (id) => {
  const aux = doc(db, "userIndicators", id) 
  return updateDoc(aux, {deleted:true}) 
}
