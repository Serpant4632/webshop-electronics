class Impressum extends Page {
    onClickCallback;
    
    constructor(onClickCallback) {
        super('impressum')
        this.onClickCallback = onClickCallback;
    }


    render(parentSelector) { 
        $(parentSelector).load('./pages/impressum/impressum.html', () => {
            $('.footer-item').on('click', (e) => {
                console.log(`${e.currentTarget.id} was clicked`);
                if (this.onClickCallback)
                    this.onClickCallback(e.currentTarget.id);
            });
        });
    }
}