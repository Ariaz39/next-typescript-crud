import {NextResponse} from "next/server";
import {prisma} from "@/libs/prisma";

export interface Params {
    params: { id: string };
}

export async function GET(request: Request, {params}: Params) {
    const taskId: string = params.id;
    const task = await prisma.task.findFirst({
        where: {
            id: Number(taskId)
        }
    })

    return NextResponse.json({
        message: 'Proceso exitoso',
        data: task
    })
}

export async function PUT(request: Request, {params}: Params) {
    const taskId: string = params.id;
    const data = await request.json()
    const taskUpdated = await prisma.task.update({
        where: {
            id: Number(taskId),
        },
        data: {
            title: data.title,
            description: data.description
        }
    })

    return NextResponse.json({
        message: 'Proceso exitoso',
        data: taskUpdated
    })
}

export async function DELETE(request: Request, {params}: Params) {
    const taskId: string = params.id;
    await prisma.task.delete({
        where: {
            id: Number(taskId)
        }
    })

    return NextResponse.json({
        message: 'Eliminacion exitosa'
    })
}