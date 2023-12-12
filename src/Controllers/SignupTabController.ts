export function createSignUpTab() {
    const signUpContainer = document.createElement('div');
    signUpContainer.classList.add('main-window');
    signUpContainer.classList.add('container');
    signUpContainer.id = "11"

    const signUpHeader = document.createElement('div');
    signUpHeader.classList.add('signup-header');
    const heading = document.createElement('h2');
    heading.textContent = 'Sign Up';
    signUpHeader.appendChild(heading);

    const signUpForm = document.createElement('div');
    signUpForm.classList.add('signup-form');

    const formGroup1 = createFormGroup('username', 'text', 'Enter your desired username');
    const formGroup2 = createFormGroup('password', 'password', 'Enter your password');
    const formGroup3 = createFormGroup('confirmPassword', 'password', 'Confirm your password');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Sign Up';
    submitButton.addEventListener('click', handleSignUp);

    signUpForm.appendChild(formGroup1);
    signUpForm.appendChild(formGroup2);
    signUpForm.appendChild(formGroup3);
    signUpForm.appendChild(submitButton);

    signUpContainer.appendChild(signUpHeader);
    signUpContainer.appendChild(signUpForm);

    const parentElement = document.getElementById('webview-container');
    parentElement.appendChild(signUpContainer);

    return signUpContainer;
}

function createFormGroup(inputId: string, inputType: string, placeholderText: string): HTMLDivElement {
    const formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    const inputField = document.createElement('input');
    inputField.type = inputType;
    inputField.id = inputId;
    inputField.placeholder = placeholderText;

    formGroup.appendChild(inputField);
    
    return formGroup;
}

function handleSignUp(event: Event): void{
    event.preventDefault();
    // Add your signup logic here
}

function openSignUpTab(){
    const tab = document.createElement('div');
    tab.className = 'tab fade-in tab-active';
    tab.id = `${this.currentTab}`;
    
    const title = document.createElement('p');
    title.textContent = 'Sign Up';
  
    const closeButton = document.createElement('button');
    closeButton.className = 'remove-tab-button';
    closeButton.textContent = 'x';
    closeButton.addEventListener('click', () => this.closeTab(tab));
    tab.addEventListener('click', () => this.changeUrl(Number(tab.getAttribute("id"))));
    tab.appendChild(title);
    tab.appendChild(closeButton);
    this.tabsContainer.insertBefore(tab, this.addTabButton);
  
    this.appManager.addSignUpTab(this.currentTab, tab);
    this.dispatcher.addTabAction(tab)
  
    const searchBarInput = this.searchBar.querySelector('#search-bar') as HTMLInputElement;
    searchBarInput.value = "";
  
    this.setStarFill("")
    this.currentTab++;
  }
