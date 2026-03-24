import React from 'react'
import Image from 'next/image'
import SignInFormClient from '@/modules/auth/components/sign-in-form-client'
function page() {
  return (
    <>
    <Image src={"/login.svg"} alt="Login-Image" height={400} width={600} className="m-10"></Image>
    <SignInFormClient></SignInFormClient>
    </>
  )
}

export default page