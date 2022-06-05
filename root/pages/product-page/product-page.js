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
                console.log(this.product);
                let productImage = $('#product-image');
                let productTitle = $('#product-title');
                let productCategory = $('#product-category');
                let productPrice = $('#product-price');
                let productInStock = $('#product-in-stock');

                productImage.prop('src', `${imagesPath}${this.product.id}.jpeg`);
                productTitle.html(this.product.title);
                productCategory.html(this.product.subCategory);
                productPrice.html(`${this.product.price} €`);
                productInStock.html(`${this.product.inStock} Artikel verfügbar`);

            }); 

            $('.dropdown-item').on('click', (e) => {
                const chosenQuantityValue = $(e.currentTarget).html();
                $('#dropdown-product-quantity').html(chosenQuantityValue);
            });

            $('#btn-in-shopping-cart').on('click',() => {
                $('#product-image-in-shopping-cart').prop('src', `${imagesPath}${this.product.id}.jpeg`);
                $('#in-shopping-cart-product-title').html(this.product.title);
            });

        });
    }

    async loadProductData() {
        this.product = await this.productDatabaseService.getProductById(this.productId);
        this.product.price = this.product.price.replace('.', ',');
        console.log(this.product.price)
    }
}
