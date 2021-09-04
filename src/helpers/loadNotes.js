import { getDocs, collection, orderBy, query } from "firebase/firestore"
import { db } from "../components/firebase/firebase-config"

export const loadNotes = async(uid) =>{
    const refDoc = collection(db, `/${uid}/journal/notes`);
    const q = query(refDoc, orderBy('date', 'desc'))
    const docsSnap = await getDocs(q);
    const notes =[];

    docsSnap.forEach(snapChild =>{
        notes.push({
            id: snapChild.id,
            ...snapChild.data()
        })
    });
    return notes
}