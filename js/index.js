let pagina = 1;

let cita ={
  nombre:"",
  fecha:"",
  hora:"",
  servicios :[]
}

document.addEventListener("DOMContentLoaded", function () {
  iniciarapp();
});

function iniciarapp() {
  //muestra los servicios
  mostrarServicios();

  // muestra la seccion  o la quita
  mostrarSeccion();

  // oculta o mustra una seecion segun el div que seleccionemos
  cambiarSeccion();

  // paginasiion siguiente y anterior
  paginaSiguiente()
  paginaAnterior()

  // funcion muestra  error en resumen
  mostrarResumen()

  nombrecapturar()

  // alamcena la fecha de cita en el objeto
  almacenaFecha()

  // desabilitar fechas pasadas
  desabilitaFechaAnterior();

  almacenarHoras()

}

function cambiarSeccion() {
  const botontabs = document.querySelectorAll('.tabs button');

  botontabs.forEach((enlace) => {
    enlace.addEventListener("click", function (evento) {
      evento.preventDefault();
      pagina = parseInt(evento.target.dataset.paso);

 

   // llamar la funcion de mostrar seccion
   mostrarSeccion();
   
    });
  });
}


function mostrarSeccion() {

   // eliminar mostrar seccion de la seccion anterior
   const seccionAnteriorExiste = document.querySelector(".mostrar_seccion")

   if(seccionAnteriorExiste){
       seccionAnteriorExiste.classList.remove("mostrar_seccion");
   }

     // resalta el boton actual
     const paginaSeleccionada = document.querySelector(`#paso_${pagina}`);
     paginaSeleccionada.classList.add("mostrar_seccion");



// eliminar la clase actual del tab o bnt  anterior
const tabAnterior = document.querySelector(".tabs .actual")
if(tabAnterior){
  tabAnterior.classList.remove("actual");
}

const tab = document.querySelector(`[data-paso="${pagina}"]`);
tab.classList.add("actual");



}







// se crea una funcion asyncrona
async function mostrarServicios() {
  // se crea un try cacth para el amnejo de errors
  try {
    // se crea una variable para traer el objeto .json con fetch y fetch utiliza await
    const resultado = await fetch("./servicios.json");
    // se crea variable para  decile que es un json
    const basedatos = await resultado.json();

    // se destructura el array de abjetos
    const { servicios } = basedatos;

    // genrerar el html  iterando cada uno de los elementos para cojer el valor e insertarlo en html

    servicios.forEach((element) => {
      const { id, nombre, precio } = element;

      // genrerar dom scrpting

      // se crean los parrafos y se le agrega el  cntenido del arrray de objetos
      const nombreServicio = document.createElement("p");
      nombreServicio.textContent = `${nombre}`;

      const nombreprecio = document.createElement("p");
      nombreprecio.textContent = `$ ${precio}`;

      const nombreid = document.createElement("p");
      nombreid.textContent = `${id}`;

      // se crea un div para meter los parrafos
      const divhijo = document.createElement("div");
      // seleciona el div que le demos click

      divhijo.onclick = seleccionarServicio;
      divhijo.dataset.idservicio = id;

      // se meten los parrafos en el div
      divhijo.appendChild(nombreServicio);
      divhijo.appendChild(nombreprecio);

      // se obtiene el div de html ya creado  y se le agrega el div anterioor
      const divhtml = document.querySelector(".listado_servicios");
      divhtml.appendChild(divhijo);

      // se agregan clases
      nombreprecio.classList.add("precio");
      divhijo.classList.add("servicios");
    });
  } catch (error) {
    console.log(error);
  }
}

function seleccionarServicio(e) {
  //  const id = e.target.dataset.idservicio;
  //  console.log(e.target.tagName)
  let elemento;
  if (e.target.tagName == "P") {
    elemento = e.target.parentElement;
  } else {
    elemento = e.target;
   
  }

  if (elemento.classList.contains("seleccionado")) {
    elemento.classList.remove("seleccionado");
    
    const id = parseInt(elemento.dataset.idservicio);
     
    eliminarServicio(id)
  } else {
    elemento.classList.add("seleccionado");
    
    const servicioObejet ={
      id : parseInt(elemento.dataset.idservicio),
      nombre: elemento.firstElementChild.textContent,
      precio:elemento.firstElementChild.nextElementSibling.textContent
   }
  //  console.log(servicioObejet)
    agregarServicio(servicioObejet)
  }
}



function eliminarServicio(id){
  
  const { servicios } = cita;

  cita.servicios = servicios.filter( servicio => servicio.id !== id);
  console.log(cita);
}

function agregarServicio( obetitoservicioObejet){
  
  const { servicios } = cita;

  cita.servicios = [...servicios, obetitoservicioObejet];
  console.log(cita)
}





function paginaSiguiente() {
  const btbSiguiente = document.querySelector("#siguiente");

  btbSiguiente.addEventListener("click", () => {
    pagina++;
    botonesPaginador()
    console.log(pagina);
  });
}

function paginaAnterior() {
  const btnAnterior = document.querySelector("#anterior");
  btnAnterior.addEventListener("click", function () {
    pagina--;
    botonesPaginador()
  });
}

function botonesPaginador() {
  const bntAnterior = document.querySelector("#anterior");
  const bntSiguiente = document.querySelector("#siguiente");

  if(pagina === 1){
      bntAnterior.classList.add("ocultar");
      bntSiguiente.classList.remove("ocultar");
  }
  else if(pagina === 3){
      bntSiguiente.classList.add("ocultar");
      bntAnterior.classList.remove("ocultar");
      mostrarResumen();
      
  }
  else{
      bntAnterior.classList.remove("ocultar");
      bntSiguiente.classList.remove("ocultar");
  }
  mostrarSeccion();// Cambia la sección que se muestra por la de la página
}



