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
        const resJson = await response.json();
        let result = [];
        const orders = resJson["GROUP_CONCAT(productID, \",\", title, \",\", quantity, \";\")"].split(";,");
        result.push({
            customerID: resJson.customerID,
            date: resJson.date,
        });
        orders.forEach((cat) => {
            const details = cat.split(",");
            result.push({
                productID: details[0],
                title: details[1],
                quantity: details[2]
            });
        })
        return result;
    }
}