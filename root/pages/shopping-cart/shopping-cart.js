class ShoppingCart extends Page {
    scProducts;
    scItem;
    constructor() {
        super('shopping-cart');
    }


    render(parentSelector) {
        $(parentSelector).load('./pages/shopping-cart/shopping-cart.html', () => {
            this.getShoppingCartProducts();
            // create foreach product in SC new row
            this.scProducts.forEach((cat, index) => {
                $('#shoppingCartTable').append(`<tr><td class="column-heading-wide">${index + 1}</td><td class="column-heading-wide">${cat['id']}</td><td class="column-heading-wide-2">${cat['title']}</td><td class="column-heading-wide">${cat['quantity']}</td><td><i class="bi bi-trash3-fill btn btn-delete-sc-item"></i></td></tr>`);
            });

            $('.btn-delete-sc-item').on('click', (e) => {

                // select current index+1 from item
                const chosenProductPosition = $(e.currentTarget.parentElement.parentElement).children(":first").html();

                // remove item by index from object
                this.scProducts.splice(chosenProductPosition - 1, 1);

                // update localStorage
                localStorage.setItem('shopping-cart-products', JSON.stringify(this.scProducts));
                console.log(this.scProducts);

            });

        });
    }

    getShoppingCartProducts() {
        this.scProducts = JSON.parse(localStorage.getItem('shopping-cart-products'));
    }

}
