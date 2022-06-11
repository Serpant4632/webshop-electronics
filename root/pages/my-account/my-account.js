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

            if (loggedIn != null) {
                this.loadUsrData.then(() => {
                    $('#usrAccountNr').html(this.usr.id);
                    $('#usrFirstName').html(this.usr.firstName);
                    $('#usrLastName').html(this.usr.lastName);
                    $('#usrAddress').html(this.usr.address);
                    $('#usrEmail').html(this.usr.email);
                });

                this.loadOrderData.the(() => {
                    console.log(this.order);
                })
            }
        });
    }

    async loadUsrData() {
        this.usr = await this.userDatabaseService.getDatabaseContentById(loggedIn);
        console.log(this.usr);
    }

    async loadOrderData() {
        this.order = await this.orderDatabaseService.getOrdersByCustomerId(this.usr.id);
    }

    getUserData() {
        this.srcUser = JSON.parse(localStorage.getItem('shopping-cart-products'));
        console.log(this.srcUser)
    }
}
