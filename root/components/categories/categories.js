const json = {
    data: [
        
    ]
}

class Categories {
    onClickCallback;
    mouseoutOfCategoryBtn = true;
    mouseoutOfCollapse = true;

    constructor(onClick) {
        this.onClickCallback = onClick;
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
