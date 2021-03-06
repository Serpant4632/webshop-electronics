class RegisterModal {
    onClickCallback;
    userDatabaseService;

    constructor(onClick) {
        this.onClickCallback = onClick;
        this.userDatabaseService = new UserDatabaseService();
    }


    render(parentSelector) {
        $(parentSelector).load('./components/register-modal/register-modal.html', () => {
            const registerModal = new bootstrap.Modal('#registerModal', {});
            registerModal.show();

            // validate name
            const checkFirstName = $('#form-first-name');
            const errorFirstName = $('#wrong-input-first-name');
            checkFirstName.on('input', (e) => {
                const validString = /^([a-z]|[A-Z])*$/.test(checkFirstName.val());
                if (!validString) {
                    checkFirstName.addClass('invalid');
                    signInBtn.addClass('disabled');
                    errorFirstName.removeClass('error');
                } else {
                    checkFirstName.removeClass('invalid');
                    signInBtn.removeClass('disabled');
                    errorFirstName.addClass('error');
                }
            });

            // validate name
            const checkLastName = $('#form-last-name');
            const errorLastName = $('#wrong-input-last-name');
            checkLastName.on('input', (e) => {
                const validString = /^([a-z]|[A-Z])*$/.test(checkLastName.val());
                if (!validString) {
                    checkLastName.addClass('invalid');
                    signInBtn.addClass('disabled');
                    errorLastName.removeClass('error');
                } else {
                    checkLastName.removeClass('invalid');
                    signInBtn.removeClass('disabled');
                    errorLastName.addClass('error');

                }
            });

            // validate email and check if it's existing
            const checkEmail = $('#form-email');
            const occupiedEmail = $('#error-msg');
            checkEmail.on('input', (e) => {
                const substring = checkEmail.val();
                this.userDatabaseService.getEmailBySubstring(substring).then((res) => {
                    if (res.status == '409') {
                        checkEmail.addClass('invalid');
                        signInBtn.addClass('disabled');
                        occupiedEmail.removeClass('error');
                    }
                    else {
                        checkEmail.removeClass('invalid');
                        signInBtn.removeClass('disabled');
                        occupiedEmail.addClass('error');
                    }
                }).catch((error) => {
                });
            });

            // validate address
            const checkAddress = $('#form-address');
            const errorAddress = $('#wrong-input-address');
            checkAddress.on('input', (e) => {
                const validString = /^([a-z]|[A-Z]|[0-9]|[ ]|[.]|[-]|[,])*$/.test(checkAddress.val());
                if (!validString) {
                    checkAddress.addClass('invalid');
                    signInBtn.addClass('disabled');
                    errorAddress.removeClass('error');
                } else {
                    checkAddress.removeClass('invalid');
                    signInBtn.removeClass('disabled');
                    errorAddress.addClass('error');
                }
            });

            // validate password
            const checkPwd = $('#form-password');
            const checkRepPwd = $('#form-rep-password');
            const wrongRepPwd = $('#error-pwd');
            checkRepPwd.on('input', (e) => {
                if (checkPwd.val() !== checkRepPwd.val()) {
                    signInBtn.addClass('disabled');
                    checkRepPwd.addClass('invalid');
                    wrongRepPwd.removeClass('error');
                } else {
                    signInBtn.removeClass('disabled');
                    checkRepPwd.removeClass('invalid');
                    wrongRepPwd.addClass('error');

                }
            })

            // post new account and open Login Modal
            const registerForm = $('#register-form');
            const signInBtn = $('#btn-sign-up');
            console.log(registerForm);
            registerForm.on('submit', (event) => {
                event.preventDefault();
                let newAccount = {
                    firstName: $('#form-first-name').val(),
                    lastName: $('#form-last-name').val(),
                    email: $('#form-email').val(),
                    address: $('#form-address').val(),
                    password: $('#form-password').val(),
                    repPassword: $('#form-rep-password').val(),
                    signup: $('#btn-sign-up').html()
                }
                this.userDatabaseService.postUserContent(newAccount).then((res) => {
                    if (res.status != '201') {
                        signInBtn.addClass('disabled');
                    } else {
                        // open login model after signup
                        registerModal.dispose();
                        const loginModal = new LoginModal(this.onClickCallback);
                        loginModal.render($('#modal-container'));
                    }
                });
            });

            // open Sign-In modal via btn and destroy registerModal
            $('.my-account-sign-in-btn').on('click', (e) => {
                registerModal.dispose();
                console.log(`${e.currentTarget.id} was clicked`);
                const loginModal = new LoginModal(this.onClickCallback);
                loginModal.render($('#modal-container'));
            });
        });
    }
}