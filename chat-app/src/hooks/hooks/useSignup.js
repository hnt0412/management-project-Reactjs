import { useState, useEffect } from 'react'
import { auth,projectFirestore,storage } from './../../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await auth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Đăng kí không thành công')
      }

      //upload user image
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
      const img = await storage.ref(uploadPath).put(thumbnail)
      const imgUrl = await img.ref.getDownloadURL()

      // add display name to user
      await res.user.updateProfile({ displayName,photoURL: imgUrl })

      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true,
        displayName,
        photoURL: imgUrl
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

        setIsPending(false)
        setError(null)
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    console.log('clean func')
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}