import { Link } from 'react-router-dom'
import { useState } from 'react'

const SecondaryButton = ({ children, to, onClick }) => {
    const [hovered, setHovered] = useState(false)

    const className = "px-5 py-2 text-sm font-medium transition whitespace-nowrap flex items-center justify-center"
    const style = {
        backgroundColor: hovered ? '#7a6e68' : '#9d9189',
        color: '#3e2b22',
        borderRadius: '12px'
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