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
    }
}