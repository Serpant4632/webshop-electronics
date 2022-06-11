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
        await fetch(this.baseUrl, {
            method: 'POST',
            body: JSON.stringify(newContent),
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                if (response.success) {
                    console.log(response);
                } else {
                    //here proceses de code if not success response
                }
            })
            .catch(function (error) {
                console.error(error);
                //Here is where the error catch and show the error: NetworkError when attempting to fetch resource
            });
        const result = await debug.json();
        console.log(result);
        // return result;
    }

    async deleteDatabaseContent(id) {
        await fetch(`${this.baseUrl}?id=${id}`, {
            method: 'DELETE',
        });
    }

}