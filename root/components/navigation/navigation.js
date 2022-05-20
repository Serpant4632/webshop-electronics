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


        });
    }

    // navigateTo(id) {
    //     $('.navbar a').removeClass('active');
    //     $(`.navbar a#${id}`).addClass('active');
    // }

}

function openLoginModal() {
    
    const myModalAlternative = new bootstrap.Modal('#loginModal', {});
    myModalAlternative.show();


}

function openRegisterModel() {

}

function loginButtonPressed() {
    
    const email = $('#form-email').val();
    
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