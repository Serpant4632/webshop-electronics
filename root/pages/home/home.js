class Home extends Page {
    constructor() {
        super('home');
    }

    // render(parentSelector) {
    //     $(parentSelector).load('./pages/home/home.html', () => {
    //         $('.nav-item').on('click', (e) => {
    //             console.log(`${e.currentTarget.id} was clicked`);
    //             // this.navigateTo(e.target.id);
    //             if (this.onClickCallback)
    //                 this.onClickCallback(e.currentTarget.id);
    //         })
    //         // this.navigateTo('home');
    //         // if (this.onClickCallback)
    //         //     this.onClickCallback('home');

    //     });
    // }
}