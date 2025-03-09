
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles, Mail, Lock, User, ImageIcon } from 'lucide-react';
import Link from "next/link";
import { colors } from "@/lib/colors";
import { useForm, SubmitHandler } from "react-hook-form";
import { ISignUpForm } from "@/interfaces/interfaces";
import { useRegister } from "@/api/registerApi";
import { toast } from "react-toastify";



export default function SignUpPage() {

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit,reset, watch,trigger, setValue, formState: { errors } } = useForm<ISignUpForm>();
    const { mutate, isPending } = useRegister();

    const password = watch("password");
    
    const handleSignUp: SubmitHandler<ISignUpForm> = (data) => {
        const { confirmPassword, ...payload } = data;
        // Implement sign-up logic here
        try {
            mutate(payload, {
                onSuccess: (_) => {
                    // console.log("Sign up page success:", data);
                    toast.success("Sign up success");
                    reset();
                    setPreviewUrl("");
                },
                onError: (error) => {
                    console.log("Sign up error:", error);
                    toast.error("Sign up error");
                }
            })
        } catch (error) {
            console.log("Sign up form error:", error);
        }
        console.log("Sign up with:", payload);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("picture", file, { shouldValidate: true });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ background: colors.background }}>
            <Card className="w-full max-w-md space-y-8 p-8 bg-white bg-opacity-90 backdrop-blur-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 flex items-center justify-center">
                        <Sparkles className="h-8 w-8 text-indigo-600 mr-2" />
                        Chat App Sign Up
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignUp)}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <Label htmlFor="name" className="sr-only">
                                Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                autoComplete="name"
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Name"
                                {...register("name", { required: "Name is required" })}
                                onBlur={() => trigger("name")}
                            />
                            {
                                errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>
                            }
                        </div>
                        <div>
                            <Label htmlFor="email-address" className="sr-only">
                                Email address
                            </Label>
                            <Input
                                id="email-address"
                                type="email"
                                autoComplete="email"
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                {...register("email", { required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address"
                                    }
                                 })}
                                 onBlur={() => trigger("email")}
                            />
                            {
                                errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>
                            }
                        </div>
                        <div>
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" }, maxLength: { value: 10, message: "Password must be at most 10 characters long" } })}
                                onBlur={() => trigger("password")}
                            />
                            {
                                errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>
                            }
                        </div>
                        <div>
                            <Label htmlFor="confirm-password" className="sr-only">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Confirm Password"
                                {...register("confirmPassword", {
                                    validate: value => value === password || "Passwords do not match"
                                })}
                                onBlur={() => trigger("confirmPassword")}
                            />
                            {
                                errors.confirmPassword && <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
                            }
                        </div>
                    </div>

                    <div>
                        <Button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{ backgroundColor: colors.accent }}
                        >
                            <ImageIcon className="h-5 w-5 text-indigo-600 mr-2" />
                            Upload Image
                        </Button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                            name="picture"
                            required
                        />
                        {previewUrl && (
                            <div className="mt-4 flex justify-center">
                                <img src={previewUrl} alt="Preview" className="w-32 h-32 object-cover rounded-full" />
                            </div>
                        )}
                        {
                            errors.picture && <p className="text-red-600 text-sm">{errors.picture.message}</p>
                        }
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            style={{ backgroundColor: colors.primary }}
                        >
                            <User className="h-5 w-5 text-indigo-300 group-hover:text-indigo-400 mr-2" />
                            {isPending ? "Signing Up..." : "Sign Up"}
                        </Button>
                    </div>
                </form>
                <div className="text-center">
                    <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Already have an account? Log in
                    </Link>
                </div>
            </Card>
        </div>
    );
}

