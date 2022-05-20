class Navigation {
    onClickCallback;
    constructor(onClick) {
        this.onClickCallback = onClick;
    }

    render(parentSelector) {
        $(parentSelector).load('./components/navigation/navigation.html', () => {
            $('.nav-item').on('click', (e) => {
                console.log(`${e.currentTarget.id} was clicked`);
                // this.navigateTo(e.target.id);
                if (this.onClickCallback)
                    this.onClickCallback(e.currentTarget.id);
            })
            // this.navigateTo('home');
            // if (this.onClickCallback)
            //     this.onClickCallback('home');


            // open Sign-In Modal
            $('#my-account-sign-in-btn').on('click', (e) => {
                console.log(this);
                const loginModal = new LoginModal(this.onClickCallback);
                loginModal.render(parentSelector);
            });

            // open Register Modal
            $('#my-account-register-btn').on('click', (e) => {
                const registerModal = new RegisterModal(this.onClickCallback);
                registerModal.render(parentSelector);
                
            });
        });
    }

}



// function formIsCorrect() {
//     const email = $('#form-email').val();
//     const password = $('#form-password').val();

//     const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     const passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    
//     if (email.match(emailRegEx) && password.match(passwordRegEx)) {
//         console.log('true');
//         return true;
//     }else{
//         console.log('false');
//         return false;
//     }
// }