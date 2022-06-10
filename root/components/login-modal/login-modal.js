class LoginModal {
    onClickCallback;
    constructor(onClick) {
        this.onClickCallback = onClick;
    }

    render(parentSelector) {
        $(parentSelector).load('./components/login-modal/login-modal.html', () => {
            const loginModal = new bootstrap.Modal('#loginModal', {});
            loginModal.show();

            // try to login
            $('#btn-sign-up').on('click', () => {
                let signin = {
                    email: $('#form-email').val(),
                    password: $('#form-password').val(),
                    login: $('#btn-sign-in').html()
                }
                console.log(signin);
                this.userDatabaseService.postDatabaseContent(signin).then(() => {
                });
            });

            // open registermodal on btn "noch nicht registriert?"
            $('.btn-register').on('click', (e) => {
                loginModal.dispose();
                console.log(`${e.currentTarget.id} was clicked`);
                const registerModal = new RegisterModal(this.onClickCallback);
                registerModal.render($('#modal-container'));
            });
        });
    }
}