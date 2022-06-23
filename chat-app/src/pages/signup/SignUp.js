import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './SignUp.css';

import { useSignup } from '../../hooks/hooks/useSignup';

const SignUp = () => {
    const history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailError, setThumbnailError] = useState('');
    const { signup,isPending,error } = useSignup()

    const handleFileChange = (e) => {
        let selected = e.target.files[0]
        console.log(selected)
        if(!selected) {
            setThumbnailError("Hãy chọn file để tiếp tục")
            return
        }
        if(!selected.type.includes('image')){
            setThumbnailError('Bạn hãy chọn một ảnh')
            return
        }
        if(selected.size > 500000){
            setThumbnailError('Ảnh phải nhỏ hơn 1M')
            return
        }

        setThumbnailError(null);
        setThumbnail(selected)
        console.log(thumbnail)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email,password,displayName,thumbnail)
        history.push('/')
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Đăng ký</h2>
            <label>
                <span>Email:</span>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </label>
            <label>
                <span>Mật khẩu:</span>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </label>
            <label>
                <span>Tên của bạn:</span>
                <input type='text' value={displayName} onChange={(e) => setDisplayName(e.target.value)} required/>
            </label>
            <label>
                <span>Tải ảnh lên:</span>
                <input type='file' required onChange={handleFileChange}/>
            </label>
            {thumbnailError && <div className='error'>{thumbnailError}</div>}
            {!isPending && <button className='btn'>Đăng kí</button>}
            {isPending && <button className='btn'>Đang tải</button>}
            {error && <div className='error'>{error}</div>}
        </form>
    ) 
}

export default SignUp