import defaultAvatar from '../../assets/pdpDefault.png'
import { useRef } from 'react'

const Avatar = ({ url, size = 'md', onUpload }) => {
    const sizesPx = { sm: 32, md: 40, lg: 128 }
    const fileInputRef = useRef(null)

    const handleChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        e.target.value = ''
        onUpload?.(file)
    }

    return (
        <div className={`rounded-full overflow-hidden ${onUpload ? 'cursor-pointer hover:opacity-80 transition' : ''}`}
           style={{ width: sizesPx[size], height: sizesPx[size] }}
    onClick={() => onUpload && fileInputRef.current?.click()} >
            <img src= {url || defaultAvatar} alt="avatar" className="w-full h-full object-cover" />
            {onUpload && <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />}
        </div>
    )
}

export default Avatar