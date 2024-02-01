import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import { Subheading } from "../components/Subheading";
import { WarningOption } from "../components/WarningOption";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="bg-white rounded-lg w-80 text-center">
                    <Heading label="Sign In" />
                    <Subheading label="Enter your credentials to access your account" />
                    <Input
                        onClick={(e) => {
                            setEmail(e.target.value);
                        }}
                        label="Email"
                        placeholder="example@gmail.com"
                    />
                    <Input
                        onClick={(e) => {
                            setPassword(e.target.value);
                        }}
                        label="Password"
                        placeholder="********"
                        type="password"
                    />
                    <div className="p-4">
                        <Button
                            onClick={async () => {
                                const res = await axios.post(
                                    "http://localhost:3000/api/v1/user/signup",
                                    {
                                        username,
                                        password,
                                    }
                                );
                                localStorage.setItem("token", res.data.token);
                                navigate("/dashboard");
                            }}
                            label="Sign in"
                        />
                    </div>
                    <WarningOption
                        label="Don't have an account?"
                        buttonText="Sign up"
                        to="/signup"
                    />
                </div>
            </div>
        </div>
    );
};
