class Impressum extends Page {
    
    constructor(onClickCallback) {
        super('impressum');
    }

    render(parentSelector) { 
        $(parentSelector).load('./pages/impressum/impressum.html', () => {
            // $('.footer-item').on('click', (e) => {
            //     console.log(`${e.currentTarget.id} was clicked`);
            //     if (this.onClickCallback)
            //         this.onClickCallback(e.currentTarget.id);
            // });
        });
    }
}