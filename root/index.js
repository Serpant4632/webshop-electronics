$(() => {
    registerComponents();
    registerPages();

    const navigation = new Navigation(navigatePage);
    navigation.render('#navigation');

    const categories = new Categories(navigatePage);
    categories.render('#categories');

    const home = new Home(navigatePage);
    home.render('#content');

});

function navigatePage(id) {
    console.log('navigate to page', id);
    const pages = {
        home: new Home(),
        myAccount: new MyAccount(),
        shoppingCart: new ShoppingCart(),
        wishList: new WishList()
    };
    pages[id].render('#content');
}

function registerComponents() {
    const components = ['navigation', 'loading', 'login-modal', 'register-modal', 'categories'];
    const links = components.map((c) => $(`<script src="components/${c}/${c}.js"></script>`));
    const stylesheets = components.map((c) => $(`<link rel="stylesheet" href="components/${c}/${c}.css">`));
    $('head').prepend(links, stylesheets);
}

function registerPages() {
    const pages = ['home', 'wish-list', 'my-account', 'shopping-cart'];
    const links = pages.map((c) => $(`<script src="pages/${c}/${c}.js"></script>`));
    const stylesheets = pages.map((c) => $(`<link rel="stylesheet" href="pages/${c}/${c}.css">`));
    $('head').prepend(links, stylesheets);
}
