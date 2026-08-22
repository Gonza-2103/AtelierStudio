console.log("script conectado")

//Métodos para declarar variables (se debe poner el punto y coma para tener idea donde termina la linea)
var numero = 45; //Int
let nombre = "Gonza";
const pi = 3.14159; //Float

//Tipos de datos en JavaScript (5)
//Número
//Cadena (string)
let flag = true; //Booleano
let dato = null; //
let resultado; 


//Operaciones lógicas
//Suma (+)
//Resta (-)
//Multiplicación (*)
//División (/)


//Comparadores lógicos
//Mayor 
//Menor 
//Mayor o igual, 
//Igual, 
//Distinto a
//Para verificar el tipo de dato exacto (>== <== === !==)

//!(not) 
//&&(y) 
//||(o)

//isNaN(is Not a Number)

//Condicionales
const edad = 27;

if(edad <= 18){
    console.log("Menor de edad");
} else {
    console.log("Mayor de edad");
}

for(let i = 0; i <= 5; i++){
    console.log(i)
}


/*function mifuncion(nombre){
    console.log("Hola" + nombre + "desde la función")
}*/

/*const saludar = function(nombre){
    console.log("Hola" + nombre + "desde la función")
};*/

//Función 'arrow'
const saludar = (nombre) => {
    console.log("Hola" + nombre + "desde la función")
};

const calculo = (nombre, precio, tipo_cliente) => {
    
}