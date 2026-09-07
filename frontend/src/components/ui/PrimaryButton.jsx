import { Link } from 'react-router'
import { useState } from 'react'

const PrimaryButton = ({ children, disabled, onClick, type = 'button', to }) => {
    const [hovered, setHovered] = useState(false)

    const style = {
        backgroundColor: disabled ? '#3a3a3a' : hovered ? '#C25A3D' : '#D96C4D',
        color: disabled ? '#888' : 'white',
        cursor: disabled ? 'not-allowed' : 'pointer'
    }

    if (to)
        return (
            <Link to={to}
                className="w-full flex items-center justify-center rounded-full py-3 font-semibold transition"
                style={style}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                {children}
            </Link>
        )

    return (
        <button type={type} onClick={onClick} disabled={disabled}
            className="w-full rounded-full py-3 font-semibold transition"
            style={style}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            {children}
        </button>
    )
}

export default PrimaryButton