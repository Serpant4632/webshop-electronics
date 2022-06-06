const imagesPath = '/resources/images/image-';
$(() => {
    registerComponents();
    registerPages();
    registerServices();

    setupLocalStorage();

    const navigation = new Navigation(navigatePage);
    navigation.render('#navigation');

    const categories = new Categories(navigatePage);
    categories.render('#categories');

    const home = new Home(navigatePage);
    home.render('#content');

    const footer = new Footer(navigatePage);
    footer.render('#footer');

});

function setupLocalStorage() {
    if (typeof (Storage) !== "undefined") {
        let shoppingCartProducts = JSON.stringify(localStorage.getItem('shopping-cart-products'));
        if (shoppingCartProducts == 'null')
            localStorage.setItem('shopping-cart-products', JSON.stringify([]));
    }
}

// second parameter id (can be productId) for displaying productData when ProductPage is called
// second parameter id (can be userId) when MyAccount is called
function navigatePage(pageName, id) {
    console.log('navigate to page', pageName);
    const pages = {
        home: new Home(navigatePage),
        myAccount: new MyAccount(),
        shoppingCart: new ShoppingCart(navigatePage),
        wishList: new WishList(),
        productPage: new ProductPage(navigatePage, id)
    };
    pages[pageName].render('#content');
}

function registerComponents() {
    const components = ['navigation', 'loading', 'login-modal', 'register-modal', 'categories', 'footer', 'searchbar-content'];
    const links = components.map((c) => $(`<script src="components/${c}/${c}.js"></script>`));
    const stylesheets = components.map((c) => $(`<link rel="stylesheet" href="components/${c}/${c}.css">`));
    $('head').prepend(links, stylesheets);
}

function registerPages() {
    const pages = ['home', 'wish-list', 'my-account', 'shopping-cart', 'product-page'];
    const links = pages.map((c) => $(`<script src="pages/${c}/${c}.js"></script>`));
    const stylesheets = pages.map((c) => $(`<link rel="stylesheet" href="pages/${c}/${c}.css">`));
    $('head').prepend(links, stylesheets);
}

function registerServices() {
    const services = ['product-database-service', 'user-database-service', 'order-database-service'];
    const scripts = services.map((s) => $(`<script src="services/${s}.js"></script>`));
    $('head').prepend(scripts);
}
