import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";


export const GET = async (request, { params }) => {

    try {
        await connectToDB();
        const dbPrompt = await Prompt.findById(params.id).populate("creator")

        if (!dbPrompt) return new Response("Prompt not found", {status: 404})

        return new Response(JSON.stringify(dbPrompt), {status: 200})
    } catch (error) {
        return new Response("Failed to get prompt", {status: 500})
    }
}


export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json()
    try {
        await connectToDB();
        const dbPrompt = await Prompt.findById(params.id)

        if (!dbPrompt) return new Response("Prompt not found", {status: 404})

        dbPrompt.prompt = prompt
        dbPrompt.tag = tag

        await dbPrompt.save()

        return new Response(JSON.stringify(dbPrompt), {status: 200})
    } catch (error) {
        return new Response("Failed to update prompt", {status: 500})
    }
}


export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(params.id)
        return new Response("deleted", {status: 200})
    } catch (error) {
        return new Response("Failed to update prompt", {status: 500})
    }
}



