class ShoppingCart extends Page {
    scProducts;
    constructor() {
        super('shopping-cart');
    }

    
    render(parentSelector) {
        $(parentSelector).load('./pages/shopping-cart/shopping-cart.html', () => {
            this.getShoppingCartProducts();
        });
    }

    getShoppingCartProducts() {
        this.scProducts = JSON.parse(localStorage.getItem('shopping-cart-products'));
    }
}
