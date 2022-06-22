import { Link } from 'react-router-dom';

import './Navbar.css';

import Temple from './../../assets/temple.svg';
import { useLogout } from './../../hooks/hooks/useLogout'
import { useAuthContext } from '../../hooks/hooks/useAuthContext';

const Navbar = () => {
    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()
    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={Temple} alt='logo' />
                    <span>WeChat</span>
                </li>
                {!user && (
                    <>
                    <li><Link to='/login'>Đăng nhập</Link></li>
                    <li><Link to='/signup'>Đăng ký</Link></li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                        {isPending && <button className='btn'>Đang đăng xuất</button>}
                        {!isPending && <button className='btn' onClick={logout}>Đăng xuất</button>}
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}
 
export default Navbar