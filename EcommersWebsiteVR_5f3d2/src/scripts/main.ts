// main.ts

// Get DOM elements
const bar: HTMLElement | null = document.getElementById('bar');
const close: HTMLElement | null = document.getElementById('close');
const nav: HTMLElement | null = document.getElementById('navbar');

// Add event listener to the bar element if it exists
if (bar) {
    bar.addEventListener('click', (): void => {
        nav?.classList.add('active');
    });
}

// Add event listener to the close element if it exists
if (close) {
    close.addEventListener('click', (): void => {
        nav?.classList.remove('active');
    });
}