class LoginModal {
    onClickCallback;
    constructor(onClick) {
        this.onClickCallback = onClick;
    }

    render(parentSelector) {
        $(parentSelector).load('./components/login-modal/login-modal.html', () => {
            const loginModal = new bootstrap.Modal('#loginModal', {});
            loginModal.show();
        });
        $('#btn-sign-up').on('click', () => {
            let signin = {
                email: $('#form-email').val(),
                password: $('#form-password').val(),
                login: $('#btn-sign-in').val()
            }
            console.log(signin);
            this.userDatabaseService.postDatabaseContent(signin);
        });
    }
}