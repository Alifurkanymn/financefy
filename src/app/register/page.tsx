import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FaGoogle } from "react-icons/fa";
import Image from 'next/image'

type Props = {}

function Register({ }: Props) {
    return (
        <div className='grid grid-cols-2'>
            <div className='w-full h-screen flex justify-center items-center bg-white'>
                <Card className="w-[450px] border-0 shadow-none">
                    <CardHeader>
                        <div className='w-full flex justify-center items-center'>
                            <Image className='rounded-2xl mb-4 hover:scale-105 transition-all duration-300' src="/logo-bg.svg" alt='logo-bg' width={60} height={60} />
                        </div>
                        <CardTitle className='text-4xl text-center'>Financefy'a Hoş Geldin !</CardTitle>
                        <CardDescription className='text-md !mt-0 text-center'>Kayıt ol</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label className='font-bold mb-1 text-md' htmlFor="mail">E-posta</Label>
                                    <Input className='h-12' id="mail" placeholder='E-posta Giriniz.' />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label className='font-bold mb-1 text-md' htmlFor="password">Şifre</Label>
                                    <Input className='h-12' id="password" type='password' placeholder='Şifre Giriniz.' />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col justify-center">
                        <Button className='btn primary-btn'>Giriş Yap</Button>
                        <div class="relative flex items-center w-full py-8">
                            <div className="flex-grow h-px bg-zinc-700"></div>
                            <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-zinc-700">YA DA</span>
                            <div className="flex-grow h-px bg-zinc-700"></div>
                        </div>
                        <Button className='btn secondary-btn'>
                            <FaGoogle /> Google ile Giriş Yap
                        </Button>
                        <div className='flex items-center mt-8'>
                            <p className='text-black'>Hesabın mı yok ?</p>
                            <button className='text-start text-primaryColor font-bold ms-3 rounded' onClick={null}>
                                Kayıt Ol
                            </button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <div className='hidden md:block bg-gradient'>
                <div className='h-full w-full flex items-center justify-center'>
                    <Image className='hover:scale-105 transition-all duration-300' src="/logo-white.svg" alt="Financefy Logo" width={400} height={200} />
                </div>
            </div>
        </div>
    )
}

export default Register