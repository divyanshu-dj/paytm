import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { WarningOption } from "../components/WarningOption";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handelClick() {
        try {
            console.log({username, firstName, lastName, password});
            const { data } = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                    username,
                    firstName,
                    lastName,
                    password,
                }
            );
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
        }
    }

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
                        value={firstName}
                        label="First Name"
                        placeholder="John"
                    />

                    <Input
                        onChange={(e) => {
                            setLastName(e.target.value);
                            console.log(e.target.value);
                        }}
                        value={lastName}
                        label="Last Name"
                        placeholder="Doe"
                    />

                    <Input
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        value={username}
                        label="Email"
                        placeholder="example@gmail.com"
                    />

                    <Input
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        value={password}
                        label="Password"
                        placeholder="*******"
                        type="password"
                    />

                    <div className="p-4">
                        <button onClick={handelClick}>hsgkshiogesi</button>

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
