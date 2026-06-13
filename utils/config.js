import OpenAI from "openai"

const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = import.meta.env.VITE_AI_URL




export function config() {
    try {

        if(!apiKey) {
            throw new Error("API_KEY Not found or working...")
        } else if(!baseUrl) {
            throw new Error("Base url not found or working...")
        } else {
            console.log("Working Everything...")
        }
    }  catch(err) {
        console.log(err)
    }
}

export const openai = new OpenAI(
    {
        apiKey: apiKey,
        baseURL: baseUrl,
        dangerouslyAllowBrowser: true
    }

)