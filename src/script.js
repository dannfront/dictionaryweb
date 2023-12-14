'use strict'

import * as fun from './functions.js'

const htmlTag = document.querySelector("html")
const search = document.querySelector(".form")
const inputSearch = document.querySelector(".search")
export const result = document.querySelector(".result")
const containerFonts = document.querySelector(".container--fonts")
const selectFont = document.querySelector(".select--font")
export const btnDark = document.querySelector('.btn--dark')
const containerThemeDark = document.querySelector('.container--theme--dark')
const toogle = document.querySelector(".toogle")
export const btnSpeech = document.querySelector(".btn--speech");
const btnSearch = document.querySelector(".position--search")
const fontAct = document.querySelector('.actually--font')

search.addEventListener('submit', fun.handleSearch.bind(null,inputSearch))

btnSearch.addEventListener('click',fun.handleSearch.bind(null,inputSearch))

containerThemeDark.addEventListener('click', (e) => {
    const btn = e.target.closest(".btn--dark")
    if (!btn) return
    htmlTag.classList.toggle("dark")
    toogle.classList.toggle('active')

})

containerFonts.addEventListener('click', (e) => {
    const font = e.target.closest('.font');
    if (!font) return;

    const body = document.querySelector('body');
    body.className = font.dataset.font;
    fontAct.textContent = font.textContent;
    body.classList.add("dark:bg-black")
});
selectFont.addEventListener('click', (e) => {
    const btn = e.target.closest(".fonts")

    if (!btn) return

    containerFonts.classList.toggle("hidden")
})

window.addEventListener('load', async () => {
    const data = await fun.getJson("void")
    fun.render(data)
})

document.addEventListener('click', async (e) => {
    const btn = e.target.closest(".btn--speech")
    if (!btn) return
    const speech = new SpeechSynthesisUtterance();
    speech.text = !fun.wordSpeechValue()?"void":fun.wordSpeechValue();
    window.speechSynthesis.speak(speech);
});


window.addEventListener('click', (e) => {
    if (containerFonts.contains(e.target) || selectFont.contains(e.target)) return;
    containerFonts.classList.add("hidden");
});

