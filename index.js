const textArea = document.getElementById("text-area")
// const radio = document
const translatedSec = document.getElementById("translated-section")
const translationSec = document.getElementById("translation-section")

document.addEventListener("click", (e) => {
    const id = e.target.id
    if(id === "translate-btn"){
        e.preventDefault()
        const text = textArea.value
        const selectedLang = document.querySelector("input[name='language']:checked")

        console.log("Text :", text)
        console.log("Selected Language :", selectedLang.value)
        // translationSec.classList.add("display-none")
        // translatedSec.classList.remove("display-none")
    } else if (id === "start-over-btn") {
        // translatedSec.classList.add("display-none")
        // translationSec.classList.remove("display-none")
    }
})