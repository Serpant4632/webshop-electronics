class ProductDatabaseService {
    baseUrl = 'http://localhost/backend-webshop-electronics/api/product_database.php';

    constructor() {

    }
    
    async getDatabaseContent() {
        const response = await fetch(this.baseUrl);
        const result = await response.json();
        return result;
    }
    
    async getDatabaseContentById(id) {
        const response = await fetch(`${this.baseUrl}?id=${id}`);
        // const test = await fetch('' + this.baseUrl + '?id=' + id); // equivalent
        const result = await response.json();
        return result;
    }
    
    async postDatabaseContent(newContent) {
        console.log('post database content', newContent);
        await fetch(this.baseUrl, {
            method: 'POST',
            body: JSON.stringify(newContent),
        });
    }
    
    async deleteDatabaseContent(id) {
        await fetch(`${this.baseUrl}?id=${id}`, {
            method: 'DELETE',
        });
    }
    
    async patchDatabaseContent(updatedContent) {
        await fetch(this.baseUrl, {
            method: 'PATCH',
            body: JSON.stringify(updatedContent),
        });
    }
}