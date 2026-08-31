let discount = 0;


function addToCart(name, price) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: Number(price),
        quantity: 1
    });

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(name + " added to cart!");
}


function updateCartCount() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;

    cart.forEach(function(item) {

        count += Number(item.quantity) || 1;

    });

    let cartCount =
        document.getElementById("cartCount");

    if (cartCount) {
        cartCount.innerText = count;
    }
}


function loadCart() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let table =
        document.getElementById("cartTable");

    if (!table) {
        return;
    }

    let total = 0;


    table.innerHTML = `
        <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
        </tr>
    `;


    if (cart.length === 0) {

        table.innerHTML += `
            <tr>
                <td colspan="5">

                    <div class="empty-cart">

                        <div class="empty-icon">
                            🛒
                        </div>

                        <h2>
                            Your Cart is Empty
                        </h2>

                        <p>
                            Looks like you haven't
                            added anything yet.
                        </p>

                        <button
                            class="shop-btn"
                            onclick="continueShopping()">

                            Browse Menu

                        </button>

                    </div>

                </td>
            </tr>
        `;

        document.getElementById("total").innerText =
            "Items Total: ₹0";

        document.getElementById("itemsTotal").innerText =
            "₹0";

        document.getElementById("deliveryFee").innerText =
            "₹0";

        document.getElementById("discountAmount").innerText =
            "₹0";

        document.getElementById("grandTotal").innerText =
            "₹0";

        updateCartCount();

        return;
    }


    cart.forEach(function(item, index) {

        let quantity =
            Number(item.quantity) || 1;

        let price =
            Number(item.price) || 0;

        let subtotal =
            price * quantity;

        total += subtotal;


        let row =
            table.insertRow();


        row.insertCell(0).innerText =
            item.name;

        row.insertCell(1).innerText =
            "₹" + price;


        let quantityCell =
            row.insertCell(2);


        quantityCell.innerHTML = `
            <div class="quantity-control">

                <button
                    onclick="decreaseQuantity(${index})">
                    −
                </button>

                <span>
                    ${quantity}
                </span>

                <button
                    onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>
        `;


        row.insertCell(3).innerText =
            "₹" + subtotal;


        let actionCell =
            row.insertCell(4);


        actionCell.innerHTML = `
            <button
                class="remove-btn"
                onclick="removeItem(${index})">

                Remove

            </button>
        `;

    });


    let deliveryFee = 0;

    if (total > 0 && total < 500) {
        deliveryFee = 40;
    }


    let discountAmount =
        total * discount / 100;


    let grandTotal =
        total + deliveryFee - discountAmount;


    document.getElementById("total").innerText =
        "Items Total: ₹" + total;

    document.getElementById("itemsTotal").innerText =
        "₹" + total;

    document.getElementById("deliveryFee").innerText =
        deliveryFee === 0
            ? "FREE"
            : "₹" + deliveryFee;

    document.getElementById("discountAmount").innerText =
        "-₹" + discountAmount.toFixed(0);

    document.getElementById("grandTotal").innerText =
        "₹" + grandTotal.toFixed(0);


    updateCartCount();
}


function applyCoupon() {

    let input =
        document.getElementById("couponInput");

    let message =
        document.getElementById("couponMessage");

    let coupon =
        input.value.trim().toUpperCase();


    if (coupon === "FOOD10") {

        discount = 10;

        message.innerText =
            "Coupon applied! You saved 10% 🎉";

    } else {

        discount = 0;

        message.innerText =
            "Invalid coupon code.";

    }


    loadCart();
}


function increaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart[index]) {
        return;
    }

    cart[index].quantity =
        (Number(cart[index].quantity) || 1) + 1;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}


function decreaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart[index]) {
        return;
    }

    let quantity =
        Number(cart[index].quantity) || 1;


    if (quantity > 1) {

        cart[index].quantity =
            quantity - 1;

    } else {

        cart.splice(index, 1);

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}


function removeItem(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    loadCart();
}


function clearCart() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert(
            "Your cart is already empty!"
        );

        return;
    }


    if (
        confirm(
            "Are you sure you want to clear your cart?"
        )
    ) {

        localStorage.removeItem("cart");

        discount = 0;

        loadCart();

        updateCartCount();

        alert(
            "Cart cleared successfully!"
        );

    }
}


function continueShopping() {

    window.location.href =
        "menu.html";
}


function placeOrder() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Add some items first!"
        );

        return;
    }

    window.location.href =
        "order.html";
}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        loadCart();

    }
);