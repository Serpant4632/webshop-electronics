class Home extends Page {
    productDatabaseService;
    carouselCardProducts;
    onClickCallback;
    constructor(onClickCallback) {
        super('home');
        this.productDatabaseService = new ProductDatabaseService();
        this.onClickCallback = onClickCallback;
    }

    render(parentSelector) {
        $(parentSelector).load('./pages/home/home.html', () => {
            this.loadCarouselCardProducts().then((products) => {
                this.renderCarouselCards(products);

                $('.product-item').on('click', (e) => {
                    if (this.onClickCallback) {
                        this.onClickCallback('productPage', e.currentTarget.id);
                    }
                })

            });
        });
    }

    // shuffle ProductItems and randomly choose 20
    async loadCarouselCardProducts() {
        const allProducts = await this.productDatabaseService.getAllProducts();
        return this.getRandom(allProducts, 20);
    }

    renderCarouselCards(products) {
        const productsCarousel = $('#products-carousel');
        const productsCarouselInner = $('#products-carousel .carousel-inner');
        const productsCarouselItem = $('#products-carousel .carousel-inner .carousel-item');
        const btnPrev = $('button.carousel-control-prev');
        const btnNext = $('button.carousel-control-next');

        productsCarouselItem.clone().removeClass('active').appendTo(productsCarouselInner);
        productsCarouselItem.clone().removeClass('active').appendTo(productsCarouselInner);
        productsCarouselItem.clone().removeClass('active').appendTo(productsCarouselInner);

        const productsCards = productsCarouselInner.find('.card');

        productsCards.each(function (index) {
            $(this).find('img').attr('src', `${imagesPath}${products[index].id}.jpeg`);
            $(this).find('.card-title').text(products[index].title);
            $(this).find('.card-text').text(products[index].description);
            $(this).prop('id', products[index].id);
        });

        productsCarousel.on('mousemove', () => {
            btnPrev.css('opacity', 0.9);
            btnNext.css('opacity', 0.9);
        });
        productsCarousel.on('mouseleave', () => {
            btnPrev.css('opacity', 0.1);
            btnNext.css('opacity', 0.1);

        });
    }

    getRandom(arr, n) {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        if (n > len)
            throw new RangeError("getRandom: more elements taken than available");
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }
}
