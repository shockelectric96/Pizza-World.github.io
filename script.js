const pizzas = [

{
name:"Margherita",
price:8,
image:"images/margherita.jpg"
},

{
name:"Pepperoni",
price:10,
image:"images/pepperoni.jpg"
},

{
name:"Veggie",
price:9,
image:"images/veggie.jpg"
},

{
name:"BBQ Chicken",
price:12,
image:"images/bbq.jpg"
}

];

let cart=[];

const menu=document.getElementById("menuGrid");

pizzas.forEach((pizza,index)=>{

menu.innerHTML+=`

<div class="card">

<img src="${pizza.image}">

<h3>${pizza.name}</h3>

<p>$${pizza.price}</p>

<button onclick="addToCart(${index})">

Add to Cart

</button>

</div>

`;

});

function addToCart(index){

cart.push(pizzas[index]);

updateCart();

}

function updateCart(){

document.getElementById("cartCount").innerText=cart.length;

let items="";

let total=0;

cart.forEach(item=>{

items+=`<p>${item.name} - $${item.price}</p>`;

total+=item.price;

});

document.getElementById("cartItems").innerHTML=items||"Cart is empty";

document.getElementById("cartTotal").innerText=total.toFixed(2);

}

function openCart(){

document.getElementById("cartModal").style.display="block";

}

function closeCart(){

document.getElementById("cartModal").style.display="none";

}

function checkout(){

alert("Thank you for your order!");

cart=[];

updateCart();

closeCart();

}
