// Selecting DOM elements
const bar: HTMLElement | null = document.getElementById('bar');
const close: HTMLElement | null = document.getElementById('close');
const nav: HTMLElement | null = document.getElementById('navbar');

// Event listener for opening the navbar
if (bar) {
    bar.addEventListener('click', (): void => {
        if (nav) {
            nav.classList.add('active');
        }
    });
}

// Event listener for closing the navbar
if (close) {
    close.addEventListener('click', (): void => {
        if (nav) {
            nav.classList.remove('active');
        }
    });
}