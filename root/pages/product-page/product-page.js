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

            this.loadProductData().then((product) => {
                let productImage = $('#productImage');
                productImage.prop('src', `${imagesPath}${this.product.id}.jpeg`);
            });

        });
    }

    async loadProductData() {
        this.product = await this.productDatabaseService.getProductById(this.productId);
    }
}
