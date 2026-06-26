const pizzas = [
{
name:"Margherita",
price:8,
image:"https://images.unsplash.com/photo-1604382355076-af4b0eb60143"
},
{
name:"Pepperoni",
price:10,
image:"https://images.unsplash.com/photo-1513104890138-7c749659a591"
},
{
name:"Veggie",
price:9,
image:"https://images.unsplash.com/photo-1541745537411-b8046dc6d66c"
},
{
name:"BBQ Chicken",
price:12,
image:"https://images.unsplash.com/photo-1594007654729-407eedc4be65"
}
];

let cart = [];

const menuGrid = document.getElementById("menuGrid");

pizzas.forEach((p,i)=>{
menuGrid.innerHTML += `
<div class="card">
<img src="${p.image}">
<h3>${p.name}</h3>
<p>$${p.price}</p>
<button onclick="addToCart(${i})">Add To Cart</button>
</div>
`;
});

function addToCart(i){
cart.push(pizzas[i]);
updateCart();
}

function updateCart(){
document.getElementById("cartCount").innerText = cart.length;

let html = "";
let total = 0;

cart.forEach(item=>{
html += `<p>${item.name} - $${item.price}</p>`;
total += item.price;
});

document.getElementById("cartItems").innerHTML = html || "Cart empty";
document.getElementById("cartTotal").innerText = total;
}

function openCart(){
document.getElementById("cartModal").style.display="block";
}

function closeCart(){
document.getElementById("cartModal").style.display="none";
}

function checkout(){
alert("Order placed successfully 🍕");
cart = [];
updateCart();
closeCart();
}

function scrollToSection(id){
document.getElementById(id).scrollIntoView({behavior:"smooth"});
}
