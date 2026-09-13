const SelectField = ({ value, onChange, children }) => (
    <select value={value} onChange={onChange}
        className="w-full bg-transparent border border-text-tertiary rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition">
        {children}
    </select>
)
export default SelectField