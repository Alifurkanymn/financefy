'use client'

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { auth, googleProvider } from "@/lib/services/firebase";
import { signInWithPopup } from "firebase/auth";

type Props = {};

const Login = (props: Props) => {
    const { user, login, loginWithGoogle } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    }, [user, router]);

    const handleLogin = async () => {
        if (email && password) {
            await login(email, password);
        } else {
            alert("Lütfen e-posta ve şifreyi doldurun.");
        }
    };

    const handleGoogleLogin = async () => {
        await loginWithGoogle();
        router.push("/");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-full h-screen flex justify-center items-center bg-white">
                <Card className="w-[450px] border-0 shadow-none">
                    <CardHeader>
                        <div className="w-full flex justify-center items-center">
                            <Image
                                className="rounded-2xl mb-4 hover:scale-105 transition-all duration-300"
                                src="/logo-bg.svg"
                                alt="logo-bg"
                                width={60}
                                height={60}
                            />
                        </div>
                        <CardTitle className="text-4xl text-center">Financefy'a Hoş Geldin !</CardTitle>
                        <CardDescription className="text-md !mt-0 text-center">Financefy ile yönet, kaydet, analiz et !</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label className="font-bold mb-1 text-md" htmlFor="mail">
                                        E-posta
                                    </Label>
                                    <Input
                                        className="h-12"
                                        id="mail"
                                        placeholder="E-posta Giriniz."
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label className="font-bold mb-1 text-md" htmlFor="password">
                                        Şifre
                                    </Label>
                                    <Input
                                        className="h-12"
                                        id="password"
                                        type="password"
                                        placeholder="Şifre Giriniz."
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col justify-center">
                        <Button className="btn primary-btn" onClick={handleLogin}>
                            Giriş Yap
                        </Button>
                        <div className="relative flex items-center w-full py-8">
                            <div className="flex-grow h-px bg-zinc-700"></div>
                            <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-zinc-700">YA DA</span>
                            <div className="flex-grow h-px bg-zinc-700"></div>
                        </div>
                        <Button className="btn secondary-btn" onClick={handleGoogleLogin}>
                            <FaGoogle /> Google ile Giriş Yap
                        </Button>
                        <div className="flex items-center mt-8">
                            <p className="text-black">Hesabın mı yok ?</p>
                            <button
                                className="text-start text-primaryColor font-bold ms-3 rounded"
                                onClick={() => {
                                    router.push("/register");
                                }}
                            >
                                Kayıt Ol
                            </button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <div className="hidden md:block bg-gradient">
                <div className="h-full w-full flex items-center justify-center">
                    <Image
                        className="hover:scale-105 transition-all duration-300"
                        src="/logo-white.svg"
                        alt="Financefy Logo"
                        width={400}
                        height={200}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
