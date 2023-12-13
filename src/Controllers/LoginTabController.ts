import { login } from "../user_manager/user";
import axios from "axios";

export function createLoginTab() {
    const loginContainer = document.createElement('div');
    loginContainer.classList.add('main-window');
    loginContainer.classList.add('container');
    loginContainer.id = "login-container"

    const loginHeader = document.createElement('div');
    loginHeader.classList.add('login-header');
    loginHeader.id = "login-header"

    const heading = document.createElement('h2');
    heading.textContent = 'Login';
    heading.id = "heading"

    loginHeader.appendChild(heading);

    const loginForm = document.createElement('div');
    loginForm.classList.add('login-form');

    const formGroup1 = createFormGroup('username', 'text', 'Enter your username');
    formGroup1.id = "form-group1"

    const formGroup2 = createFormGroup('password', 'password', 'Enter your password');
    formGroup2.id = "form-group2"

    const submitButton = document.createElement('button');
    submitButton.id = "submit-button"

    submitButton.type = 'submit';
    submitButton.textContent = 'Login';
    submitButton.addEventListener('click', handleLogin);

    const signUpButton = document.createElement('button');
    signUpButton.textContent = 'Sign Up';
    signUpButton.addEventListener('click', openSignUpTab);

    loginForm.appendChild(formGroup1);
    loginForm.appendChild(formGroup2);
    loginForm.appendChild(submitButton);

    const signUpLink = document.createElement('p');
    signUpLink.textContent = 'Not a member yet? ';
    signUpLink.appendChild(signUpButton);
    signUpLink.id = "sign-up-link"

    loginContainer.appendChild(loginHeader);
    loginContainer.appendChild(loginForm);
    loginContainer.appendChild(signUpLink);

    const parentElement = document.getElementById('webview-container');
    parentElement.appendChild(loginContainer);

    return loginContainer;
}

function createSuccessPage(username:string) {
    const welcomeHeader = document.querySelector('.login-header h2');
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    // Clear text inputs
    if (usernameInput) {
        usernameInput.value = '';
    }
    if (passwordInput) {
        passwordInput.value = '';
    }

    // Change heading to "Welcome {username}"
    if (welcomeHeader) {
        welcomeHeader.textContent = `Welcome, ${username}!`;
    }
}

function openSignUpTab(){
    const heading = document.querySelector("#login-header")
    heading.textContent = 'Sign Up';

    const submitButton = document.querySelector("#submit-button")
    submitButton.textContent = 'Sign Up';

    submitButton.addEventListener('click', handleSignUp);

    const signUpLink = document.querySelector("#sign-up-link")
    signUpLink.remove()
}

function createFormGroup(id: string, type: string, placeholder: string): HTMLDivElement {
    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = `${capitalizeFirstLetter(id)}:`;

    const input = document.createElement('input');
    input.type = type;
    input.id = id;
    input.name = id;
    input.placeholder = placeholder;

    formGroup.appendChild(label);
    formGroup.appendChild(input);

    return formGroup;
}

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

async function handleLogin(event: Event) {
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Call the login function with the username and password as arguments
    login(username, password).then((r) => {
        if (r) {
            createSuccessPage(username)
        }
    })
}

function handleSignUp(event: Event): void{
    event.preventDefault();
    // Retrieve user input values
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;

    // Create an object with the data to be sent in the POST request
    const signUpData = {
        name: 'Ali',
        username: usernameInput.value,
        password: passwordInput.value,
    };

    axios.post('https://browser-bookmarker-backend.vercel.app/user', {
        name: signUpData.name,
        username: signUpData.username,
        password: signUpData.password
    })
        .then(response => {
            console.log('Response:', response.data);

            if (response.status === 200) {
                const signUpHeader = document.querySelector('.login-header h2');
                if (signUpHeader) {
                    signUpHeader.textContent = 'Success';
                }
            }
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);

            // Display an error message to the user if needed
            alert('An error occurred during signup. Please try again.');
        });
    
}
