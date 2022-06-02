class ProductDatabaseService {
    productUrl = 'http://localhost/backend-webshop-electronics/api/product_database.php';
    searchbarUrl = 'http://localhost/backend-webshop-electronics/api/searchbar.php';

    constructor() {

    }

    async getDatabaseContent() {
        const response = await fetch(this.productUrl);
        const result = await response.json();
        return result;
    }

    async getDatabaseContentById(id) {
        const response = await fetch(`${this.productUrl}?id=${id}`);
        // const test = await fetch('' + this.productUrl + '?id=' + id); // equivalent
        const result = await response.json();
        return result;
    }

    async getDatabaseContentByTitle(title) {
        const response = await fetch(`${this.searchbarUrl}?title=${title}`);
        // const test = await fetch('' + this.searchbarUrl + '?id=' + id); // equivalent
        const result = await response.json();
        return result;
    }

    async postDatabaseContent(newContent) {
        console.log('post database content', newContent);
        await fetch(this.productUrl, {
            method: 'POST',
            body: JSON.stringify(newContent),
        });
    }

    async deleteDatabaseContent(id) {
        await fetch(`${this.productUrl}?id=${id}`, {
            method: 'DELETE',
        });
    }

    async patchDatabaseContent(updatedContent) {
        await fetch(this.productUrl, {
            method: 'PATCH',
            body: JSON.stringify(updatedContent),
        });
    }

    async getSubCatInCat() {
        let allProducts = await this.getDatabaseContent();
        let arrFilteredSubCategories = [];
        allProducts.forEach((el) => {
            let hasSubcategory;
            arrFilteredSubCategories.forEach((rEl) => {
                if (rEl.subCategory === el.subCategory)
                    hasSubcategory = true;
            });
            if (!hasSubcategory)
                arrFilteredSubCategories.push(el);
        });
        let arrFilteredCategories = [];
        let arrSubCategories = [];
        for (let index = 0; index < arrFilteredSubCategories.length; index++) {
            const element = arrFilteredSubCategories[index];
            if (arrFilteredSubCategories[index + 1] && element.category === arrFilteredSubCategories[index + 1].category) {
                arrSubCategories.push(element.subCategory, arrFilteredSubCategories[index + 1].subCategory);
            } else {
                arrFilteredCategories.push({
                    category: element.category,
                    subCategories: [...new Set(arrSubCategories)],
                });
                arrSubCategories = [];
            }
        }
        return arrFilteredCategories;
    }

}