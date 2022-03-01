
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');


    form.addEventListener('submit', e => {
        e.preventDefault();

        validateInputs();
    });
    //error
    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success')
    }
    //sucsess
    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const validateInputs = () => {
        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
    
        
    
        if(usernameValue === '') {
            setError(username, 'Name is required');
        } else if (usernameValue.length < 3 || usernameValue.length > 10) {
            setError(username, 'Name must be more than 3 and less than 10');
        } else {
            setSuccess(username);
        }

    

        if(emailValue === '') {
             setError(email, 'Email is required');
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Provide a valid email address');
        } else {
            setSuccess(email);
        }


    };
    const navToggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".links");

    navToggle.addEventListener("click", function () {
    links.classList.toggle("show-links");
    console.log("hh");
    });



/*dark*/



const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});