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

            // take searchbar Substring and show possible results
            const searchbar = $('#sSearch');
            searchbar.on('input', (e) => {
                $('.productgroup').remove();
                const searchbarSubstring = e.target.value;
                var searchResult;
                this.productDatabaseService.getProductByTitle(searchbarSubstring).then(searchResult => {
                    if (searchResult) {
                    }

                    if (searchResult === null) {
                        $('.section-title').html('Ihre Suchanfrage liefert leider keine Treffer.');
                    } else {
                        $('.section-title').html('');
                        searchResult.forEach((value, index) => {
                            $('#moreproducts').append(`<div class="productgroup" id="${value.id}">
                        <div class="product-body">
                        <table>
                        <tr>
                            <th><img src="/resources/images/image-${value.id}.jpeg" class="product-img" alt=""></th>
                            <th><h4 class="product-title" id="product-title-${index}">${value.title}</h4></th>
                        </tr>
                        </table>  
                        </div>
                        <hr>
                        </div>`);
                        });

                        $('.productgroup').on('click', (e) => {
                            if (this.onClickCallback) {
                                this.onClickCallback('productPage', e.currentTarget.id);
                            }
                        })
                    }
                });
            });
        });
    };
};


