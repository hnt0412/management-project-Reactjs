import { useCollection } from './../../hooks/hooks/useCollection'

import './UsersOnline.css'
import Avatar from '../avatar/Avatar'

const UsersOnline = () => {
    const { documents,error } = useCollection('users')

    return (
        <div className='user-list'>
            <h2>Tất cả</h2>
            {error &&<div className='error'>{error}</div>}
            {documents && documents.map((user) => (
                <div className='user-list-item' key={user.id}>
                    {user.online && <span className='online-user'></span>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoURL} />
                </div>
            ))}
        </div>
            )
    }

export default UsersOnline