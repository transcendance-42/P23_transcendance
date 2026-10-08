export default function ProfileField({ label, type = 'text', value, onChange, error = false }) {
    return (
        <label className="flex flex-col gap-1">
            <span className={`text-xs uppercase tracking-wide ${error ? 'text-primary font-semibold' : 'text-text-caption'}`}>
                {label}
            </span>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full rounded-md border bg-surface-white px-3 py-2 text-text-primary outline-none transition focus:border-primary ${error ? 'border-primary' : 'border-text-caption/40'}`}
            />
        </label>
    )
}