import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";         //Traigo la DB para hacer consultas

export async function GET() {
    const tasks = await prisma.task.findMany()      //Consulto a la DB, busca múltiples datos dentro de la tabla
    console.log(tasks)
    return NextResponse.json(tasks)
}

export async function POST(request: Request) {
    const data = await request.json()
    console.log(data)
    const newTask = await prisma.task.create({      //Creo una tarea en la DB
        data: data
    })
    return NextResponse.json(newTask)
}
