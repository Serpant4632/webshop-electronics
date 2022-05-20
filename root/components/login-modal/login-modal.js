class LoginModal {
    onClickCallback;
    constructor(onClick) {
        this.onClickCallback = onClick;
    }

    render(parentSelector) {
        $(parentSelector).load('./components/login-modal/login-modal.html', () => {
            console.log(parentSelector);
            const myModalAlternative = new bootstrap.Modal('#loginModal', {});
            myModalAlternative.show();


            // $('.nav-item').on('click', (e) => {
            //     console.log(`${e.currentTarget.id} was clicked`);
            //     // this.navigateTo(e.target.id);
            //     if (this.onClickCallback)
            //         this.onClickCallback(e.currentTarget.id);
            // })
            



        });
    }
}