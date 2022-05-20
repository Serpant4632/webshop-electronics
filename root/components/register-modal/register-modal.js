class RegisterModal {
    onClickCallback;
    constructor(onClick) {
        this.onClickCallback = onClick;
    }

    render(parentSelector) {
        $(parentSelector).load('./components/register-modal/register-modal.html', () => {
            const registerModal = new bootstrap.Modal('#registerModal', {});
            registerModal.show();
        });
    }
}