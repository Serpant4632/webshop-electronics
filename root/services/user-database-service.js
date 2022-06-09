class UserDatabaseService {
    baseUrl = 'http://localhost/backend-webshop-electronics/api/user_database.php';

    constructor() {

    }

    async getDatabaseContent() {
        const response = await fetch(baseUrl);
        const result = await response.json();
        return result;
    }

    async getDatabaseContentById(id) {
        const response = await fetch(`${baseUrl}?id=${id}`);
        // const test = await fetch('' + baseUrl + '?id=' + id); // equivalent
        const result = await response.json();
        return result;
    }

    async postDatabaseContent(newContent) {
        console.log('post database content', newContent);
        await fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify(newContent),
        });
    }

    async deleteDatabaseContent(id) {
        await fetch(`${baseUrl}?id=${id}`, {
            method: 'DELETE',
        });
    }

    // async patchDatabaseContent(updatedContent) {
    //     await fetch(baseUrl, {
    //         method: 'PATCH',
    //         body: JSON.stringify(updatedContent),
    //     });
    // }
}