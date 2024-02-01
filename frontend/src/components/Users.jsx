import { useState } from 'react'
import { Button } from './Button'
import { Input } from './Input'


export function Users() {
    const [users, setUser] = useState([{
        firstName: "John",
        lastName: "Doe",
        _id: 1
    }]);

    return <div className='px-14'>
        <Input label="Users" placeholder="Search Users..." />
        <div>
            {users.map(user => <User key={users._id} user={user} />)}
        </div>
    </div>
}

function User({user}) {
    return <div className='flex justify-between p-4'>
        <div className='flex'>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
        
        <div className="flex items-center">
            <Button label={"Send Money"} onClick={"/send"} />
        </div>
    </div>
}