import { Link } from 'react-router-dom'
import { useState } from 'react'

const SecondaryButton = ({ children, to, onClick, disabled = false }) => {
    const [hovered, setHovered] = useState(false)

    const className = "min-w-[80px] px-5 py-2 text-sm font-medium transition whitespace-nowrap flex items-center justify-center"
    const style = {
        backgroundColor: (!disabled && hovered) ? 'var(--color-text-tertiary)' : 'var(--color-text-caption)',
        color: 'var(--color-text-primary)',
        borderRadius: 'var(--radius-sm)',
        opacity: disabled ? 0.3 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
    }

    if (to && !disabled)
        return <Link to={to} className={className} style={style}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>{children}</Link>
    return <button onClick={!disabled ? onClick : undefined} className={className} style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>{children}</button>
}

export default SecondaryButton