// import { useReducer, useEffect, useState } from "react"
// import { projectFirestore, timestamp } from "./../../firebase/config";
// import { useAuthContext } from './useAuthContext'

// let initialState = {
//   document: null,
//   isPending: false,
//   error: null,
//   success: null
// }

// const firestoreReducer = (state, action) => {
//   switch (action.type) {
//     case 'IS_PENDING':
//       return { isPending: true, document: null, success: false, error: null }
//     case 'ADDED_DOCUMENT':
//       return { isPending: false, document: action.payload, success: true, error: null }
//     case 'DELETED_DOCUMENT':
//       return { isPending: false, document: null, success: true, error: null }
//     case 'ERROR':
//       return { isPending: false, document: null, success: false, error: action.payload }
//     default:
//       return state
//   }
// }

// export const useFirestore = (collection) => {
//   const [response, dispatch] = useReducer(firestoreReducer, initialState)
//   const [isCancelled, setIsCancelled] = useState(false)
//   const { user } = useAuthContext()

//   // collection ref
//   const ref = projectFirestore.collection(collection)

//   // only dispatch is not cancelled
//   const dispatchIfNotCancelled = (action) => {
//     if (!isCancelled) {
//       dispatch(action)
//     }
//   }

//   // add a document
//   const addDocument = async (doc) => {
//     dispatch({ type: 'IS_PENDING' })

//     try {
//       const createdAt = timestamp.fromDate(new Date())
//       console.log(doc)
//       console.log(user.uid)
//       const addedDocument = await ref.add({ ...doc, createdAt })
//       // await projectFirestore.collection(collection).doc(user.uid).set({ ...doc, createdAt})
//       console.log(addedDocument)
      
//       console.log(addedDocument)
//       dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
//       console.log(response)
//     }
//     catch (err) {
//       dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
//     }
//   }

//   // delete a document
//   const deleteDocument = async (id) => {
//     dispatch({ type: 'IS_PENDING' })

//     try {
//       await ref.doc(id).delete()
//       dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
//     }
//     catch (err) {
//       dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
//     }
//   }

//   useEffect(() => {
//     return () => setIsCancelled(true)
//   }, [])

//   return { addDocument, deleteDocument, response }

// }

import { useReducer, useEffect, useState } from "react"
import { projectFirestore, timestamp } from "./../../firebase/config"

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
  closedProject: false
}

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: false, error: null, closedProject: false }
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null, closedProject: false }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, success: true, error: null, closedProject: false }
    case 'CLOSED_PROJECT':
    return { isPending: false, document: null, success: true, error: null, closedProject: false }
    case "UPDATED_DOCUMENT":
      return { isPending: false, document: action.payload, success: true,  error: null }
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload, closedProject: false }
    default:
      return state
  }
}

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  // collection ref
  const ref = projectFirestore.collection(collection)

  // only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }

  // add a document
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt })
      console.log(addedDocument)
      dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
    }
  }

  // delete a document
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      await ref.doc(id).delete()
      dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT' })
    }
    catch (err) {
      dispatchIfNotCancelled({ type: 'ERROR', payload: 'could not delete' })
    }
  }

  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" })

    try {
      const updatedDocument = await ref.doc(id).update(updates)
      dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDocument })
      return updatedDocument
    } 
    catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error })
      return null
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, updateDocument, deleteDocument, response }

}