import { NavLink,Link } from 'react-router-dom';

import { useAuthContext } from '../../hooks/hooks/useAuthContext';

import DashBoardIcon from './../../assets/dashboard_icon.svg';
import addIcon from './../../assets/add_icon.svg';
import Avatar from '../avatar/Avatar';

import './Sidebar.css';

const Sidebar = () => {
    const { user } = useAuthContext()
    return (
        <div className='sidebar'>
            <div className='sidebar-content'>
                <Link to={`/profile/${user.uid}`}>
                    <div className='user'>
                        <Avatar src={user.photoURL} />
                        <p>Chào {user.displayName}</p>
                    </div>
                </Link>
                <nav className='links'>
                    <ul>
                        <li>
                            <NavLink exact to='/'>
                                <img src={DashBoardIcon} alt='icon trang chủ' />
                                <span>Trang chủ</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/create'>
                                <img src={addIcon} alt='icon thêm' />
                                <span>Tạo dự án mới</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/finished-project/${user.uid}`} >
                                <img src={addIcon} alt='icon thêm' />
                                <span>Dự án đã hoàn thành</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
