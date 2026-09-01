const SwipeButton = ({ direction, onClick }) => (
    <button onClick={onClick}
        className="w-14 h-14 rounded-full bg-white shadow-md text-2xl hover:scale-110 transition-transform"
        style={{ color: direction === 'left' ? '#f87171' : '#4ade80' }}>
        {direction === 'left' ? '✕' : '♥'}
    </button>
)
export default SwipeButton