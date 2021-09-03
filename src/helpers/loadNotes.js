import { getDocs, collection } from "firebase/firestore"
import { db } from "../components/firebase/firebase-config"

export const loadNotes = async(uid) =>{
    const refDoc = collection(db, `/${uid}/journal/notes`);
    const docsSnap = await getDocs(refDoc);
    const notes =[];

    docsSnap.forEach(snapChild =>{
        notes.push({
            id: snapChild.id,
            ...snapChild.data()
        })
    });
    return notes
}