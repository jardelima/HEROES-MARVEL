const ul = document.querySelector("[data-js='marvel']");
const filterInput = document.querySelector("#filter");

import { createHash } from "./geraHash.js";
const timeStamp = Date.now().toString();
let hash = createHash(timeStamp);

//método get para pegarmos os heróis na API
const getPosts = async (param) => {
    const response = await
        fetch(`http://gateway.marvel.com/v1/public/characters?${param}&ts=${timeStamp}&apikey=b0ce62d9e80a25f88583fba90670b19c&hash=${hash}`);
    return response.json();
}

//funções que preenchem o HTML da página com o retorno das requisições HTTP
const heroesFromFedd = (heros) => heros.data.results.map((item) => `
    <li class="card ${'normal'}">
    <img class="card-image" alt=${item.name} 
    src="${item.thumbnail.path}${'.'}${item.thumbnail.extension}"/>
    <h2 class="card-title">${item.name}</h2>
    </li>
    `).join("");

const heroesFromSearch = (heros) => heros.data.results.map((item) => `
    <li class="card ${'normal'}">
    <img class="card-image" alt=${item.name} src="${item.thumbnail.path}${'.'}${item.thumbnail.extension}"/>
    <h2 class="card-title">${item.name}</h2>
    <h3 class="card-description">${item.description}</h3>
    `).join("");

//funções que chamam o método GET e preenchem HTML através do método innerHTML

//exibe os heróis iniciais
const earlyFeed = async () => {
    const heros = await getPosts("orderBy=name&limit=20");
    const postsTemplate = heroesFromFedd(heros);
    ul.innerHTML = postsTemplate;
}

//exibe os heróis pesquisados
const searchPersonIntoDOM = async (search) => {
    const heros = await getPosts(`${'name='}${search}`);
    const postsTemplate = heroesFromSearch(heros);
    ul.innerHTML = postsTemplate;
}

//verifica o input "pesquisar personagens"
const modifyInputValue = (event) => {
    const inputValue = event.target.value.toLowerCase();

    if (inputValue !== "") {
        searchPersonIntoDOM(inputValue);
    } else if (inputValue == "" || inputValue == null) {
        earlyFeed();
    }
}

//preencher o feed inicial
earlyFeed();

//verificar se ocorre algum input
filterInput.addEventListener("input", modifyInputValue);