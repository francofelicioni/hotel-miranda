//Burger Menu

let burgerMenu = document.querySelector('.nav-bar__burger-menu');
let navBar = document.querySelector('.nav-bar__container');

burgerMenu.addEventListener ('click', () => {
    navBar.classList.toggle('active')
    burgerMenu.classList.toggle('animation');
})