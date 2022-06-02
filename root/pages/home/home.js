const products = [
    {
        id: '1',
        title: 'title1',
        description: 'asdflkasdjflka'
    },
    {
        id: '2',
        title: 'title2',
        description: 'afdsasdflkasdjflka'
    },
    {
        id: '3',
        title: 'title3',
        description: 'asfdasdflkasdjflhffhgka'
    },
    {
        id: '4',
        title: 'title4',
        description: 'asdflkasdjflghfghfghfgffhghka'
    },
    {
        id: '5',
        title: 'title5',
        description: 'asdflkasdjflghfghfghfgffhghkaasdfasdfsadfasd'
    },
    {
        id: '1',
        title: 'title1',
        description: 'asdflkasdjflka'
    },
    {
        id: '2',
        title: 'title2',
        description: 'afdsasdflkasdjflka'
    },
    {
        id: '3',
        title: 'title3',
        description: 'asfdasdflkasdjflhffhgka'
    },
    {
        id: '4',
        title: 'title4',
        description: 'asdflkasdjflghfghfghfgffhghka'
    },
    {
        id: '5',
        title: 'title5',
        description: 'asdflkasdjflghfghfghfgffhghkaasdfasdfsadfasd'
    },
    {
        id: '1',
        title: 'title1',
        description: 'asdflkasdjflka'
    },
    {
        id: '2',
        title: 'title2',
        description: 'afdsasdflkasdjflka'
    },
    {
        id: '3',
        title: 'title3',
        description: 'asfdasdflkasdjflhffhgka'
    },
    {
        id: '4',
        title: 'title4',
        description: 'asdflkasdjflghfghfghfgffhghka'
    },
    {
        id: '5',
        title: 'title5',
        description: 'asdflkasdjflghfghfghfgffhghkaasdfasdfsadfasd'
    },
];

const imagesPath = '/resources/images/';

class Home extends Page {
    productDatabaseService;
    allProducts;
    constructor() {
        super('home');
        this.productDatabaseService = new ProductDatabaseService();
    }


    render(parentSelector) {
        $(parentSelector).load('./pages/home/home.html', () => {
            $('.nav-item').on('click', (e) => {
                console.log(`${e.currentTarget.id} was clicked`);
                // this.navigateTo(e.target.id);
                if (this.onClickCallback)
                    this.onClickCallback(e.currentTarget.id);
            })

            this.loadAllProducts();
            this.renderCarouselCards(products);

        });
    }

    loadAllProducts() {
        this.productDatabaseService.getAllProducts().then(res => this.allProducts = res);
    }

    renderCarouselCards(products) {

        const productsCarousel =  $('#products-carousel');
        const productsCarouselInner = $('#products-carousel .carousel-inner');
        const productsCarouselItem = $('#products-carousel .carousel-inner .carousel-item');
        const btnPrev = $('button.carousel-control-prev');
        const btnNext = $('button.carousel-control-next');
        
        productsCarouselItem.clone().removeClass('active').appendTo(productsCarouselInner);
        productsCarouselItem.clone().removeClass('active').appendTo(productsCarouselInner);
        
        const productsCards = productsCarouselInner.find('.card');

        productsCards.each(function (index) {
            $(this).find('img').attr('src', imagesPath + 'arduino.jpeg');
            $(this).find('.card-title').text(products[index].title);
            $(this).find('.card-text').text(products[index].description);
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
}
 