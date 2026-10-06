import defaultAvatar from '../../assets/pdpDefault.png'

const Avatar = ({ url, size = 'md', onClick }) => {
    const sizes = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-32 w-32' }

    return (
        <div className={`${sizes[size]} rounded-full overflow-hidden ${onClick ? 'cursor-pointer hover:opacity-80 transition' : ''}`}
            onClick={onClick} >
            <img src= {url || defaultAvatar} alt="avatar" className="w-full h-full object-cover" />
        </div>
    )
}

export default Avatar