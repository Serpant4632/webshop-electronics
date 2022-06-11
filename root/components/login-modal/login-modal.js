class LoginModal {
    onClickCallback;
    constructor(onClick) {
        this.onClickCallback = onClick;
        this.userDatabaseService = new UserDatabaseService();
    }

    render(parentSelector) {
        $(parentSelector).load('./components/login-modal/login-modal.html', () => {
            const loginModal = new bootstrap.Modal('#loginModal', {});
            loginModal.show();

            // try to login
            const wrongCredentials = $('#errorMsg');
            const signInBtn = $('#btn-sign-in');
            signInBtn.on('click', () => {
                let signin = {
                    email: $('#form-email').val(),
                    password: $('#form-password').val(),
                    login: $('#btn-sign-in').html()
                }
                console.log(signin);
                this.userDatabaseService.postDatabaseContent(signin).then((res) => {
                    if (res.status != '200') {
                        wrongCredentials.removeClass('error');
                        loggedIn = null;
                    }
                    else {
                        wrongCredentials.addClass('error');
                        this.userDatabaseService.getDatabaseContentById(signin.email).then((res) => {
                            console.log(res);
                            loggedIn = res.id;
                            console.log(loggedIn);
                        });
                    }
                }).catch((error) => {
                });
                loginModal.modal('dispose');
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