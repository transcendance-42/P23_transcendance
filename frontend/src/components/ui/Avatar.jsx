import defaultAvatar from '../../assets/pdpDefault.png'
import { useRef } from 'react'

const Avatar = ({ url, size = 'md', onUpload }) => {
    const sizesPx = { sm: 32, md: 40, lg: 128, xl: 64}
    const fileInputRef = useRef(null)
    const badgePx = sizesPx[size] / 4

    const handleChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        e.target.value = ''
        onUpload?.(file)
    }

    return (
        <div className={`relative ${onUpload ? 'cursor-pointer hover:opacity-80 transition' : ''}`}
           style={{ width: sizesPx[size], height: sizesPx[size] }}
    onClick={() => onUpload && fileInputRef.current?.click()} >
        <div className="w-full h-full rounded-full overflow-hidden">
            <img src= {url || defaultAvatar} alt="avatar" className="w-full h-full object-cover" />
        </div>
        {onUpload && (
            <span className="absolute bottom-0 right-0 rounded-full bg-primary text-surface-white font-bold flex items-center justify-center border-2 border-surface-white"
                style={{ width: badgePx, height: badgePx, fontSize: badgePx * 0.7 }}>
                +
            </span>
        )}
            {onUpload && <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />}
        </div>
    )
}

export default Avatar