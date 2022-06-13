class ShoppingCart extends Page {
    scProducts;
    scItem;
    subtotalCosts;
    totalCosts;
    orderDatabaseService;
    onClickCallback;
    constructor(onClickCallback) {
        super('shopping-cart');
        this.orderDatabaseService = new OrderDatabaseService();
        this.onClickCallback = onClickCallback;
    }

    /*
    
    customerId,
    productid,
    productquantity
    */



    render(parentSelector) {
        if (!sessionStorage.getItem('customerID')) {
            var toastElList = [].slice.call(document.querySelectorAll('.toast'))
            var toastList = toastElList.map(function (toastEl) {
                return new bootstrap.Toast(toastEl)
            })
            toastList[0].show();
            return;
        }
        $(parentSelector).load('./pages/shopping-cart/shopping-cart.html', () => {
            this.getShoppingCartProducts();
            this.renderNavShoppingCart();
            // create foreach product in SC new row

            $('#liveToastBtn').on('click', () => {

            });

            if (!this.scProducts.length) {
                $('#info-no-item-in-sc').css('display', 'block');
                $('#table').addClass('hide-content');
            } else {
                $('#info-no-item-in-sc').css('display', 'none');
                $('#table').removeClass('hide-content');
                this.scProducts.forEach((cat, index) => {
                    $('#shoppingCartTable').append(`<tr><td class="column-heading-wide">${index + 1}</td><td class="column-heading-wide">${cat['id']}</td><td class="column-heading-wide-2">${cat['title']}</td><td class="column-heading-wide">${cat['quantity']}</td><td><i class="bi bi-trash3-fill btn btn-delete-sc-item"></i></td></tr>`);
                });
                console.log(this.subtotalCosts)
                $('#costs-subtotal').html(`${this.subtotalCosts}€`);
                $('#costs-total').html(`${this.totalCosts}€`);

                $('.btn-delete-sc-item').on('click', (e) => {
                    // select current index+1 from item
                    const chosenProductPosition = $(e.currentTarget.parentElement.parentElement).children(":first").html();

                    // remove item by index from object
                    this.scProducts.splice(chosenProductPosition - 1, 1);

                    // update localStorage
                    localStorage.setItem('shopping-cart-products', JSON.stringify(this.scProducts));
                    console.log(this.scProducts);
                    this.renderNavShoppingCart();
                    this.render(parentSelector);
                });

                $('#btn-purchase').on('click', (e) => {
                    const customerID = sessionStorage.getItem('customerID');

                    this.scProducts.forEach((item) => {
                        const order = {
                            customerID: customerID,
                            productID: item.id,
                            quantity: item.quantity,
                        };
                        this.orderDatabaseService.postOrder(order).then(response => {
                            if (response.status == 201) {
                                this.scProducts = [];
                                localStorage.setItem('shopping-cart-products', JSON.stringify([]));
                                this.renderNavShoppingCart();
                                this.onClickCallback('myAccount');
                            }

                        });
                    });
                });
            }

            $('.form-check-input').on('click', (e) => {

            });

        });
    }

    getShoppingCartProducts() {
        this.scProducts = JSON.parse(localStorage.getItem('shopping-cart-products'));
    }

    renderNavShoppingCart() {
        let shoppingCartProducts = this.scProducts;
        if (shoppingCartProducts) {
            console.log('renderNavShoppingCart');
            let totalPriceOfSC = 0;
            let totalQuantity = 0;
            shoppingCartProducts.forEach((p) => {
                totalPriceOfSC += parseFloat(p.price) * parseFloat(p.quantity);
                totalQuantity += parseFloat(p.quantity);
            });
            this.totalCosts = (Number(totalPriceOfSC.toFixed(2)) + Number(4.99)).toString().replace('.', ',');
            const strTotalPriceOfSC = totalPriceOfSC.toFixed(2).replace('.', ',');
            this.subtotalCosts = strTotalPriceOfSC;
            console.log(strTotalPriceOfSC);
            $('#nav-price-shopping-cart').html(`${strTotalPriceOfSC}€`);
            if (totalQuantity == 0) totalQuantity = '';
            console.log(totalQuantity);
            $('#nav-badge-shopping-cart').html(totalQuantity);
        }
    }
}
