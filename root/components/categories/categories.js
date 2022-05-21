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

            const categoryBtnSel = $('.category-btn');

            categoryBtnSel.on('mouseover', (btn) => {
                console.log('OnBtn');
                this.mouseoutOfCategoryBtn = false;
                this.mouseoutOfCollapse = true;
                const collapseId = btn.currentTarget.getAttribute('href');

                $(collapseId).addClass('show');

                $(categoryBtnSel).on('mouseout', () => {
                    setTimeout(() => {
                        if (this.mouseoutOfCollapse === true) 
                            $(collapseId).removeClass('show');
                    }, 170);
                });

                $(collapseId).on('mouseover', () => {
                    console.log('OnCollapse');
                    this.mouseoutOfCollapse = false;
                    this.mouseoutOfCategoryBtn = true;


                    $(collapseId).on('mouseout', () => {
                        setTimeout(() => {
                            if (this.mouseoutOfCategoryBtn === true)
                                $(collapseId).removeClass('show');
                        }, 170);
                    });
                });


            });

            // categoryBtnSel.on('mouseout', (btn) => {
            //     const collapseId = btn.currentTarget.getAttribute('href');
            //     this.mouseoutOfCategoryBtn = true;

            //     if(this.mouseoutOfCollapse === true) 
            //         $(collapseId).removeClass('show');
            //     else
            //         $(collapseId).addClass('show');

            //     // setTimeout(() => {
            //     //     $(collapseId).removeClass('show');  
            //     // }, 300);
            //     // console.log(btnId);
            //     // console.log($(`div.collapse${btnId}`).html());
            //     // $(`div.collapse${btnId}`).on('mouse');
            // })
            //$(btn.currentTarget.getAttribute('href')).removeClass('show');

        });
    }

}
