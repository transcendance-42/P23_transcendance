export default function ProfileSelect({ label, value, onChange, options }) {
    return (
        <label className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wide text-text-caption">
                {label}
            </span>
            <select
                value={value}
                onChange={onChange}
                className="w-full rounded-md border border-text-caption/40 bg-surface-white px-3 py-2 text-text-primary outline-none transition focus:border-primary"
            >
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </label>
    )
}