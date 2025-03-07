
// Elements
function initBarMode() {
    const toggleViewModeBtn = document.getElementById('toggleViewMode');
    const barMode = document.getElementById('barMode');
    
    // Event Listeners
    if (toggleViewModeBtn) {
        toggleViewModeBtn.addEventListener('click', switchToBarMode);
    }
    
    // Functions for view mode switching
    window.switchToBarMode = function() {
        barMode.classList.remove('hidden');
        toggleViewModeBtn.classList.add('hidden');
        document.body.classList.add('bar-mode-active');
        
        // Save preference
        localStorage.setItem('viewMode', 'bar');
        
        console.log("Bar mode activated");
    };
    
    window.switchToNormalMode = function() {
        barMode.classList.add('hidden');
        toggleViewModeBtn.classList.remove('hidden');
        document.body.classList.remove('bar-mode-active');
        
        // Save preference
        localStorage.setItem('viewMode', 'normal');
    };
    
    window.toggleBarMode = function() {
        barMode.classList.toggle('bar-mode-expanded');
    };
    
    // Check saved preference on load
    const savedViewMode = localStorage.getItem('viewMode');
    if (savedViewMode === 'bar') {
        switchToBarMode();
    }
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initBarMode);
