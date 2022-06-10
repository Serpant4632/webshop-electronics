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
            $('#btn-sign-up').on('click', () => {
                let newAccount = {
                    firstName: $('#form-first-name').val(),
                    lastName: $('#form-last-name').val(),
                    email: $('#form-email').val(),
                    address: $('#form-address').val(),
                    password: $('#form-password').val(),
                    repPassword: $('#form-rep-password').val(),
                    signup: $('#btn-sign-up').html()
                }
                console.log(newAccount);
                this.userDatabaseService.postDatabaseContent(newAccount);
            });
        });
    }
}