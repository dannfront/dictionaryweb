import { result } from './script.js'

export let wordSpeech = ""
export let inputValue = ""


const categories = (data, i) => data[0].meanings[i]?.definitions
const synonyms = (data, i) => data[0].meanings[i]?.synonyms || []
export const wordSpeechValue = () => inputValue


export async function getJson(word) {
    try {
        const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const result = await data.json()
        if (!data.ok) throw new Error("Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.")
        return result
    } catch (error) {
        throw error
    }
}

export async function handleSearch(input, e) {
    try {
        e.preventDefault()

        const word = input.value
        if (!word) throw new Error("sorry, the search field should not be empty");

        const data = await getJson(input.value)
        wordSpeech = data[0].word

        result.textContent = ""

        render(data)

        inputValue = wordSpeech
        input.value = ""
    } catch (error) {
        console.log(error);
        renderError(error)
    }
}

function grammaticalCategories(data, categories, synonyms) {

    return data ?
        `
    <section class="mt-10">

    <div class="my-5">
      <p class="font-bold barra capitalize text-lg dark:text-white1 md:text-2xl">${categories}</p>
    </div>

    <h3 class="capitalize text-white4 md:text-lg">Meanig</h3>

    <ul class="list-disc custom-list pl-4 mt-5">

    ${data.map(el => {
            return `
        <li class="text-black3 mb-3">
            <p class="dark:text-white1 md:text-lg">${el.definition}</p>
            <p class="text-white4  dark:text-white4 md:text-lg">${el?.example ? el.example : ""}</p>
        </li>
        `
        }).join("")

        }
    </ul>
    ${synonymsCategories(synonyms)}
    </section>
    `
        :
        ""
}

function synonymsCategories(data) {
    return data.length ?
        `
    <div class="flex gap-12 items-center mt-5">
        <p class="capitalize text-white4 md:text-xl">Synonyms</p>
        <p class="text-purple text-sm md:text-base">${data.map(sym => sym).join(", ")}</p>
    </div>`
        :
        ""
}


export function render(data) {

    const [noun, verb, adjetives] = [0, 1, 2].map(i => categories(data, i))
    const [nounSynonyms, verbsSynonyms, adjetivesSynonyms] = [0, 1, 2].map(i => synonyms(data, i))
    const { sourceUrls: url, word } = data[0]
    const { text } = data[0].phonetics[0]

    const html = `
    <section class="flex justify-between items-center mt-8">

    <div>
      <h2 class="font-bold text-3xl md:text-6xl dark:text-white1">${word}</h2>
      <p class="text-purple">${text ? text : ""}</p>
    </div>

    <svg class="svg cursor-pointer btn--speech" xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75">
        <g class="hover:fill-white"  fill="#A445ED" fill-rule="evenodd">
            <circle cx="37.5" cy="37.5" r="37.5" opacity=".25" class="hover:fill-purple hover:opacity-100"/>
            <path d="M29 27v21l21-10.5z"/>
        </g>
    </svg>

  </section>

  <section>
    
    ${grammaticalCategories(noun, "noun", nounSynonyms)}

    ${grammaticalCategories(verb, "verb", verbsSynonyms)}

    ${grammaticalCategories(adjetives, "adjetives", adjetivesSynonyms)}

    ${`
        <div class="mb-5 border-t border-t-white3 dark:border-t-black4 my-5 pt-5 mt-10">
        <p class="capitalize text-white4"><span class="border-b border-b-white3 dark:border-b-white4 md:text-sm">source</span></p>
        ${url.map(el => {
        return `
            <a class="flex gap-3 text-xs dark:text-white1 md:text-sm" href="${el}"><span>${el}</span> <img src="../starter-code/assets/images/icon-new-window.svg" alt=""></a>
                `
    }).join("")
        }
        </div>
        `
        }

  </section>
    `
    result.insertAdjacentHTML('afterbegin', html)
}


function renderError(error) {
    result.textContent = ""
    const messageError = `
    <section class="my-20 grid grid-rows-1 gap-5 text-center">

        <p class="text-5xl">😕</p>

        <h2 class="text-black3 text-2xl dark:text-white1">No Definitions Found</h2>

        <p class="text-errror text-lg">${error}</p>
    
    </section>
    `
    result.insertAdjacentHTML('afterbegin', messageError)
}




