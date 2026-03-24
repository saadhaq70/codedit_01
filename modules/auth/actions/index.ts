"use server";
import {auth} from "@/auth"
import { db } from "@/lib/db";

export const getUserById = async(id:string)=>{
    try{
        const user = await db.user.findUnique({
            where:{id},
            include:{
                accounts:true,
            }
        })
        return user;
    }
    catch(err:any){
        console.log(err);
        return false;
    }
}

export const getAccountByUserId = async(userId:string)=>{
    try{
        const account = await db.account.findFirst({
            where:{
                userId
            }
        })
        return account;
    }
    catch(err:any){
        console.log(err);
        return false;
    }
}

export const currentUser = async() => {
    try{
        const user = await auth();
        return user?.user;
    }
    catch(err:any){
        console.log(err);
        return false;
    }
}