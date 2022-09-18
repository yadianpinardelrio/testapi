window.onload = iniciar;
function iniciar(){
//ojo a continuac declaro variables globales    
let codigos = [];
let paises = [];
var btn_LoadApi = document.getElementById("btnLoadApi");
btn_LoadApi.addEventListener("click",clickbtnLoadApi);
Cargarcodigos().then(mostrarcodigos);
Cargarpaises().then(mostrarpaises);
}


//

async function Cargarcodigos(){
    let codigos = await fetch('./codigos.txt');
    //let paises = await fetch('./paises.txt'); 
    return codigos.text();
   }

   async function Cargarpaises(){
    let paises = await fetch('./paises.txt'); 
    return paises.text();
   }  

   
//

function clickbtnLoadApi(){
   
    var name = document.getElementById("txtName"); 
    var txtresultado = document.getElementById("valorbuscado");
    txtresultado.innerHTML= "Searching in internet..";
    CargarJson(name.value).then(mostrarnombre) ;
    

}


async function CargarJson(str)
{
let json =  await Cargarurl("https://api.nationalize.io/?name="
+str);
return json;
} 


async function Cargarurl(url){
 let respuesta = await fetch(url);
  if (!respuesta.ok) {
 alert("Now is impossible catch it..")
 } 
 return respuesta.json();
}



const  buscarCod =  (cod) =>   {

// let pos = codigos.findIndex(index => index == cod);
let pos = 0;
for (var i = 0; i < 249 ; i++ ){
//ojo sino es por el trim este negativo
if (codigos[i].trim() == cod.trim()){
pos = i;}
 
}

if (pos != -1)  {return paises[pos]}  else return cod;
}


function mostrarnombre(n){
var txtresultado = document.getElementById("valorbuscado");
txtresultado.innerHTML= "this name is from "+  buscarCod(n.country[0].country_id);
}



function mostrarcodigos(n){
    codigos = n.split(/\n/);
    }




function mostrarpaises(n){
        paises = n.split(/\n/);
    }