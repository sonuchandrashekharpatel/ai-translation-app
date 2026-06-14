import { config } from "./utils/config.js"
import { openai } from "./utils/config.js"

const textArea = document.getElementById("text-area")
const translatedSec = document.getElementById("translated-section")
const translationSec = document.getElementById("translation-section")
const translateBtn = document.getElementById("translate-btn")
const startOverBtn = document.getElementById("start-over-btn")

config()

const systemPrompt = "You are a precise translation engine. Translate the user's input text into the requested target language. Output ONLY the raw translated text. Do NOT include explanations, introduction, formatting, markdown bold (**), or extra commentary. If the input is empty, return an empty string."

document.addEventListener("click", async (e) => {
    const id = e.target.id
    
    if(id === "translate-btn"){
        translateBtn.style.cursor = "wait"
        e.preventDefault()
        
        const lang = document.querySelector("input[name='language']:checked")

        console.log(textArea, lang)
        if(textArea &&  lang){
            const inputText = textArea.value
            const language = lang.value
            console.log(language)
    
            console.log("Text :", inputText)
            console.log("Selected Language :", language)
    
            const translatedText = await translateText(inputText, language)
            
            if(translatedText) {

                translateBtn.style.cursor = "pointer"
                translationSec.classList.add("display-none")
                translatedSec.classList.remove("display-none")
        
                document.querySelector(".original-text-box").innerHTML = inputText
                document.querySelector(".translation-box").textContent = translatedText

            } else {
                console.err("Text not generated.")
            }
        } else {
            alert("Please, Fill out the form correctly Sir!")
        }

    } else if (id === "start-over-btn") {

        translatedSec.classList.add("display-none")
        translationSec.classList.remove("display-none")
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
                    content: `Text: "${text}"  language to be translated in: "${language}".`,
                }
            ],
            temperature: 0.2,
            max_tokens: 200
        })

        const content = response.choices[0].message.content
        
        return content

    } catch(err) {
        console.error(err)
        alert("Something went wrong, Please refresh the page.")
    }
}
