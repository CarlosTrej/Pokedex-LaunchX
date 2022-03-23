window.onload =()=>{
    Swal.fire('Welcome to the Pokedex, enter in the text field the name of the pokemon to know more about it.')
}
const txtEffect = document.getElementById("effect");
const txtshEffect = document.getElementById("shEffect");
const legend = document.getElementById("legend");
const mystic = document.getElementById("mystic");
let left = document.getElementsByClassName("left");
const rigth = document.getElementsByClassName("rigth");
const pokeName = document.getElementById("pokeName");
let id = 1;
const leftAction = () =>{
    id--;
    if(id <1){
        id=1;
        changePokemon(id);
    }else{
        changePokemon(id);
    }
}
const rigthAction = () =>{
    const pokeInput = pokeName.value.toLowerCase();
    if(id == 1){
        changePokemon(id)
        id++;
    }else{ 
        changePokemon(id)
        id++;
    }  
}
const fetchPokemon = ()=>{
    const pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fecthSpeciePokemon(pokeInput);
    fetch(url).then((res)=>{
        if(res.status != "200"){    
            notPokemon();      
            pokeImage("./img/error.jpg");
            pokeName.value ="Oh no there was a problem, check your pokemon's name.";
            txtEffect.value = "";
            txtshEffect.value = "";
            legend.value = "";
            mystic.value = "";
        }else{
            lookTime();
            return res.json();
        }
        return res.json();
    }).then((data)=>{
        let pokeImg = data.sprites.front_default;
        pokeImage(pokeImg)
        let pokeId = data.id
        fecthAbilittyPokemon(pokeId);
    })
}/* fetchPokemon */
const pokeImage = (url) =>{
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}/* pokeImage */
const fecthAbilittyPokemon = (pokeId)=>{
    const url1 = `https://pokeapi.co/api/v2/ability/${pokeId}/`;
    fetch(url1).then((res)=>{
        return res.json();
    }).then((data)=>{
        if(data.effect_entries.length ==0){
            console.log("unknown information");
        }else{
            txtEffect.value = data.effect_entries[1].effect;
            txtshEffect.value = data.effect_entries[1].short_effect;
        }  
    })
}/* fecthAbilittyPokemon */

const fecthSpeciePokemon = (name)=>{
    const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
   fetch(url).then((res)=>{
    if(res.status != "200"){          
        console.log("unknown information");
    }else{
        return res.json();
    }
    return res.json();
   }).then((data)=>{
    let isLegend = data.is_legendary;
    let isMythical = data.is_mythical; 
    if(isLegend != false){
        legend.value = "Yes";
    }else if(isMythical != false){
        mystic.value = "Yes";
    }else{
        legend.value = "No";
        mystic.value = "No";
    }
   }) 
}/* fecthSpeciePokemon */
const changePokemon = (pokeidDefault)=>{
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeidDefault}`;
    fecthSpeciePokemon(pokeidDefault);
    
    fetch(url).then((res)=>{
        if(res.status != "200"){          
            pokeImage("./img/error.jpg");
        }else{
            return res.json();
        }
        return res.json();
    }).then((data)=>{
        console.log(data.name)
        const pokeName = document.getElementById("pokeName");
        pokeName.value = data.name;
        let pokeImg = data.sprites.front_default;
        pokeImage(pokeImg)
        let pokeId = data.id
        fecthAbilittyPokemon(pokeId);
    })
}
function lookTime(){
    let timerInterval
Swal.fire({
  title: 'Searching pokemon',
  html: 'I will close in <b></b> milliseconds.',
  timer: 1000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
}/* lookTime */
function notPokemon(){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'This Pokemon does not exist, check its name.!',
      })
}/* notPokemon */