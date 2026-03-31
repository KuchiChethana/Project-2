function addToCart(name, price){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({name, price});

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount(); 

    alert(name + " added to cart!");
}

function updateCartCount(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = cart.length;

    let cartCount = document.getElementById("cartCount");
    if(cartCount){
        cartCount.innerText = count;
    }
}

function loadCart(){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let table = document.getElementById("cartTable");
    let total = 0;

    table.innerHTML = `
        <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Action</th>
        </tr>
    `;

    cart.forEach((item, index)=>{
        let row = table.insertRow();

        row.insertCell(0).innerText = item.name;
        row.insertCell(1).innerText = "₹" + item.price;

        let removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.onclick = function(){
            removeItem(index);
        };

        row.insertCell(2).appendChild(removeBtn);

        total += item.price;
    });

    let totalDisplay = document.getElementById("total");
    if(totalDisplay){
        totalDisplay.innerText = "Total: ₹" + total;
    }
}
function removeItem(index){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();        
    updateCartCount(); 
}

function placeOrder(){
    window.location.href = "order.html";
}

function clearCart(){
    localStorage.removeItem("cart");
}

document.addEventListener("DOMContentLoaded", function(){
    updateCartCount();
    if(document.getElementById("cartTable")){
        loadCart();
    }
});