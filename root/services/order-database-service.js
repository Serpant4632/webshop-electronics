class OrderDatabaseService {

    baseUrl = 'http://localhost/backend-webshop-electronics/api/order_database.php';

    constructor() {

    }

    async getDatabaseContent() {
        const response = await fetch(this.baseUrl);
        const result = await response.json();
        return result;
    }

    async getOrderById(id) {
        const response = await fetch(`${this.baseUrl}?id=${id}`);
        const result = await response.json();
        return result;
    }

    async getOrdersByCustomerId(customerID) {
        const response = await fetch(`${this.baseUrl}?customerID=${customerID}`);
        const result = await response.json();
        return result;
    }

}