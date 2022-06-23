import { useEffect, useState, useRef } from "react"
import { projectFirestore } from "../../firebase/config"

export const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ref = projectFirestore.collection(collection)

      ref.onSnapshot(snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({...doc.data(), id: doc.id})
      });
      
      // update state
      setDocuments(results)
      setError(null)
    }, error => {
      console.log(error)
      setError('Lỗi không thể lấy dữ liệu')
    })

  }, [collection])

  return { documents, error }
}