class MyAccount extends Page {
    srcUser;
    usr;
    order;
    userDatabaseService;
    orderDatabaseService;

    constructor() {
        super('my-account');
        this.userDatabaseService = new UserDatabaseService();
        this.orderDatabaseService = new OrderDatabaseService();
    }

    render(parentSelector) {
        $(parentSelector).load('./pages/my-account/my-account.html', () => {
            $('.nav-item').on('click', (e) => {
                console.log(`${e.currentTarget.id} was clicked`);
                if (this.onClickCallback)
                    this.onClickCallback(e.currentTarget.id);
            });

            const data = sessionStorage.getItem('customerID')
            if (data) {
                this.loadUsrData(data).then(() => {
                    $('#usr-account-nr').html('Kunden Nr. : ' + this.usr.id);
                    $('#usr-first-name').html('Vorname: ' + this.usr.firstName);
                    $('#usr-last-name').html('Nachname: ' + this.usr.lastName);
                    $('#usr-address').html('Anschrift: ' + this.usr.address);
                    $('#usr-email').html('E-Mail: ' + this.usr.email);
                });

                this.loadOrderData(data).then((orders) => {
                    $('#customer-number').html('Kunden Nr. : ' + this.usr.id);
                    this.order.forEach((cat, index) => {
                        $('#order-table').append(`<tr><td class="column-heading-wide">${cat['productID']}</td><td class="column-heading-wide-2">${cat['title']}</td><td class="column-heading-wide">${cat['quantity']}</td><td class="column-heading-wide">${cat['date']}</td></tr>`);
                    });
                });
            }
        });
    }

    async loadUsrData(data) {
        this.usr = await this.userDatabaseService.getDatabaseUserById(data);
        console.log(this.usr);
    }

    async loadOrderData(data) {
        this.order = await this.orderDatabaseService.getOrdersByCustomerId(data);
    }

    getUserData() {
        this.srcUser = JSON.parse(localStorage.getItem('shopping-cart-products'));
        console.log(this.srcUser)
    }
}