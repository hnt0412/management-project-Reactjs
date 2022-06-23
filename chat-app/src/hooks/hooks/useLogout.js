import { useEffect, useState } from 'react'
import { auth,projectFirestore } from './../../firebase/config';
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch,user } = useAuthContext()
  
  const logout = async () => {
    setError(null)
    setIsPending(true)

    //cập nhật trạng thái người dùng
    
    if(user === null) {
      setIsPending(false)
      return;
    }
    const { uid } = user
    await projectFirestore.collection('users').doc(uid).update({ online: false })

    try {
      // sign the user out
      await auth.signOut()
      
      // dispatch logout action
      dispatch({ type: 'LOGOUT' })

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
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}