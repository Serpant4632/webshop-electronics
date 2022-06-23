class Categories {
    onClickCallback;
    productDatabaseService;
    subCategoriesInCategories = [];
    allProducts = [];

    constructor(onClick) {
        this.onClickCallback = onClick;
        this.productDatabaseService = new ProductDatabaseService();
    }

    render(parentSelector) {
        $(parentSelector).load('./components/categories/categories.html', () => {
            this.loadCategoryData();
            this.setupListeners();

        });
    }

    loadCategoryData() {
        this.productDatabaseService.getCategories().then(res => this.subCategoriesInCategories = res);
        this.productDatabaseService.getAllProducts().then(res => this.allProducts = res);
    }

    loadSubCategoryHtml(element) {
        const elementCategory = element.currentTarget.id;
        const currentCatItems = this.allProducts.filter((el) => el.category === elementCategory);
        const subCatRow = $('#subcategory-row');
        let subCategoryCol = $('.col.col-subcategory').clone();

        if ($(element.currentTarget).hasClass('activeCategory')) {
            return;
        }
        else {
            $('.category-btn').removeClass('activeCategory');
            $('.col.col-subcategory').slice(1).remove();
            $('.col.col-subcategory').find('.heading-subcategory').html('');
            $('.col.col-subcategory').find('.list-item-subcategory').slice(1).remove();
            $('.col.col-subcategory').find('.list-item-subcategory').html('');
            subCategoryCol = $('.col.col-subcategory');
        }
        $('.col.col-subcategory').remove();

        const currentCatAndSubCat = this.subCategoriesInCategories.find((el) => el.category === elementCategory);

        currentCatAndSubCat['subCategories'].forEach((subCat) => {
            let newSubCatCol = subCategoryCol.clone();
            newSubCatCol.find('.heading-subcategory').html(subCat);

            const subCatItems = currentCatItems.filter((el) => el.subCategory === subCat);

            subCatItems.forEach((item) => {
                newSubCatCol.find('.list-group').append(`<a class="list-item-subcategory list-group-item">${item.title}</a>`);
            });
            newSubCatCol.find('.list-item-subcategory').first().remove();
            subCatRow.append(newSubCatCol);
        });

        $(element.currentTarget).addClass('activeCategory');

    }

    setupListeners() {
        const categoryBtn = $('.category-btn');
        const collapse = $('#collapse-container');

        categoryBtn.on('mousemove', (e) => {
            this.loadSubCategoryHtml(e);
            collapse.collapse('show');
            $('.category-btn span').not($(e.currentTarget).children('span')).removeClass('category-span');
            $(e.currentTarget).children('span').addClass('category-span');

            $('a.list-item-subcategory').on('click', (el) => {
                const clickedElement = this.allProducts.find((p) => p.title === el.currentTarget.innerHTML);
                if (this.onClickCallback) {
                    this.onClickCallback('productPage', clickedElement.id);
                }
                collapse.collapse('toggle');
            });
        });
        categoryBtn.on('click', () => {
            collapse.collapse('toggle');
        });


        $('#navigation').on('mousemove', () => {
            collapse.collapse('hide');
            $('.category-btn span').removeClass('category-span');
        });
        $('#content').on('mousemove', () => {
            collapse.collapse('hide');
            $('.category-btn span').removeClass('category-span');
        });

    }
}
