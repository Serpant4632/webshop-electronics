class Categories {
    onClickCallback;
    productDatabaseService;
    subCategoriesInCategories = [];

    constructor(onClick) {
        this.onClickCallback = onClick;
        this.productDatabaseService = new ProductDatabaseService();
    }

    render(parentSelector) {
        $(parentSelector).load('./components/categories/categories.html', () => {
            $('.nav-item').on('click', (e) => {
                console.log(`${e.currentTarget.id} was clicked`);
                // this.navigateTo(e.target.id);
                if (this.onClickCallback)
                    this.onClickCallback(e.currentTarget.id);
            });

            this.setupListeners();

            this.loadCategoryData();
        });
    }

    loadCategoryData() {
        this.productDatabaseService.getDatabaseContent().then((res) => {
            console.log(res);
            this.categories = res;
            let arrFilteredSubCategories = [];
            this.categories.forEach((el) => {
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
                if(arrFilteredSubCategories[index + 1] && element.category === arrFilteredSubCategories[index + 1].category){
                    arrSubCategories.push(element.subCategory, arrFilteredSubCategories[index + 1].subCategory);
                }else {
                    arrFilteredCategories.push({
                        category: element.category,
                        subCategories: arrSubCategories,
                    });
                    arrSubCategories = [];
                }
            }
            this.subCategoriesInCategories = arrFilteredCategories;

           // const x = result.filter((el) => el.category ===  );
            // const filteredCategories = this.categories.map((el) => {
            //     return {
            //         category: el.category,
            //         subcategory: el.subCategory
            //     }
            // });
            // console.log(filteredCategories);
            // let filteredAgain;
            // filteredCategories.forEach((el) => {
            //     el.subcategory
            //     // f(!this.categories.includes()) 
            // });

            // const c = filteredCategories.map((el) => {
            //     if(this.categories.includes())
            // });
            // res.forEach((e) => {

            //     console.log(this.categories);
            //     console.log(filteredCategories);
            //     this.subcategories.forEach((el) => {
            //         if (!el.subcategories.includes(e.subcategory))
            //             el.subcategories.push(e.subcategory);
            //     });
            //     this.subcategories.push(
            //         {
            //             category: e.category,
            //             subcategories: e.subcategory
            //         }
            //     );
            //     // console.log(e);
            //     // if(!this.categories.includes(e.category)){
            //     //     this.categories.push(e.category);
            //     // }
            //     // if(!this.subcategories.includes(e.subcategory))
            //     //     this.subcategories.push(e.subcategory);
            // });
            // console.log(this.categories);
        });
    }

    setupListeners() {
        const categoryBtn = $('.category-btn');
        const collapse = $('#collapse-container');

        categoryBtn.on('mousemove', (e) => {
            collapse.collapse('show');
            $('.category-btn span').not($(e.currentTarget).children('span')).removeClass('category-span');
            $(e.currentTarget).children('span').addClass('category-span');
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
