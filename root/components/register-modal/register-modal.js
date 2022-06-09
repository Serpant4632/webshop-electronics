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
        });
        $('#btn-sign-up').on('click', () => {
            let newAccount = {
                firstName: $('#form-first-name').html(),
                lastName: $('#form-last-name').html(),
                email: $('#form-email').html(),
                address: $('#form-address').html(),
                password: $('#form-password').html(),
                repPassword: $('#form-rep-password').html(),
                signup: $('#btn-sign-up').html()
            }
            console.log(newAccount.signup);
            console.log(newAccount.firstName);
            console.log(newAccount.lastName);
            console.log(newAccount.email);
            this.userDatabaseService.postDatabaseContent(newAccount);
        });
    }
}