function mostrarResumen(){
 
  // destructuracion
    const {nombre, fecha, hora, servicios }  = cita;
   
    // obtener elemento del dom
    const divResumen = document.querySelector(".contenido__resumen");
    divResumen.classList.add("divresumen")
    // quitar el html error
    while(divResumen.firstChild){
     divResumen.removeChild(divResumen.firstChild);
    }
  // validacion

  if( Object.values(cita).includes("")){
    
    // imprimir en html mensaje
    const parrafoError = document.createElement("p");
    parrafoError.textContent = "Faltan datos. favor validar";
    parrafoError.classList.add("parrafoerror");

    divResumen.appendChild(parrafoError)
    console.log("faltan datos")
  }
  else{
   
    // TITULO DE DATOS CITA
    const resumenCita = document.createElement("h3");
    resumenCita.textContent ="Resumen de cita";
    divResumen.appendChild(resumenCita);

    // nombre
    const  nombreCita = document.createElement("p");
    nombreCita.innerHTML = `
    <span class="span_resumen">Nombre:  </span>  ${nombre} <br>
       `
    divResumen.appendChild(nombreCita)

    // fecha
    const  nombreFecha = document.createElement("p");
    nombreFecha.innerHTML = `
       <span class="span_resumen">Fecha:  </span>  ${fecha}  <br>
              `
    divResumen.appendChild(nombreFecha)


    // hora
    const  nombreHora = document.createElement("p");
    nombreHora.innerHTML = `
         <span class="span_resumen">Hora:  </span> ${hora}  <br>
           `
    divResumen.appendChild(nombreHora)
   // TITULO DE RESUMEN
    const resumenServicios = document.createElement("h3");
    resumenServicios.textContent ="Resumen de servicios";
    divResumen.appendChild(resumenServicios);

 let cantidad = 0;

    // servicios
    servicios.forEach( (servicio) =>{
      const {nombre, precio} = servicio;
    
     const contenedorServicio = document.createElement("div");
      contenedorServicio.classList.add("contenedor_servicio");

      const textoServicio = document.createElement("p");
      textoServicio.textContent = nombre;

      const precioServicio = document.createElement("p");
      precioServicio.classList.add("precio")
      precioServicio.textContent = precio;

      const totalServicios = precio.split("$");
      cantidad += parseInt( totalServicios[1].trim() )

      // colocar el texto en el div

      contenedorServicio.appendChild(textoServicio)
      contenedorServicio.appendChild(precioServicio)
 
      const divresumen = document.querySelector(".contenido__resumen");
      divresumen.classList.add("divresumen");
      divresumen.appendChild(contenedorServicio);
     
     
    
    }
   
    )
    const divresumen = document.querySelector(".contenido__resumen");
    divresumen.classList.add("divresumen");
    const totalApagar = document.createElement("p");
    totalApagar.textContent = `Total a pagar: $ ${cantidad}`;
    totalApagar.classList.add("totalapagar")
    divresumen.appendChild(totalApagar)

    
  }

}



  // capturar nombre 


function nombrecapturar(){

  const nombreInput =  document.querySelector("#nombre");

  nombreInput.addEventListener("input", (e) =>{

    nombreTexto = e.target.value.trim();

    if(nombreTexto === "" || nombreTexto.length < 3 ){
      mostrarAlerta("el nombre no es valido","error")
    }

    else{
      const alerta = document.querySelector(".alerta")
      if(alerta){
        alerta.remove();
      }
      cita.nombre = nombreTexto;
      console.log(cita)
    }
  
  })

}

function mostrarAlerta(mensaje,tipo){
// si ha una alerta previa no crear otra

const alertaPrevia = document.querySelector(".alerta");

if(alertaPrevia){
  return;
}

 const alerta = document.createElement("div");
 alerta.textContent = mensaje;

 alerta.classList.add("alerta");

 if(tipo === "error"){
  alerta.classList.add("error");
 }

 // insertar en el html

 const formulario = document.querySelector(".formulario");
 formulario.appendChild(alerta);
  console.log(alerta)

  setTimeout(() => {
    alerta.remove()
  }, 3000);

}



function almacenaFecha(){

  const inputFecha = document.querySelector("#fecha");

  inputFecha.addEventListener("input", (e)=>{
    console.log(e.target.value);

    const dia = new Date(e.target.value).getUTCDay();
    if([0].includes(dia)){
      e.preventDefault();
      e.target.value ="";
      mostrarAlerta("lo sentimos este dia no laboramos","error")
    }
    else{
      cita.fecha = inputFecha.value;

    }
    console.log(cita)
  })
}


function desabilitaFechaAnterior(){
    const inputFecha = document.querySelector("#fecha");

        const fechaAhora = new Date();
        const year = fechaAhora.getFullYear();
        const mes = fechaAhora.getMonth() +1;
        const dia  = fechaAhora.getDate();

    // formato deseado AAAA-MM-DD

    const fechaDeshabilitar  = `${year}-${mes}-${dia}`
    console.log(fechaDeshabilitar)
    // deshablitar fechas anteriores

    inputFecha.min = fechaDeshabilitar;
}


function almacenarHoras(){

  const inputHora = document.querySelector("#hora");

 
  inputHora.addEventListener("input", (e) =>{
   
   const horacita = inputHora.value;
   const hora = horacita.split(":");

   if(hora[0] < 8 || hora[0] > 18){
    mostrarAlerta("hora no validas","error");
    setTimeout(() => {
       inputHora.value = "";
    }, 3000);
   }
   else{
    cita.hora = horacita;
    console.log(cita)
   }

   console.log(hora)
    // cita.hora = horacita;
  })
 
}