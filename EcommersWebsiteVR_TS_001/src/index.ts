// Define types for DOM elements
const bar: HTMLElement | null = document.getElementById('bar');
const close: HTMLElement | null = document.getElementById('close');
const nav: HTMLElement | null = document.getElementById('navbar');

// Check if bar element exists and add click event listener
if (bar) {
    bar.addEventListener('click', (): void => {
        nav?.classList.add('active');
    });
}

// Check if close element exists and add click event listener
if (close) {
    close.addEventListener('click', (): void => {
        nav?.classList.remove('active');
    });
}