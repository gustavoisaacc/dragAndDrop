const dropElement = document.querySelector('#drop-element');
const dragElement = document.querySelector('.pokemon');
const btn = document.querySelector('.btn');
const ups = document.querySelector('.ups')
const container = document.querySelector('.container');
const errorTitle = document.querySelector('.errorTitle');

const CARD = 4;
let pokemonSerch = [];
let pokemonName = [];
let countError = 0;



async function serchPokemonById(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if(response.status === 200){
        const data = await response.json();
        pokemonSerch.push(data)
        pokemonName.push(data.name)
    }

    dragElement.innerHTML="";
    pokemonSerch.forEach(img => {
        dragElement.innerHTML+=`
            <img class="item" id="${img.name}" draggable=true  src="${img.sprites.other['official-artwork'].front_default
        }" alt="${img.name}">  
        `        
    })

    let nameRandon = pokemonName.sort(()=> Math.random()-0.5)
    dropElement.innerHTML="";
    nameRandon.forEach(name => {
        dropElement.innerHTML+= `
            <li class="name">${name}</li>
        `
    })

    let pokemons = document.querySelectorAll('.item');
    pokemons = [...pokemons];

    pokemons.forEach( item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.target.id);
        })
    })

    let names = document.querySelectorAll('.name')
    names = [...names]

    names.forEach( name => {
        name.addEventListener('dragover', e => {
            e.preventDefault();
        })
        name.addEventListener('drop', e => {
            let dragNameId = e.dataTransfer.getData('text');
            let pokemonElement = document.querySelector(`#${dragNameId}`)
            let dropNameText = e.target.innerText;
            
            if(dragNameId === dropNameText){
               e.target.innerHTML = "";
               e.target.appendChild(pokemonElement);
               var nodeList = dragElement.childNodes;
                console.log(nodeList)
                if((nodeList.length) === 5){
                    errorTitle.innerHTML = 'Felicicades lo lograste'
                    ups.classList.remove('hide');
                    container.classList.add('background');
                }
              
            }else{
                countError ++
                const audio = document.createElement("audio");
                audio.preload = "auto";
                audio.src = "./incorrecto.mp3";
                audio.play();

                if(countError > 2){
                    errorTitle.innerHTML = 'Llego al limite de errores por favor intente de nuevo'
                    ups.classList.remove('hide');
                    container.classList.add('background');
                }
            }
          
        })
    })
      

}

btn.addEventListener('click', ()=> {
    ups.classList.add('hide');
    container.classList.remove('background');
    location. reload()
})

function getRandomId(max){
    return Math.floor(Math.random()*max)+1;
}



for(let i = 0; i < CARD; i++){
    let id = getRandomId(150)
    serchPokemonById(id)
}
