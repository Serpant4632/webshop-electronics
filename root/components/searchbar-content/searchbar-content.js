class SearchbarContent {
    onClickCallback;
    products
    productDatabaseService;

    constructor(onClickCallback) {
        this.onClickCallback = onClickCallback;
        this.productDatabaseService = new ProductDatabaseService();

    }

    render(parentSelector) {
        $(parentSelector).load('./components/searchbar-content/searchbar-content.html', () => {
            $('.nav-item').on('click', (e) => {
                console.log(`${e.currentTarget.id} was clicked`);
                if (this.onClickCallback)
                    this.onClickCallback(e.currentTarget.id);
            });
            const searchbar = $('#sSearch');
            searchbar.on('keyup', (e) => {
                const searchbarSubstring = e.target.value;
                var searchResult;
                this.productDatabaseService.getProductByTitle(searchbarSubstring).then(searchResult => {
                    if (searchResult) {
                    }
                    searchResult.forEach((value, index) => {

                        this.productDatabaseService.getProductById(value.id).then(products => {

                            const productsPage = $('#firstproduct .productgroup');
                            productsPage.clone().removeAttr('hidden').appendTo('#moreproducts');
                            const productsResult = productsPage.find('.product');;
                            console.log(productsResult);

                            productsResult.each(function () {
                                console.log(products.id);
                                $(this).find('pruduct-img').prop('src', `${imagesPath}${products.id}.jpeg`);
                                $(this).find('.product-title').text(products.title);
                            });

                        });
                    });
                });
            });
        });
    };
}

