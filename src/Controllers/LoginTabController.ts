import { login } from "../user_manager/user";

export function createLoginTab() {
    const loginContainer = document.createElement('div');
    loginContainer.classList.add('main-window');
    loginContainer.classList.add('container');

    const loginHeader = document.createElement('div');
    loginHeader.classList.add('login-header');
    const heading = document.createElement('h2');
    heading.textContent = 'Login';
    loginHeader.appendChild(heading);

    const loginForm = document.createElement('div');
    loginForm.classList.add('login-form');

    const formGroup1 = createFormGroup('username', 'text', 'Enter your username');
    const formGroup2 = createFormGroup('password', 'password', 'Enter your password');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Login';
    submitButton.addEventListener('click', handleLogin);

    loginForm.appendChild(formGroup1);
    loginForm.appendChild(formGroup2);
    loginForm.appendChild(submitButton);

    loginContainer.appendChild(loginHeader);
    loginContainer.appendChild(loginForm);

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
