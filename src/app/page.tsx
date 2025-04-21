// import axios from "axios";
import TaskCard from "@/components/TaskCard";
import { prisma } from "../libs/prisma";

async function loadTasks() {
    // const res = await axios.get('http://localhost:3000/api/tasks')
    // console.log(res)
    const tasks = await prisma.task.findMany()
    return tasks
}

async function HomePage() {
    const tasks = await loadTasks()
    console.log(tasks)
    return(
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        {
            tasks.map(task => (
                <TaskCard key={ task.id } task={ task } />
            ))
        }
    </div>
    )
}

export default HomePage;
