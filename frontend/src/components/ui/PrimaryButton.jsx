import { Link } from 'react-router-dom'
import { useState } from 'react'

const PrimaryButton = ({ children, disabled, onClick, type = 'button', to, fullWidth = true }) => {
    const [hovered, setHovered] = useState(false)

    const style = {
    backgroundColor: disabled ? 'var(--color-text-tertiary)' : hovered ? 'var(--color-primary-hover)' : 'var(--color-primary)',
    color: disabled ? 'var(--color-text-caption)' : 'var(--color-surface-white)',
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