class MyAccount extends Page {
    srcUser;
    constructor() {
        super('my-account');
    }

    render(parentSelector) {
        $(parentSelector).load('./pages/my-account/my-account.html', () => {
            //this.getUserData();
        });
    }

    getUserData() {
        this.srcUser = JSON.parse(localStorage.getItem('shopping-cart-products'));
        console.log(this.srcUser)
    }
}
