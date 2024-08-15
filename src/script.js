function showSection(sectionId) {
    // Get all sections
    const sections = document.querySelectorAll('.settings-section');
    
    // Loop through sections and display the selected one
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });

    // Update the active menu item
    const menuItems = document.querySelectorAll('.settings-menu ul li');
    menuItems.forEach(item => {
        if (item.getAttribute('onclick').includes(sectionId)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Show the first section by default
document.addEventListener('DOMContentLoaded', () => {
    showSection('account-settings');
});
