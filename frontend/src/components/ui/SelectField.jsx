const SelectField = ({ value, onChange, onBlur, label, id, error, children }) => (
    <div className="w-full flex flex-col gap-1">
        {label && (
            <label htmlFor={id} className="text-sm text-text-caption">
                {label}
            </label>
        )}
        <select id={id} value={value} onChange={onChange} onBlur={onBlur}
            className={`w-full bg-transparent border ${error ? 'border-action-pass' : 'border-text-tertiary'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition`}>
            {children}
        </select>
        {error && <p className="text-action-pass text-xs">{error}</p>}
    </div>
)
export default SelectField