import './Avatar.css'

const Avatar = ({src}) => {
    return (
        <div className='avatar'>
            <img src={src} alt='ảnh đại diện' />
        </div>
    )
}

export default Avatar