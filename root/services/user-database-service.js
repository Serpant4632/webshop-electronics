class UserDatabaseService {

    baseUrl = 'http://localhost/backend-webshop-electronics/api/user_database.php';

    constructor() {

    }

    async getDatabaseContent() {
        const response = await fetch(this.baseUrl);
        const result = await response.json();
        return result;
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
        fetch(this.baseUrl, {
            method: 'POST',
            body: JSON.stringify(newContent),
        }).then(res => {
            console.log(res.status);
            return res;
        });
        // console.log(result);
        // return result;
    }

    async deleteDatabaseContent(id) {
        await fetch(`${this.baseUrl}?id=${id}`, {
            method: 'DELETE',
        });
    }

}