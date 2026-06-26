
// Pizza Menu Data
const pizzaMenu = [
    {
        id: 1,
        name: "Margherita",
        desc: "Classic pizza with tomato, mozzarella, and basil",
        basePrice: 12.99,
        image: "🍕"
    },
    {
        id: 2,
        name: "Pepperoni",
        desc: "Loaded with fresh pepperoni slices",
        basePrice: 14.99,
        image: "🍕"
    },
    {
        id: 3,
        name: "Vegetarian",
        desc: "Fresh vegetables, mushrooms, and olives",
        basePrice: 13.99,
        image: "🍕"
    },
    {
        id: 4,
        name: "Meat Lovers",
        desc: "Pepperoni, sausage, bacon, and ham",
        basePrice: 16.99,
        image: "🍕"
    },
    {
        id: 5,
        name: "BBQ Chicken",
        desc: "Grilled chicken, BBQ sauce, and red onions",
        basePrice: 15.99,
        image: "🍕"
    },
    {
        id: 6,
        name: "Hawaiian",
        desc: "Ham and pineapple with mozzarella",
        basePrice: 14.99,
        image: "🍕"
    }
];

const sizes = {
    small: { label: 'Small (10")', multiplier: 1 },
    medium: { label: 'Medium (12")', multiplier: 1.3 },
    large: { label: 'Large (14")', multiplier: 1.6 },
    xlarge: { label: 'X-Large (16")', multiplier: 1.9 }
};

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    renderMenu();
});

function renderMenu() {

    const menuGrid = document.getElementById("menuGrid");

    menuGrid.innerHTML = pizzaMenu.map(pizza => `

        <div class="pizza-card">

            <div class="pizza-image">${pizza.image}</div>

            <div class="pizza-info">

                <div class="pizza-name">${pizza.name}</div>

                <div class="pizza-desc">${pizza.desc}</div>

                <div class="pizza-price">$${pizza.basePrice.toFixed(2)}</div>

                <select class="size-select" id="size-${pizza.id}">

                    ${Object.entries(sizes).map(([key,size])=>

                    `<option value="${key}">${size.label}</option>`

                    ).join("")}

                </select>

                <button class="add-to-cart-btn" onclick="addToCart(${pizza.id})">

                Add to Cart

                </button>

            </div>

        </div>

    `).join("");

}

function addToCart(id){

    const pizza = pizzaMenu.find(p=>p.id===id);

    const selectedSize=document.getElementById(`size-${id}`).value;

    const size=sizes[selectedSize];

    const price=(pizza.basePrice*size.multiplier);

    cart.push({

        name:pizza.name,

        size:size.label,

        price:price

    });

    updateCartCount();

    showToast(`${pizza.name} added to cart`);

}

function updateCartCount(){

    document.getElementById("cartCount").textContent=cart.length;

}

function openCart(){

    document.getElementById("cartModal").style.display="block";

    renderCart();

}

function closeCart(){

    document.getElementById("cartModal").style.display="none";

    document.getElementById("orderForm").style.display="none";

    document.getElementById("checkoutBtn").style.display="block";

    document.getElementById("submitBtn").style.display="none";

}

function renderCart(){

    const cartItems=document.getElementById("cartItems");

    const totalContainer=document.getElementById("cartTotalContainer");

    if(cart.length===0){

        cartItems.innerHTML='<div class="cart-empty">Your cart is empty</div>';

        totalContainer.style.display="none";

        return;

    }

    let total=0;

    cartItems.innerHTML=cart.map((item,index)=>{

        total+=item.price;

        return `

        <div class="cart-item">

            <div class="cart-item-info">

                <div class="cart-item-name">${item.name}</div>

                <div class="cart-item-size">${item.size}</div>

            </div>

            <div class="cart-item-price">$${item.price.toFixed(2)}</div>

            <button class="remove-btn"

            onclick="removeFromCart(${index})">

            Remove

            </button>

        </div>

        `;

    }).join("");

    document.getElementById("cartTotal").textContent=total.toFixed(2);

    totalContainer.style.display="block";

}

function removeFromCart(index){

    cart.splice(index,1);

    updateCartCount();

    renderCart();

}

function toggleOrderForm(){

    document.getElementById("orderForm").style.display="block";

    document.getElementById("checkoutBtn").style.display="none";

    document.getElementById("submitBtn").style.display="block";

}

function submitOrder(){

    const name=document.getElementById("customerName").value.trim();

    const phone=document.getElementById("customerPhone").value.trim();

    const address=document.getElementById("customerAddress").value.trim();

    if(!name||!phone||!address){

        alert("Please fill all required fields.");

        return;

    }

    alert("🎉 Thank you for your order!");

    cart=[];

    updateCartCount();

    renderCart();

    closeCart();

    document.getElementById("customerName").value="";

    document.getElementById("customerPhone").value="";

    document.getElementById("customerAddress").value="";

    document.getElementById("specialInstructions").value="";

}

function scrollToSection(id){

    document.getElementById(id).scrollIntoView({

        behavior:"smooth"

    });

}

window.onclick=function(e){

    const modal=document.getElementById("cartModal");

    if(e.target===modal){

        closeCart();

    }

};

function showToast(message){

    const toast=document.createElement("div");

    toast.innerHTML=message;

    toast.style.position="fixed";

    toast.style.bottom="30px";

    toast.style.right="30px";

    toast.style.background="#4CAF50";

    toast.style.color="#fff";

    toast.style.padding="15px 25px";

    toast.style.borderRadius="8px";

    toast.style.boxShadow="0 5px 15px rgba(0,0,0,.3)";

    toast.style.zIndex="9999";

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },2000);

}
