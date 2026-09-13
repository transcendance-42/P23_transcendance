import { Link } from 'react-router-dom'
import { useState } from 'react'

const SecondaryButton = ({ children, to, onClick }) => {
    const [hovered, setHovered] = useState(false)

    const className = "px-5 py-2 text-sm font-medium transition whitespace-nowrap flex items-center justify-center"
    const style = {
        backgroundColor: hovered ? 'var(--color-text-tertiary)' : 'var(--color-text-caption)',
        color: 'var(--color-text-primary)',
        borderRadius: 'var(--radius-sm)'
    }

    if (to)
        return <Link to={to} className={className} style={style}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>{children}</Link>
    return <button onClick={onClick} className={className} style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>{children}</button>
}

export default SecondaryButton