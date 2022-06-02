$(() => {
    registerComponents();
    registerPages();
    registerServices();

    const navigation = new Navigation(navigatePage);
    navigation.render('#navigation');

    const categories = new Categories(navigatePage);
    categories.render('#categories');

    const home = new Home(navigatePage);
    home.render('#content');

    const footer = new Footer(navigatePage);
    footer.render('#footer');

});

function navigatePage(id) {
    console.log('navigate to page', id);
    const pages = {
        home: new Home(),
        myAccount: new MyAccount(),
        shoppingCart: new ShoppingCart(),
        wishList: new WishList(),
        productPage: new ProductPage()
    };
    pages[id].render('#content');
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
