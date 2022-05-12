class Navigation {
    onClickCallback;
    constructor(onClick) {
        this.onClickCallback = onClick;
    }

    render(parentSelector) {
        $(parentSelector).load('./components/navigation/navigation.html', () => {
            $('.navbar a').on('click', (e) => {
                this.navigateTo(e.target.id);
                if (this.onClickCallback)
                    this.onClickCallback(e.target.id);
                    console.log('a Tag clicked');
            })
            this.navigateTo('home');
            if (this.onClickCallback)
                this.onClickCallback('home');
                console.log('navigated to Home');
            
        });
    }

    navigateTo(id) {
        $('.navbar a').removeClass('active');
        $(`.navbar a#${id}`).addClass('active');
    }
}
