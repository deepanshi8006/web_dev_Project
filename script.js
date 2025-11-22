let search = document.querySelector(".search-box");

document.querySelector("#search-icon").onclick = () => {
    search.classList.toggle('active');
    navbar.classList.remove('active');
}
let navbar = document.querySelector(".navbar");

document.querySelector("#menu-icon").onclick = () => {
    navbar.classList.toggle('active');
    search.classList.remove('active');
}

let header = document.querySelector('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});
window.onscroll = () => {
    navbar.classList.remove('active');
    search.classList.remove('active');
}
let hearts = document.querySelectorAll(".bx-heart")


hearts.forEach(heart => {
    heart.addEventListener("click", () => {
        if (heart.classList.contains("bx-heart")) {
            heart.classList.remove("bx-heart");
            heart.classList.add("bxs-heart");
            heart.style.color = "red";

        } else {
            heart.classList.add("bx-heart");
            heart.classList.remove("bxs-heart");
            heart.style.color = "";
        }

    })
});
let total = 0;

function placeOrder() {
    const item = document.getElementById('item').value.trim();
    const quantity = parseInt(document.getElementById('quantity').value, 10);

    if (!item || isNaN(quantity) || quantity <= 0) {
        alert('Please enter a valid item and quantity.');
        return;
    }

    const price = getPrice(item);
    if (price === 0) {
        alert('Item not found in the menu.');
        return;
    }

    total += price * quantity;
    document.getElementById('total').innerHTML = `¥${total.toFixed(2)}`;
}

function getPrice(item) {
    switch (item.toLowerCase()) {
        case 'coffee beans':
            return 250;
        case 'iced coffee':
            return 250;
        case 'cafe latte':
            return 250;
        case 'sandwich':
            return 250;
        case 'lemon tea':
            return 250;
        case 'cheesecake':
            return 250;
        default:
            return 0;
    }
}
let cart = JSON.parse(localStorage.getItem("cart")) || [];

updateCartCount();


document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.preventDefault();

        const name = this.dataset.name;
        const price = this.dataset.price;
        const image = this.dataset.image;

        const product = { name, price, image, quantity: 1 };

     
        const exists = cart.find(item => item.name === name);

        if (exists) {
            exists.quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    });
});


function updateCartCount() {
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById("cart-count").innerText = cartCount;
}


