


document.addEventListener("DOMContentLoaded", function(){
    añadirobjets();
})


async function añadirobjets(){

try {
    
const resultado1 =  await fetch("./servicios.json");
const data = await resultado1.json();

const { servicios } = data ;
// console.log( servicios);

servicios.forEach(element => {
   const { nombre, id, precio,imagen } = element;
   console.log(imagen)

   const nombreServicio = document.createElement("img");
   nombreServicio.src = (`${imagen}`);

   const divhtml = document.querySelector(".listado_servicios");
   divhtml.appendChild(nombreServicio);


   console.log(nombreServicio)
});


} catch (error) {
    console.log(error)
}
  
}