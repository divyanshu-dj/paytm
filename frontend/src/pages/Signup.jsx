import { useState } from 'react';


import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { WarningOption } from "../components/WarningOption";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg w-80 text-center">
                    <Heading label="Signup" />
                    <Subheading label="Enter your information to create an account" />
                    <Input
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                        label="First Name"
                        placeholder="John"
                    />

                    <Input
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        label="Last Name"
                        placeholder="Doe"
                    />

                    <Input
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        label="Email"
                        placeholder="example@gmail.com"
                    />

                    <Input
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        label="Password"
                        placeholder="*******"
                        type="password"
                    />

                    <div className="p-4">
                        <Button
                            onClick={async () => {
                                const res = await axios.post(
                                    "http://localhost:3000/api/v1/user/signup",
                                    {
                                        username,
                                        firstName,
                                        lastName,
                                        password,
                                    }, {
                                        headers:{
                                            'Content-Type': 'application/json'
                                        }
                                    }
                                );
                                localStorage.setItem("token", res.data.token);
                                navigate("/dashboard");
                            }}
                            label="Sign Up"
                        />
                    </div>

                    <WarningOption
                        label="Already have an account?"
                        buttonText="Sign in"
                        to="/signin"
                    />
                </div>
            </div>
        </div>
    );
};
