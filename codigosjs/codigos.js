let carrito =[] ; 
 //JSON.parse(localStorage.getItem("carrito"))||[];
let dolarVenta;
let lista

// if(localStorage.getItem("carrito")!=null){
//     carrito=JSON.parse(localStorage.getItem("carrito"));
// }

    
window.onload=()=>{
   lista=document.getElementById("listaProductos");
    document.getElementById("fila_prueba").style.background="rgb(54, 66, 123)";
    obtenerValorDolar();
    document.getElementById("miOrden").setAttribute("option", "pordefecto");
    document.getElementById("miOrden").onchange=()=>ordenar();
};


//mostrar productos


function mostrarProductos() {
    for (const producto of arrProductos) {
        lista.innerHTML+=`<li class="col-sm-3 row  list-group-item-horizontal class="lista_ligas_bootstrap_lateral list-group">
        <h3> Codigo: ${producto.codigo} </h3>
        <img src=${producto.foto}  width="250" height="250" >
        <p> Producto: ${producto.nombre}</p>
        <td id='${producto.id}'> ${producto.cantidad}</td>
        <p><strong> $ ${producto.precio} </strong></p>
        <p><strong>Precio U$ ${(producto.precio/dolarVenta).toFixed(1)}</strong></p>
        <button class='btn btn-danger' id='btn${producto.codigo}'>Comprar</button>
        </li>`;
    }
    arrProductos.forEach(producto=>{
        document.getElementById(`btn${producto.codigo}`).addEventListener('click',function(){
            agregarAlCarrito(producto);
            

        });
    });

}

function agregarAlCarrito(productoNuevo){
    carrito.push(productoNuevo);
    console.log(carrito);
    //alert("Producto: "+productoNuevo.nombre+" agregado al carro!!!");
    Swal.fire({
        title: "Producto: " + productoNuevo.nombre,
        text: 'Agregado con exito al carrito.',
        imageUrl: productoNuevo.foto,
        imageWidth: 250,
        imageHeight: 200,
        imageAlt: 'Custom image',
        timer: 2200,
        position: 'top',
        width: 600,
        color: '#716add',
        showConfirmButton: false,
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  }
      });
    document.getElementById("tablaCarrito").innerHTML+=(`
        <tr>
            <td><img src=${productoNuevo.foto} width="100" height="100"></td>
            <td>${productoNuevo.codigo}</td>
            <td>${productoNuevo.nombre}</td>
            <td>${productoNuevo.precio}</td>
            <td> <button class='btn btn-light' onclick='eliminar(${productoNuevo.codigo})'>🗑️</button>
            
        </tr>
        `);
 
       
    localStorage.setItem("carrito",JSON.stringify(carrito));
    
    const totalcompra = carrito.map(el => el.precio);
    const totall=totalcompra.reduce((prev, curr) => prev + curr, 0);
    console.log(totall);
    let iva=totall*0.21;
    console.log(iva);
    let totalPagar=totall+iva;
    console.log(totalPagar);
    let totalDescuento=document.getElementById("desc");
    let pagoConDescuent=document.getElementById("totDesc");
    let preMonto=document.getElementById("subTotal");
    preMonto.innerHTML="Subtotal de la compra: $"+totall;

    let ivas=document.getElementById("ivas");
    ivas.innerHTML="IVA: $"+iva;

    // let total=document.getElementById("total");
    // total.innerHTML="Total a pagar: $"+totalPagar
   
    
    let total=document.getElementById("total");
    let descuento=totall*0.15;
    let totalConDescuento=totalPagar-descuento;
  
    if (totalPagar>=30000){
        totalDescuento.innerHTML="Descuento: $"+ descuento;
        pagoConDescuent.innerHTML="A pagar con descuento: $"+ totalConDescuento;
        total.innerHTML="";
    }else{
        totalDescuento.innerHTML="";
        pagoConDescuent.innerHTML="";
        total.innerHTML="Total a pagar:$" + totalPagar;
    }

//totalPagar >= 50000 ? alert ("tenes un regalo sorpres ") : alert ("sigue agregando productos para regalo sorpresa");
if (totalPagar>= 50000) { 
    
Swal.fire({
    title: "Producto: " + productoNuevo.nombre + "Agregado al carrito",
    text: 'Tienes un regalo sorpresa',
    imageUrl: productoNuevo.foto,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
  })
}
}
function calcularTotal() {
    let suma = 0;
    for (const elemento of carrito) {
        suma = suma + elemento.precio ;
    }
    return suma;
    console.log(suma);
}
calcularTotal();
function eliminar(codigo){
    let indice=carrito.findIndex(producto => producto.codigo==codigo);
    carrito.splice(indice,1);//eliminando del carro
    let fila=document.getElementById(`fila${codigo}`);
    document.getElementById("tablaCarrito").deleteRow(fila);//eliminando de la tabla
    document.getElementById("subTotal").innerText=(`Total: $ ${calcularTotal()}`);
   // localStorage.setItem("carrito",JSON.stringify(carrito));
}

function ordenar () {
    let seleccion = document.getElementById("miOrden").value;
    console.log(seleccion)
    if (seleccion == "menor") {
        arrProductos.sort(function(a, b) {
            return a.precio - b.precio
        });
    } else if (seleccion == "mayor") {
        arrProductos.sort(function(a, b) {
            return b.precio - a.precio
        });
    } 
    lista.innerHTML="";
    mostrarProductos();
}
async function obtenerValorDolar() {
    const URLDOLAR = "https://api-dolar-argentina.herokuapp.com/api/dolarblue";
    const resp=await fetch(URLDOLAR)
    const data=await resp.json()
    document.getElementById("fila_prueba").innerHTML+=(`<p align="center">Dolar compra: $ ${data.compra}  Dolar venta: $ ${data.venta}</p>`);
    dolarVenta = data.venta;
    mostrarProductos();
};
console.log(dolarVenta)