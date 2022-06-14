class LoginModal {
    onClickCallback;
    userDatabaseService;

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
            const loginForm = $('#login-form');
            loginForm.on('submit', (event) => {
                event.preventDefault();
                let signin = {
                    email: $('#form-email').val(),
                    password: $('#form-password').val(),
                    login: $('#btn-sign-in').html()
                }
                console.log(signin);
                this.userDatabaseService.postUserContent(signin).then((res) => {
                    if (res.status != '200') {
                        wrongCredentials.removeClass('error');
                    }
                    else {
                        wrongCredentials.addClass('error');
                        this.userDatabaseService.getDatabaseUserById(signin.email).then((res) => {
                            console.log(res);
                            sessionStorage.setItem('customerID', res.id);
                            console.log(sessionStorage.getItem('customerID'));
                        });
                        loginModal.hide();
                        console.log(loginModal);
                        this.onClickCallback('myAccount');
                        new Navigation(navigatePage).render('#navigation');
                    }
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