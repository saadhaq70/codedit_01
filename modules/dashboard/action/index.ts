"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/modules/auth/actions";

export const getAllPlaygroundForUser = async()=>{
    const user = await currentUser();
     if (!user) {
      console.log("Unauthorized: No user found");
      return []; // Return empty array instead of undefined
    }

    try{
        const playground = await db.playground.findMany({
            where :{
                userId:user?.id
            },
            include:{
                user:true
            }
        });
        return playground;

    }
    catch(err:any){
        console.log(err.message);
    }
}
