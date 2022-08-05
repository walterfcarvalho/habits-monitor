import { initializeApp } from 'firebase/app';
//import { collection, query, where, getDocs } from "firebase/firestore";
import { firebaseConfig } from './config'
import { getFirestore, collection, query, where, getDocs, Timestamp, doc, updateDoc, addDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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

  console.log('getUserIndicators', data)

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

  querySnapshot.forEach(doc => dataResume.push({id:doc.id, ...doc.data()}))

  console.log('getActivitysOfDay ', dayStart, dayEnd, dataResume)

  return dataResume
}

export const updateDocument = (collection, id, value) => {
  const aux = doc(db, collection, id) 
  return updateDoc(aux, value) 
}
