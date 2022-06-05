class ProductPage extends Page {
    productId;
    product;
    productDatabaseService;
    constructor(pId) {
        super('product-page');
        this.productId = pId;
        this.productDatabaseService = new ProductDatabaseService();
    }


    render(parentSelector) {
        $(parentSelector).load('./pages/product-page/product-page.html', () => {
            $('.nav-item').on('click', (e) => {
                console.log(`${e.currentTarget.id} was clicked`);
                // this.navigateTo(e.target.id);
                if (this.onClickCallback)
                    this.onClickCallback(e.currentTarget.id);
            })



            this.loadProductData().then(() => {
                $('#product-image').prop('src', `${imagesPath}${this.product.id}.jpeg`);
                $('#product-title').html(this.product.title);
                $('#product-category').html(this.product.subCategory);
                const productPrice = parseFloat(this.product.price).toFixed(2).replace('.', ',');
                $('#product-price').html(`${productPrice} €`);
                $('#product-in-stock').html(`${this.product.inStock} Artikel verfügbar`);
                $('#product-description').html(this.product.description);
            }); 

            $('.dropdown-item').on('click', (e) => {
                const chosenQuantityValue = $(e.currentTarget).html();
                $('#dropdown-product-quantity').html(chosenQuantityValue);
            });

            $('#btn-to-shopping-cart').on('click',() => {
                $('#product-image-in-shopping-cart').prop('src', `${imagesPath}${this.product.id}.jpeg`);
                $('#in-shopping-cart-product-title').html(this.product.title);

                let shoppingCartProducts = JSON.parse(localStorage.getItem('shopping-cart-products'));
                shoppingCartProducts.push(this.product);
                localStorage.setItem('shopping-cart-products', JSON.stringify(shoppingCartProducts));
                this.renderNavShoppingCart();
            });

        });
    }

    async loadProductData() {
        this.product = await this.productDatabaseService.getProductById(this.productId);
    }

    renderNavShoppingCart() {
        let shoppingCartProducts = JSON.parse(localStorage.getItem('shopping-cart-products'));
        if(shoppingCartProducts && 0 < shoppingCartProducts.length){
            $('#nav-badge-shopping-cart').html(shoppingCartProducts.length.toString());
            let totalPriceOfSC = 0;
            shoppingCartProducts.forEach((p) => {
                totalPriceOfSC += parseFloat(p.price);
            });
            const strTotalPriceOfSC = totalPriceOfSC.toFixed(2).replace('.', ',');
            $('#nav-price-shopping-cart').html(`${strTotalPriceOfSC}€`);

        }
    }
}
