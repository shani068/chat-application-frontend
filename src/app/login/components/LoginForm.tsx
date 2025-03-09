"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles, Mail, Lock, UserCircle2 } from 'lucide-react';
import Link from "next/link";
import { colors } from "@/lib/colors";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostRequest } from "@/hooks/axiosRequest";

interface ILoginForm {
    email: string;
    password: string;
}

export default function LoginPage() {
    const { register, handleSubmit, reset, formState: {errors} } =  useForm<ILoginForm>();
    const { mutate, isPending } = usePostRequest(`${process.env.NEXT_PUBLIC_API_URL}/user/login`);
    console.log("env file", process.env.NEXT_PUBLIC_API_URL)
    const onSubmit: SubmitHandler<ILoginForm> = (formData) => {
       
        console.log("Login with:", formData);
        mutate(formData, {
            onSuccess: (data) => {
                console.log("Success", data);
            },
            onError: (error) => {
                console.log("Error", error);
            }
        })
    };

    const handleGuestCredentials = () => {
        // Implement guest credential logic here
        console.log("Get guest credentials");
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ background: colors.background }}>
            <Card className="w-full max-w-md space-y-8 p-8 bg-white bg-opacity-90 backdrop-blur-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-indigo-600 mr-2" />
                        Chat App Login
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <Label htmlFor="email-address" className="sr-only">
                                Email address
                            </Label>
                            <Input
                                id="email-address"
                                type="email"
                                autoComplete="email"
                                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                {...register("email", {required: "Email is required"})}
                            />
                            {errors.email && <p className="text-red-500">Email is required</p>}
                        </div>
                        <div>
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                {...register("password")}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{ backgroundColor: colors.primary }}
                        >
                            <Mail className="h-5 w-5 text-indigo-300 group-hover:text-indigo-400 mr-2" />
                            {
                                isPending ? "Login..." : "Login"
                            }
                        </Button>
                    </div>
                    <div>
                        <Button
                            onClick={handleGuestCredentials}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{ backgroundColor: colors.secondary }}
                        >
                            <UserCircle2 className="h-5 w-5 text-indigo-300 group-hover:text-indigo-400 mr-2" />
                            Get Guest Credentials
                        </Button>
                    </div>
                </form>
                <div className="text-center">
                    <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Don't have an account? Sign up
                    </Link>
                </div>
            </Card>
        </div>
    );
}

