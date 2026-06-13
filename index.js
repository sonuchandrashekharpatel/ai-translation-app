import { config } from "./utils/config.js"
import { openai } from "./utils/config.js"

const textArea = document.getElementById("text-area")
const translatedSec = document.getElementById("translated-section")
const translationSec = document.getElementById("translation-section")

config()

const systemPrompt = "You are a precise translation engine. Translate the user's input text into the requested target language. Output ONLY the raw translated text. Do NOT include explanations, introduction, formatting, markdown bold (**), or extra commentary. If the input is empty, return an empty string."


document.addEventListener("click", async (e) => {
    const id = e.target.id
    if(id === "translate-btn"){
        e.preventDefault()
        const text = textArea.value
        const language = document.querySelector("input[name='language']:checked").value
        console.log(language)

        console.log("Text :", text)
        console.log("Selected Language :", language)

        await translateText(text, language)

    } else if (id === "start-over-btn") {

    }
})


async function translateText(text, language) {
    try {
        const response = await openai.chat.completions.create({
            model: "openai/gpt-4o-mini",
            messages : [
                {
            role: "system",
            content: systemPrompt
                },
                {
                    role: "user",
                    content: `Text: "${text}"  language to be translated in: "${language}".`
                }
            ]
        })

        const content = response.choices[0].message.content
        // messages.push({
        //     role: "assitant",
        //     content: content
        // })

        console.log(content)

    } catch(err) {
        console.error(err)
    }
}

        // translationSec.classList.add("display-none")
        // translatedSec.classList.remove("display-none")
                // translatedSec.classList.add("display-none")
        // translationSec.classList.remove("display-none")