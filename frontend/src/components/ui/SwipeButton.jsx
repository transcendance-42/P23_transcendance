const SwipeButton = ({ direction, onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled}
        className="w-14 h-14 rounded-full bg-white shadow-md text-2xl hover:scale-110 transition-transform disabled:opacity-50 disabled:hover:scale-100"
        style={{ color: direction === 'left' ? 'var(--color-action-pass)' : 'var(--color-action-match)' }}>
        {direction === 'left' ? '✕' : '♥'}
    </button>
)
export default SwipeButton