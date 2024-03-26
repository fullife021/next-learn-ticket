import { NextRequest, NextResponse } from "next/server";
import {PrismaClient} from '@prisma/client'
interface UserRequest {
    userId: string;
}

const prisma = new PrismaClient();

export async function POST(request:NextRequest) {
    try {
        const {userId} = (await request.json()) as UserRequest;
        console.log("🚀 ~ POST ~ data:", userId)

        if(!userId) {
            return NextResponse.json(
                {
                    message:"Bad Request"
                },
                {
                    status:400
                }
            )
        }

        let user = await prisma.user.findUnique({
            where:{
                userId:userId
            }
        });
        console.log("🚀 ~ POST ~ data:22222222:", userId)
        if(!user) {
            user = await prisma.user.create({
                data:{
                    userId:userId
                }
            })
        }
        return NextResponse.json({
            user
        },{
            status:200
        });

    } catch (error) {
        console.log("🚀 ~ POST ~ error:", error)
        return NextResponse.json(
            {
                message:"Internal Error"
            },
            {
                status:500
            }
        )
    }
    
}