export function Input({label, placeholder, type, onChange}) {
    return <div className="px-4 pb-1">
        <div className="text-sm font-md text-left py-2 font-semibold">
            {label}
        </div>
        <input type={type? type : "text"} onChange={onChange} placeholder={placeholder} className="w-full rounded-md border-2 px-2 py-1 border-slate-200" />
    </div>
}