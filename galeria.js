"use strict"

const imagens = [
    "./img/01.jpg",
    "./img/02.jpg",
    "./img/03.jpg",
    "./img/04.jpg",
    "./img/05.jpg",
    "./img/06.jpg",
    "./img/07.jpg",
    "./img/08.jpg",
]

const limparElementos = (elemento) =>{
    while(elemento.firstChild) {
        elemento.removeChild(elemento.lastChild);
    }
}

const pesquisarImagens = async (evento) => {
    if(evento.key === 'Enter'){

        const raca = evento.target.value ;
        const url = `https://dog.ceo/api/breed/${raca}/images`;
        const imagensResponse = await fetch( url);
        const imagens = await imagensResponse.json();

        // Para apagar o conteudo anterior 
        limparElementos(document.querySelector('.galeria-container'));
        limparElementos(document.querySelector('.slide-container'));

        carregarGaleria(imagens.message);
        carregarSlide(imagens.message);


    }
};

const pegarId = (url) => {
    const posBarra = url.lastIndexOf("/") + 1
    const posPonto = url.lastIndexOf(".")
    return url.substring(posBarra, posPonto)
}

const criarItem = (urlImagem) => {
    const container = document.querySelector(".galeria-container")
    const novoLink = document.createElement("a")
    novoLink.href = `#${pegarId(urlImagem)}`
    novoLink.classList.add("galeria-items")
    novoLink.innerHTML = `<img src="${urlImagem}" alt="">`
    container.appendChild(novoLink)
    
    // container.innerHTML += `
    //         <a href="#01" class="galeria-items">
    //             <img src="${urlImagem}" alt="">
    //         </a>
    //     `
}

const criarSlide = (urlImagem, indice, arr) => {
    const container = document.querySelector(".slide-container")
    const novaDiv = document.createElement("div")
    novaDiv.classList.add("slide")
    novaDiv.id = pegarId(urlImagem)

    const indiceAnterior = indice <= 0 ? arr.length - 1 : indice - 1
    const idAnterior =  pegarId(arr[indiceAnterior])

    const indiceProximo = indice >= arr.length - 1 ? 0 : indice + 1
    const idProximo = pegarId(arr[indiceProximo])

    novaDiv.innerHTML = `
            <div class="image-container">
                <a href="#" class="close">	
                    &#128473;
                </a>
                <a href="#${idAnterior}" class="navegacao anterior">
                    &#129168;
                </a>
                <img src="${urlImagem}" alt=""/>	
                
                <a href="#${idProximo}" class="navegacao proximo">
                    &#129170;
                </a>
            </div>
    `
    container.appendChild(novaDiv)
}

const carregarGaleria = (imgs) => imgs.forEach(criarItem)

const carregarSlide = (imgs) => imgs.forEach(criarSlide)

document.querySelector('.pesquisa-container input').addEventListener('keypress', pesquisarImagens)