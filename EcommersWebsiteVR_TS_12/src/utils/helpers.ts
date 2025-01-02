// Helper function to get an element by ID
const getElement = (id: string): HTMLElement | null => document.getElementById(id);

// Get DOM elements
const bar = getElement('bar');
const close = getElement('close');
const nav = getElement('navbar');

// Function to add 'active' class to navbar
const openNavbar = (): void => {
    if (nav) {
        nav.classList.add('active');
    }
};

// Function to remove 'active' class from navbar
const closeNavbar = (): void => {
    if (nav) {
        nav.classList.remove('active');
    }
};

// Event listeners
if (bar) {
    bar.addEventListener('click', openNavbar);
}

if (close) {
    close.addEventListener('click', closeNavbar);
}

export { openNavbar, closeNavbar };