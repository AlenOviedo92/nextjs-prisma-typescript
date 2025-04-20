"use client"
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

function NewPage() {
    const params = useParams()
    console.log(params)

    useEffect(() => {
        if(params.id) {
            axios.get(`/api/tasks/${params.id}`)
                .then(res => {                              //Agrego then para evitar poner el await, ya que useEffect no me permite async/await
                    setValue('title', res.data.title)
                    setValue('description', res.data.description)
                })     
        }
    }, [])

    const { handleSubmit, register, setValue } = useForm()  //setValue permite actualizar valores del formulario
    const router = useRouter()

    const onSubmit = handleSubmit(async data => {
        if(params.id) {
            console.log('Actualizando tarea')
            await axios.put(`/api/tasks/${params.id}`, data)
        } else {
            const res = await axios.post('/api/tasks', data)
            console.log(res)
        }
        router.push('/')
        router.refresh()
    })

    return(
        <section className="h-screen flex items-center justify-center">
            <form onSubmit={ onSubmit }>
                <label 
                    htmlFor="title"
                    className="font-bold text-sm"
                >
                    Write your title:
                </label>
                <input
                    id="title"
                    type="text" 
                    placeholder="Write a type" 
                    className="px-3 py-1 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-white block"
                    {...register('title')}  //Con esto se agregan el onChange, name y value
                />

                <label 
                    htmlFor="description"
                    className="font-bold text-sm"
                >
                    Write your description:
                </label>
                <textarea 
                    id="description"
                    placeholder="Write a description"
                    className="px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-white block w-full"
                    {...register('description')}
                ></textarea>

                <button
                    className="bg-sky-500 px-3 py-1 rounded-md text-white mt-2"
                >
                    {
                        params.id ? "EDITAR" : "CREAR"
                    }
                </button>
            </form>
        </section>
    )
}

export default NewPage;