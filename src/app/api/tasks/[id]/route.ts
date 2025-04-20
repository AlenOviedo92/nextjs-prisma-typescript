import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";         //Traigo la DB para hacer consultas

interface Params {
    params: { id: string }
}

export async function GET( request: Request, { params }: Params ) {
    const task = await prisma.task.findFirst({
        where: {
            id: +params.id
        }
    })
    return NextResponse.json(task)
}

export async function PUT(request: Request, { params }: Params) {
    const data = await request.json()
    const updatedTask = await prisma.task.update({
        where: {
            id: +params.id
        },
        data: data
    })
    return NextResponse.json(updatedTask)
}

export async function DELETE(request: Request, { params }: Params) {
    const deletedTask = await prisma.task.delete({
        where: {
            id: +params.id
        }
    })
    return NextResponse.json(deletedTask)
}
