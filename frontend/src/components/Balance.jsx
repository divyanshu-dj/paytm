export function Balance({label}) {
    return <div className="flex font-semibold text-xl px-16 py-6">
        <div >
            Your Balance
        </div>
        <div className="px-5">
            ${label}
        </div>
    </div>
}