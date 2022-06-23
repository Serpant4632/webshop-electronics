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

        let result = [];
        if (response.status != '200') {
            return null;
        } else {
            const resJson = await response.json();
            resJson.forEach((element, index) => {
                const orders = element["GROUP_CONCAT(productID, \",\", title, \",\", quantity, \";\")"].split(";,");
                orders.forEach((cat,) => {
                    console.log(cat)
                    const details = cat.split(",");
                    result.push({
                        customerID: resJson[index].customerID,
                        date: resJson[index].date,
                        productID: details[0],
                        title: details[1],
                        quantity: details[2].split(';', 1)
                    });
                });
            });
        }
        return result;
    }

    async postOrder(newContent) {
        console.log('post database content', newContent);
        const result = await fetch(this.baseUrl, {
            method: 'POST',
            cache: 'reload',
            body: JSON.stringify(newContent),
        })
        console.log(result);
        return result;
    }
}