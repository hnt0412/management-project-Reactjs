import { useEffect, useState } from 'react';

import './Login.css';
import { useHistory } from 'react-router-dom';
import { useLogin } from '../../hooks/hooks/useLogin';
import { useAuthContext } from '../../hooks/hooks/useAuthContext';

const Login = () => {
    const { user } = useAuthContext()
    console.log(user)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()

    const { login,isPending,error } = useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email,password)
        history.push('/')
    }
    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>
            <label>
                <span>Email:</span>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </label>
            <label>
                <span>Mật khẩu:</span>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </label>
            {!isPending && <button className='btn'>Đăng nhập</button>}
            {isPending && <button className='btn'>Đang đăng nhập</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    ) 
}

export default Login