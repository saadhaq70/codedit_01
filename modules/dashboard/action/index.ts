"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/modules/auth/actions";
import { revalidatePath } from "next/cache";
import { error } from "node:console";

export const toggleStarMarked = async (
  playgroundId: string,
  isChecked: boolean
) => {
  const user = await currentUser();
  // @ts-ignore
  const userId = user?.id;
  if (!userId) {
    throw new Error("User Id is Required");
  }

  try {
    if (isChecked) {
      await db.starMark.create({
        data: {
          userId: userId!,
          playgroundId,
          isMarked: isChecked,
        },
      });
    } else {
        await db.starMark.delete({
        where: {
          userId_playgroundId: {
            userId,
            playgroundId: playgroundId,

          },
        },
      });
    }

     revalidatePath("/dashboard");
    return { success: true, isMarked: isChecked };
  } catch (error) {
       console.error("Error updating problem:", error);
    return { success: false, error: "Failed to update problem" };
  }
};

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
                user:true,
                Starmark:{
                  where :{
                    userId : user?.id!
                  },
                  select:{
                    isMarked : true
                  }
                }
            }
        });
        return playground;

    }
    catch(err:any){
        console.log(err.message);
    }
}

export const createPlayground = async(data:{
    title:string;
    description?: string;
    template : "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
})=>{
    const user = await currentUser();
    // @ts-ignore
    if (!user?.id) {
        throw new Error("User not authenticated");
    }

    const {title,description,template} = data;
    try{

        const playground = await db.playground.create({
            data :{
                title:title,
                description:description,
                template:template,
                // @ts-ignore
                userId:user?.id!,
            }
        })
        return playground;
    }
    catch(err:any){
        console.log(err);
    }
}

export const deleteProjectById = async(id:String)=>{
    try{
        await db.playground.delete({
            where:{
                //@ts-ignore
                id,
            }
        })
        revalidatePath('/dashboard');
    }
    catch(err:any){
        console.log(err);
    }
}


export const editProjectById = async (
    id: string,
    data: { title: string; description: string }
  ) => {
    try {
      await db.playground.update({
        where: {
          id,
        },
        data: data,
      });
      revalidatePath("/dashboard");
    } catch (error) {
      console.log(error);
    }
}

export const duplicateProjectById = async (id: string) => {
    try {
      const originalPlayground = await db.playground.findUnique({
        where: { id },
        // todo: add tempalte files
      });
      if (!originalPlayground) {
        throw new Error("Original playground not found");
      }
  
      const duplicatedPlayground = await db.playground.create({
        data: {
          title: `${originalPlayground.title} (Copy)`,
          description: originalPlayground.description,
          template: originalPlayground.template,
          userId: originalPlayground.userId,
  
          // todo: add template files
        },
      });
  
      revalidatePath("/dashboard");
      return duplicatedPlayground;
    } catch (error) {
      console.error("Error duplicating project:", error);
    }
  };