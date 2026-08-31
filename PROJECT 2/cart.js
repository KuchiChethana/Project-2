function addToCart(name, price) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    price = Number(price);

    cart.push({
        name: name,
        price: price,
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

    cart.forEach(function (item) {

        count +=
            Number(item.quantity) || 1;

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

    let total = 0;

    let totalQuantity = 0;


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
                    <p class="empty">
                        Your cart is empty 😔
                    </p>
                </td>
            </tr>
        `;

        document.getElementById("total").innerText =
            "Total: ₹0";

        document.getElementById("cartItemSummary").innerText =
            "0 items in your cart";

        updateCartCount();

        return;
    }


    cart.forEach(function (item, index) {

        let quantity =
            Number(item.quantity) || 1;

        let price =
            Number(item.price);

        let subtotal =
            price * quantity;


        total += subtotal;

        totalQuantity += quantity;


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

                <span class="quantity">
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


    document.getElementById("total").innerText =
        "Total: ₹" + total;


    /* Contribution #7 */
    document.getElementById("cartItemSummary").innerText =
        totalQuantity + " item(s) in your cart";


    updateCartCount();
}


function increaseQuantity(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (cart[index]) {

        cart[index].quantity =
            (Number(cart[index].quantity) || 1) + 1;

    }


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

    updateCartCount();
}


function clearCart() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (cart.length === 0) {

        alert("Your cart is already empty!");

        return;
    }


    let confirmClear =
        confirm(
            "Are you sure you want to clear your cart?"
        );


    if (confirmClear) {

        localStorage.removeItem("cart");

        loadCart();

        updateCartCount();

        alert("Cart cleared successfully!");

    }
}

function placeOrder() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add food items first."
        );

        return;
    }


    let totalQuantity = 0;


    cart.forEach(function(item) {

        totalQuantity +=
            Number(item.quantity) || 1;

    });


    if (totalQuantity <= 0) {

        alert(
            "Please add at least one item."
        );

        return;
    }


    let confirmed =
        confirm(
            "Are you ready to place your order?"
        );


    if (confirmed) {

        window.location.href =
            "order.html";

    }

}


function continueShopping() {

    window.location.href =
        "menu.html";
}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        if (
            document.getElementById("cartTable")
        ) {

            loadCart();

        }

    }
);