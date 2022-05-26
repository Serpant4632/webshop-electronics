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
    constructor() {
        super('home');
    }


    render(parentSelector) {
        $(parentSelector).load('./pages/home/home.html', () => {
            $('.nav-item').on('click', (e) => {
                console.log(`${e.currentTarget.id} was clicked`);
                // this.navigateTo(e.target.id);
                if (this.onClickCallback)
                    this.onClickCallback(e.currentTarget.id);
            })

            this.renderCarouselCards(products);

        });
    }

    renderCarouselCards(products) {

        const productsCarouselInner = $('#products-carousel .carousel-inner');
        const productsCarouselItem = $('#products-carousel .carousel-inner .carousel-item');
        
        productsCarouselItem.clone().removeClass('active').appendTo(productsCarouselInner);
        productsCarouselItem.clone().removeClass('active').appendTo(productsCarouselInner);
        
        const productsCards = productsCarouselInner.find('.card');

        productsCards.each(function (index) {
            $(this).find('img').attr('src', imagesPath + 'arduino.jpeg');
            $(this).find('.card-title').text(products[index].title);
            $(this).find('.card-text').text(products[index].description);
        });
    }
}
 