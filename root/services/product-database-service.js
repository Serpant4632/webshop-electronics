class ProductDatabaseService {

    baseUrl = 'http://localhost/backend-webshop-electronics/api/product_database.php';

    constructor() {

    }

    async getAllProducts() {
        const response = await fetch(this.baseUrl);
        const result = await response.json();
        return result;
    }

    async getProductById(id) {
        const response = await fetch(`${this.baseUrl}?id=${id}`);
        const result = await response.json();
        return result;
    }

    async getProductByTitle(title) {
        return fetch(`${this.baseUrl}?title=${title}`).then(async (res) => {
            const result = await res.json();
            return result;
        }).catch((error) => {
            return null;
        });

    }

    async getCategories() {
        const response = await fetch(`${this.baseUrl}?category`);
        const resJson = await response.json();
        let result = [];
        resJson.forEach((cat) => {
            const subCats = cat['GROUP_CONCAT(DISTINCT(subCategory))'].split(',');
            result.push({
                category: cat.category,
                subCategories: subCats
            });
        });
        return result;
    }

}