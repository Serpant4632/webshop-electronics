class Impressum extends Page {
    
    constructor(onClickCallback) {
        super('impressum');
    }

    render(parentSelector) { 
        $(parentSelector).load('./pages/impressum/impressum.html', () => {
        });
    }
}