"use client"
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

function NewPage() {
    const params = useParams()
    console.log(params)
    const { handleSubmit, register, setValue } = useForm()  //setValue permite actualizar valores del formulario
    const router = useRouter()

    useEffect(() => {
        if(params.id) {
            axios.get(`/api/tasks/${params.id}`)
                .then(res => {                              //Agrego then para evitar poner el await, ya que useEffect no me permite async/await
                    setValue('title', res.data.title)
                    setValue('description', res.data.description)
                })     
        }
    }, [params.id, setValue])

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
        <section className="h-[calc(100vh-7rem)] flex items-center justify-center">
            <form 
                onSubmit={ onSubmit }
                className="w-1/4"
            >
                <h1 className="text-3xl font-bold">
                    {
                        params.id ? "Update" : "Create"
                    }
                </h1>
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
                    className="px-3 py-1 mb-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-sky-300 focus:border-sky-300 text-white block w-full"
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

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-sky-500 px-3 py-1 rounded-md text-white mt-2"
                    >
                        {
                            params.id ? "EDITAR" : "CREAR"
                        }
                    </button>

                    <button
                        type="button"
                        className="bg-red-500 px-3 py-1 rounded-md text-white mt-2"
                        onClick={async() => {
                            if(confirm('¿Are you sure you want yo delete this task?')) {
                                await axios.delete(`/api/tasks/${params.id}`)
                                router.push('/')
                                router.refresh()
                            }
                        }}
                    >
                        ELIMINAR
                    </button>
                </div>
            </form>
        </section>
    )
}

export default NewPage;