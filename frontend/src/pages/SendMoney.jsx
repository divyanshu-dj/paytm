import { useState } from 'react'
import { Heading } from "../components/Heading";
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const SendMoney = () => {
    const [user, setUser] = useState({
        firstName: "John",
        lastName: "Doe",
        _id: 1
    });

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg w-80 text-center">
                    <Heading label={"Send Money"} />
                    <div className="flex items-center p-4 pt-10 font-semibold">
                        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                            <div className="flex flex-col justify-center h-full text-xl">
                                {user.firstName[0]}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center h-full">
                            <div>
                                {user.firstName} {user.lastName}
                            </div>
                        </div>
                    </div>
                    <Input label={"Amount"} placeholder={"Enter Amount"} />
                    <div className='p-4'>
                        <Button label={"Send Money"} />
                    </div>
                </div>
            </div>
        </div>
    );
};
