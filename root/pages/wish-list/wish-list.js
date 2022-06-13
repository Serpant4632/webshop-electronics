class WishList extends Page {
    constructor() {
        super('wish-list');
    }

    render(parentSelector) {
        $(parentSelector).load('./components/loading/loading.html', () => {
            $('.nav-item').on('click', (e) => {
                console.log(`${e.currentTarget.id} was clicked`);
                if (this.onClickCallback)
                    this.onClickCallback(e.currentTarget.id);
            });
        });
    }
}
