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
            searchbar.on('input', (e) => {
                const searchbarSubstring = e.target.value;
                var searchResult;
                this.productDatabaseService.getProductByTitle(searchbarSubstring).then(searchResult => {
                    if (searchResult) {
                        console.log(searchResult);
                    }
                    searchResult.forEach((value, index) => {
                        console.log(value.id);
                        this.products = this.productDatabaseService.getProductById(value.id);
                        console.log(this.products[index].id);

                        const productsSearchItem = $('#section-shop-container .col-sm-8');
                        productsSearchItem.clone().appendTo(productsSearchItem);
                        const productsCards = productsSearchItem.find('.card');

                        $(this).find('img').attr('src', `${imagesPath}${products[index].id}.jpeg`);
                        console.log(this.products[index].id);
                        $(this).find('.card-title').text(products[index].title);
                        console.log(this.products[index].title);
                        $(this).find('.card-text').text(products[index].description);
                        console.log(this.products[index].description);
                    });
                });
            });
        });
    };
}

