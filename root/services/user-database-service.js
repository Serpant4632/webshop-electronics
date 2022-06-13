class UserDatabaseService {

    baseUrl = 'http://localhost/backend-webshop-electronics/api/user_database.php';

    constructor() {

    }

    async getDatabaseContentById(id) {
        const response = await fetch(`${this.baseUrl}?id=${id}`);
        const result = await response.json();
        return result;
    }

    async getEmailBySubstring(substring) {
        const response = await fetch(`${this.baseUrl}?email=${substring}`);
        const result = await response;
        return result;
    }

    async postDatabaseContent(newContent) {
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