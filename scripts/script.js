// Check if a user is logged in
document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
    // Redirect to the login page
    window.location.href = "/src/login.html";
    }
});

let body = document.querySelector('body');
let iconCart = document.querySelector('.icon-cart');
let cartQuantity = document.querySelector('.cart-quantity');
let closeCart = document.querySelector('.close');
let cartContainer = document.querySelector('.cart');
let listProcutsHTML = document.getElementById('root');
let listCartHTML = document.querySelector('.cart-item');
let UPbutton = document.querySelector('.botton-up');
let total = document.querySelector('.total-price');
let clearAll = document.querySelector('.clear-all');
let products = [];
let cart = [];
iconCart.addEventListener('click', () => {
    cartContainer.classList.toggle('show-cart');
});

closeCart.addEventListener('click', () => {
    cartContainer.classList.toggle('show-cart');
});


const addElementsToHTML = () => { 
    if(products.length > 0) // if has data
    {
        products.forEach((product) => {

        const itemElement = document.createElement('div');
        itemElement.dataset.id = product.id;
        itemElement.classList.add('product-item');
        itemElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="w-24 h-24" />
            <div>
                <h1>${product.title}</h1>
                <span>$${product.price}</span>
                <p class='truncate'>${product.description}</p>

            </div>
            <button class="addCart">Add to cart</button>        
        `;
        listProcutsHTML.appendChild(itemElement);
    });
    }
}

listProcutsHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let id_product = positionClick.parentElement.dataset.id;
        console.log(id_product);
        addItemsToCart(id_product);
    }
});

const addItemsToCart = (product_id) => {
    product_id = Number(product_id); // Convert to number for accurate comparison

    let positionThisProductInCart = cart.findIndex((value) => value.product_id === product_id);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (loggedInUser) {
    const userCartKey = `cart_${loggedInUser.email}`;
    localStorage.setItem(userCartKey, JSON.stringify(cart));
  }
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;
            totalPrice += products.find((value) => value.id === Number(item.product_id)).price * item.quantity;
            let positionProduct = products.findIndex((value) => value.id === Number(item.product_id));
            if (positionProduct === -1) {
                console.error(`Product with ID ${item.product_id} not found in products array.`);
                return;
            }

            let info = products[positionProduct];
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            newItem.innerHTML = `
                <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="totalPrice">$${(info.price * item.quantity).toFixed(2)}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus">+
                    </span>
                </div>
            `;
            listCartHTML.appendChild(newItem);
        });
    }

    cartQuantity.innerHTML = totalQuantity;
    total.innerHTML = totalPrice.toFixed(2);
};

const changeQuantityCart = (product_id, type) => {
        let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
        if(positionItemInCart >= 0){
            let info = cart[positionItemInCart];
            switch (type) {
                case 'plus':
                    cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                    break;
            
                default:
                    let changeQuantity = cart[positionItemInCart].quantity - 1;
                    if (changeQuantity > 0) {
                        cart[positionItemInCart].quantity = changeQuantity;
                    }else{
                        cart.splice(positionItemInCart, 1);
                    }
                    break;
            }
        }
        addCartToHTML();
        addCartToMemory();
    }

    listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})

const getProducts = () => {
    fetch("products.json")
      .then((response) => response.json())
      .then((data) => {
        products = data;
        console.log("Products loaded:", products); // Debug log
        addElementsToHTML();
  
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser) {
          const userCartKey = `cart_${loggedInUser.email}`;
          cart = JSON.parse(localStorage.getItem(userCartKey)) || [];
          addCartToHTML();
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

getProducts();

UPbutton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

clearAll.addEventListener('click', ()=>{
    cart = [];
    addCartToHTML();
    addCartToMemory();
});


