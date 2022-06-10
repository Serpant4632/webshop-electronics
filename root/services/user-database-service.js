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

    async postDatabaseContent(newContent) {
        console.log('post database content', newContent);
        const debug = await fetch(this.baseUrl, {
            method: 'POST',
            body: JSON.stringify(newContent),
        }).then(this.handleErrors)
            .then(function (response) {
                console.log('user created');
            }).catch(function (error) {
                console.log(error);
            });
        return debug;
    }

    async deleteDatabaseContent(id) {
        await fetch(`${this.baseUrl}?id=${id}`, {
            method: 'DELETE',
        });
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
}