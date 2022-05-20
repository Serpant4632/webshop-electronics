class RegisterModal {
    onClickCallback;
    constructor(onClick) {
        this.onClickCallback = onClick;
    }

    render(parentSelector) {
        $(parentSelector).load('./components/register-modal/register-modal.html', () => {
            console.log($('.modal.fade'));
            const myModalAlternative = new bootstrap.Modal('#registerModal', {});
            myModalAlternative.show();
            setTimeout(() => {
            
            }, 2000);


            // $('.nav-item').on('click', (e) => {
            //     console.log(`${e.currentTarget.id} was clicked`);
            //     // this.navigateTo(e.target.id);
            //     if (this.onClickCallback)
            //         this.onClickCallback(e.currentTarget.id);
            // })
            



        });
    }
}