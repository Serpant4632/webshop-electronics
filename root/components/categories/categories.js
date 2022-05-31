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

            categoryBtn.on('mouseover', (e) => {
                collapse.collapse('show');
                $('.category-btn span').not(e.currentTarget.children[0].classList.add('category-span')).removeClass('category-span');
                e.currentTarget.children[0].classList.add('category-span');
                //e.currentTarget.classList.add('category-span');
                //console.log($('.category-btn span').not($(e.currentTarget.localName))); 
                // $('.category-btn span').not($(e.currentTarget.cl)).css('background-color', 'red');
               // $('.category-btn span').addClass('category-span');
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
        });
    }
}
