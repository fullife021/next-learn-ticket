
import { NextRequest, NextResponse } from "next/server";
import {PrismaClient} from '@prisma/client'

interface TopicRequest {
    userId:string;
    avatar:string;
    content:string;
    images:string[];
    options:string[];

}

const prisma = new PrismaClient();

export async function GET() {
    try {
        const topics = await prisma.topic.findMany({
            include:{
                options:true
            }
        })
        return NextResponse.json({
            topics
        },{status:200})
    } catch (e) {
        console.log("🚀 ~ GET ~ e:", e)
        return NextResponse.json({
            message:"Internal error"
        },{
            status:500
        })
    }
}
export async function POST(request:NextRequest) {
    try {

        const data = (await request.json()) as TopicRequest;
        
        const topic = await prisma.topic.create({
            data:{
                userId:data.userId,
                avatar:data.avatar,
                content:data.content,
                images:data.images,
                options:{
                    create:data.options.map((item) => ({
                        key:item,
                        value:0,
                    })

                    )
                }
            },
            include:{
                options:true
            }
        });
        return NextResponse.json(topic, {status:200});

    } catch (e) {
        console.log("🚀 ~ POST ~ e:", e)
        return NextResponse.json({
            message:"Internal error"
        },{
            status:500
        })
        
    }
}