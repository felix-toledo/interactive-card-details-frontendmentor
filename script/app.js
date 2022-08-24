class tarjeta{
    constructor(number, name, cvc, month, year, times){
        this.number = number;
        this.name = name;
        this.cvc = cvc;
        this.month = month;
        this.year = year;
        this.times = times;
    }
}
let tarjetas = [];

if(localStorage.getItem("tarjetas")){
    tarjetas = JSON.parse(localStorage.getItem("tarjetas"))
    console.log(tarjetas)
}else{
    console.log(`primera vez que carga tarjetas`)
    localStorage.setItem("tarjetas", JSON.stringify(tarjetas))
}

let inputName = document.getElementById("name");
let inputNumber = document.getElementById("cardNumber");
let inputMonth = document.getElementById("MM");
let inputYear = document.getElementById("YY");
let inputCVC = document.getElementById("cvc");
let contTarjetasGuard = document.getElementById("contenedorTarjetasGuardadas");
let success = document.getElementById("completeAdded");
let botonCont = document.getElementById("btnCont");
let botonVerT = document.getElementById("verTarjetas");
let boton = document.getElementById("btnConf");
let spaceName = document.getElementById("inCardName");
let spaceNumber = document.getElementById("inCardNumber");
let spaceExpDate = document.getElementById("inCardExpDate");
let spaceCVC = document.getElementById("inCardCVC");

inputName.addEventListener("input", ()=>{inputChanged()});
inputNumber.addEventListener("input", ()=>{inputChanged()});
inputMonth.addEventListener("input", ()=>{inputChanged()});
inputYear.addEventListener("input", ()=>{inputChanged()});
inputCVC.addEventListener("input", ()=>{inputChanged()});
boton.addEventListener("click", (event)=> {guardarTarjeta(event)});
botonCont.addEventListener("click", ()=> {success.setAttribute("class", "succesAdded_no")});
botonVerT.addEventListener("click", ()=> {verTarjetas("si")});

function inputChanged(){
    spaceName.innerHTML = `<span class="inCardName" id="inCardName">${inputName.value.toUpperCase()}</span> `
    if (inputName.value == ""){
        spaceName.innerHTML = ` <span class="inCardName" id="inCardName">FELIX TOLEDO</span> `
    }

    spaceNumber.innerHTML = `<p class="inCardNumber" id="inCardNumber">${inputNumber.value}</p>`
    if (inputNumber.value == ""){
        spaceNumber.innerHTML = `<p class="inCardNumber" id="inCardNumber">0000 0000 0000 0000</p>`
    }

    spaceExpDate.innerHTML = `<span class="inCardExpDate" id="inCardExpDate">${inputMonth.value}/${inputYear.value}</span>`
    if (inputMonth.value == "" && inputYear.value == ""){
        spaceExpDate.innerHTML = `<span class="inCardExpDate" id="inCardExpDate">00/00</span>`
    }

    spaceCVC.innerHTML = `<p class="inCardCVC" id="inCardCVC">${inputCVC.value}</p>`
    if (inputCVC == ""){
        spaceCVC.innerHTML = `<p class="inCardCVC" id="inCardCVC">000</p>`
    }
}

function guardarTarjeta(event){
    event.preventDefault()
    if(inputCVC == "" || inputMonth.value == "" || inputYear.value == "" || inputNumber.value == "" || inputName.value == ""){
        //alerta de la libreria Sweet Alert .
        //Added sweet alert action.
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Al parecer no completaste todos los datos importantes!',
          })
    } else {
        tarjetas.push(new tarjeta(inputNumber.value, inputName.value, inputCVC.value, inputMonth.value, inputYear.value, 0));
        //alerta de la libreria Sweet Alert .
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Tu tarjeta fue grabada correctamente!',
            showConfirmButton: true,
          })
        limpiarDatos();
    }
}

function verTarjetas(param){
    if(param == "si"){
        contTarjetasGuard.setAttribute("class", "contenedorTarjetasGuardadas");
        botonVerT.addEventListener("click", ()=> {verTarjetas("no");});
        mostrarTarjetas();
    } else {
        contTarjetasGuard.setAttribute("class", "contenedorTarjetasGuardadas_no");
        botonVerT.addEventListener("click", ()=> {verTarjetas("si");});
    }
}

function mostrarTarjetas(){
    contTarjetasGuard.innerHTML= "";
    tarjetas.forEach((tarjet)=>{
        console.log(tarjet)
        let {number, name} = tarjet;
        let nuevaTarjeta = document.createElement("div");
        nuevaTarjeta.innerHTML = `    <div class="tarjetaGuardada" id="${number.substr(number.length - 4)}"><span>${number.substr(number.length - 4)}</span><p>${name}</p></div>`
        contTarjetasGuard.appendChild(nuevaTarjeta)
        let btnUsar = document.getElementById(`${number.substr(number.length - 4)}`)
        btnUsar.addEventListener("click", () =>{usar(tarjet)});
        })
}

function usar(tarjet){
    console.log(tarjet)
    let {number, name, cvc, month, year} = tarjet;
    spaceName.innerHTML = `<span class="inCardName" id="inCardName">${name.toUpperCase()}</span> `
    spaceNumber.innerHTML = `<p class="inCardNumber" id="inCardNumber">${number}</p>`
    spaceExpDate.innerHTML = `<span class="inCardExpDate" id="inCardExpDate">${month}/${year}</span>`
    spaceCVC.innerHTML = `<p class="inCardCVC" id="inCardCVC">${cvc}</p>`
}

function limpiarDatos(){
    inputName.value = "";
    inputNumber.value = "";
    inputMonth.value = "";
    inputYear.value = "";
    inputCVC.value = "";
}