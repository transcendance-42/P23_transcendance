import { Link } from 'react-router-dom'
import { useState } from 'react'

const PrimaryButton = ({ children, disabled, onClick, type = 'button', to, fullWidth = true }) => {
    const [hovered, setHovered] = useState(false)

    const style = {
        backgroundColor: disabled ? '#3a3a3a' : hovered ? '#C25A3D' : '#D96C4D',
        color: disabled ? '#888' : 'white',
        cursor: disabled ? 'not-allowed' : 'pointer'
    }

    const className = `${fullWidth ? 'w-full' : 'px-6'} flex items-center justify-center rounded-full py-2 font-semibold transition`
    if (to)
        return (
            <Link to={to} className={className} style={style}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                {children}
            </Link>
        )

    return (
        <button type={type} onClick={onClick} disabled={disabled}
            className={className} style={style}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            {children}
        </button>
    )
}

export default PrimaryButton