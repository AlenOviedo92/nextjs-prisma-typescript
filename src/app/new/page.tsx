"use client"
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

function NewPage() {
    const { handleSubmit, register } = useForm()
    const router = useRouter()

    const onSubmit = handleSubmit(async data => {
        const res = await axios.post('/api/tasks', data)
        console.log(res)
        router.push('/')
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
                    CREAR
                </button>
            </form>
        </section>
    )
}

export default NewPage;