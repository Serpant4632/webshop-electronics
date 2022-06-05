class ShoppingCart extends Page {
    constructor() {
        super('shopping-cart');
    }

    
    render(parentSelector) {
        $(parentSelector).load('./pages/shopping-cart/shopping-cart.html', () => {

        });
    }
}
