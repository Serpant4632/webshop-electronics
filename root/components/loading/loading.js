class Loading {
    onClickCallback;
    constructor(onClick) {
        this.onClickCallback = onClick;
    }

    render(parentSelector) {
        $(parentSelector).load('./components/navigation/navigation.html', () => {
            $('body').addClass('active');
            $('.navbar a').on('click', (e) => {
                this.navigateTo(e.target.id);
                if (this.onClickCallback){
                    this.onClickCallback(e.target.id);
                    $('body').removeClass('active');
                }
            })
            this.navigateTo('home');
            if (this.onClickCallback)
                this.onClickCallback('home');
        });
    }

    navigateTo(id) {
        $('.navbar a').removeClass('active');
        $(`.navbar a#${id}`).addClass('active');
    }
}
