import { Link } from 'react-router-dom'

export function WarningOption({label, buttonText, to}) {
    return <div className="flex justify-center font-semibold text-sm pb-4">
        <div className='pr-1'>
            {label}
        </div>
        <Link to={to} className="underline focus:text-blue-700" >{buttonText}</Link>
    </div>
}