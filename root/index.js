window.onload = function () {
    const headline = document.querySelector('.header h1');
    headline.innerHTML = 'Neue Überschrift';

    const auto = {
        marke: 'Tesla',
    };

    const auto2 = {
        marke: 'VW',
    };

    auto2.marke = '123';

    printMyObject(auto);
    printMyObject(auto2);

    function printMyObject(object) {
        const keys = Object.keys(object);
        console.log(`Schlüssel: ${keys.join(', ')}`);
        console.log(object);
        console.log('firstObjectProp', object[keys[0]]);
    }

    const favoriteWordInput = document.querySelector('#favorite-word-container input');
    const favoriteWordContainer = document.querySelector('#favorite-word-container');
    favoriteWordInput.addEventListener('input', (e) => {
        console.log(e);
        console.log(favoriteWordInput.value);
        const validString = /^([a-z]|[A-Z])*$/.test(favoriteWordInput.value);
        if(!validString) {
            favoriteWordContainer.classList.add('invalid');
        } else {
            favoriteWordContainer.classList.remove('invalid');
        }
    });
}

function showFeedbackPanel() {
    console.log('feedback panel clicked');
    alert('feedback panel clicked!');
}



chfcgfcgcxgx