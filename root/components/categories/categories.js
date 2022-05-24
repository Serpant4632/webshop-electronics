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

            const categoryBtn = $('.category-btn');
            const collapse = $('#collapse-container');
            const parentContainer = $('#categories');

            categoryBtn.on('mouseenter', (e) => {
                collapse.collapse('show');
            });
            parentContainer.on('mouseleave', (e) => {
                collapse.collapse('hide');
            });
        });
    }
}
