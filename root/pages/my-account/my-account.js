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
                    $('#usrAccountNr').html('Kunden Nr. : '+this.usr.id);
                    $('#usrFirstName').html('Vorname: '+this.usr.firstName);
                    $('#usrLastName').html('Nachname: '+this.usr.lastName);
                    $('#usrAddress').html('Anschrift: '+this.usr.address);
                    $('#usrEmail').html('E-Mail: '+this.usr.email);
                });

                this.loadOrderData(data).then(() => {
                    console.log(this.order);
                    $('#usrAccountNr').html(this.order.customerID);
                    $('#orderDate').html(this.order.date);
                    $('#productNr').html(this.order.productID);
                    $('#productTitle').html(this.order.title);
                    $('#quantity').html(this.order.quantity);
                });
            }
        });
    }

    async loadUsrData(data) {
        this.usr = await this.userDatabaseService.getDatabaseContentById(data);
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
