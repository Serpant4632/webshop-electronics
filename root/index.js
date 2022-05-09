$(() => {
    registerComponents();
    registerPages();

    const navigation = new Navigation(navigatePage);
    navigation.render('#navigation');

});

function navigatePage(id) {
    console.log('navigate to page', id);
    const pages = {
        home: new Home(),
        login: new Login(),
    };
    pages[id].render('#content');
}

function registerComponents() {
    const components = ['navigation', 'loading'];
    const links = components.map((c) => $(`<script src="components/${c}/${c}.js"></script>`));
    const stylesheets = components.map((c) => $(`<link rel="stylesheet" href="components/${c}/${c}.css">`));
    $('head').prepend(links, stylesheets);
}

function registerPages() {
    const pages = ['home', 'login'];
    const links = pages.map((c) => $(`<script src="pages/${c}/${c}.js"></script>`));
    const stylesheets = pages.map((c) => $(`<link rel="stylesheet" href="pages/${c}/${c}.css">`));
    $('head').prepend(links, stylesheets);
}
