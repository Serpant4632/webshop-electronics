const baseUrl = 'http://localhost/webshop-electronics/api/userDatabase.php';
async function getDatabaseContent() {
    const response = await fetch(baseUrl);
    const result = await response.json();
    return result;
}

async function getDatabaseContentById(id) {
    const response = await fetch(`${baseUrl}?id=${id}`);
    // const test = await fetch('' + baseUrl + '?id=' + id); // equivalent
    const result = await response.json();
    return result;
}

async function postDatabaseContent(newContent) {
    console.log('post database content', newContent);
    await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(newContent),
    });
}

async function deleteDatabaseContent(id) {
    await fetch(`${baseUrl}?id=${id}`, {
        method: 'DELETE',
    });
}

async function patchDatabaseContent(updatedContent) {
    await fetch(baseUrl, {
        method: 'PATCH',
        body: JSON.stringify(updatedContent),
    });
}