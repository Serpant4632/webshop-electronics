// Programmed by Leon

class Page {
    pageName;

    constructor(pageName) {
        this.pageName = pageName;
    }

    render(parentSelector) {
        $(parentSelector).load(`./pages/${this.pageName}/${this.pageName}.html`);
    }
}
