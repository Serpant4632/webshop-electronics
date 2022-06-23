class Navigation {
    onClickCallback;
    productDatabaseService;

    constructor(onClick) {
        this.onClickCallback = onClick;
        this.productDatabaseService = new ProductDatabaseService();
    }

    render(parentSelector) {
        $(parentSelector).load('./components/navigation/navigation.html', () => {
            $('.nav-item').on('click', (e) => {
                console.log(`${e.currentTarget.id} was clicked`);
                if (this.onClickCallback)
                    this.onClickCallback(e.currentTarget.id);
            })

            // check if user is logged in
            if (!sessionStorage.getItem('customerID')) {

                // change button to signin
                $('#my-account-sign-in-btn').html('Anmelden');

                // open Sign-In Modal
                $('#my-account-sign-in-btn').on('click', (e) => {
                    const loginModal = new LoginModal(this.onClickCallback);
                    loginModal.render($('#modal-container'));
                });

                // open Register Modal
                $('#my-account-register-btn').on('click', (e) => {
                    const registerModal = new RegisterModal(this.onClickCallback);
                    registerModal.render($('#modal-container'));

                });
            }
            else {
                // change button to logout
                $('#my-account-sign-in-btn').html('Abmelden');

                // remove register btn
                $('#reg-btn').remove();

                // clear session storage
                $('#my-account-sign-in-btn').on('click', () => {
                    sessionStorage.clear();
                    location.reload();
                });
            }

            this.renderNavShoppingCart();

            const searchbar = $('#sSearch');
            searchbar.on('input', (e) => {
                const searchbarSubstring = e.target.value;
                var searchResult;
                this.productDatabaseService.getProductByTitle(searchbarSubstring).then(searchResult => {
                    if (searchResult) {
                        console.log(searchResult);
                    }
                });
                
                const searchbarContent = new SearchbarContent(navigatePage);
                searchbarContent.render('#content');
            });
        });
    }

    renderNavShoppingCart() {
        let shoppingCartProducts = JSON.parse(localStorage.getItem('shopping-cart-products'));
        if (shoppingCartProducts && 0 < shoppingCartProducts.length) {
            let totalPriceOfSC = 0;
            let totalQuantity = 0;
            shoppingCartProducts.forEach((p) => {
                totalPriceOfSC += parseFloat(p.price) * parseFloat(p.quantity);
                totalQuantity += parseFloat(p.quantity);
            });
            const strTotalPriceOfSC = totalPriceOfSC.toFixed(2).replace('.', ',');
            $('#nav-price-shopping-cart').html(`${strTotalPriceOfSC}€`);

            $('#nav-badge-shopping-cart').html(totalQuantity);
        }
    }
}
