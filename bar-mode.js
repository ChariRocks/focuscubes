// Function to switch between normal and bar mode
function switchToBarMode() {
  const body = document.body;
  if (!body.classList.contains('bar-mode-active')) {
    // Switching to bar mode
    body.classList.add('bar-mode-active');

    // Create bar if it doesn't exist
    if (!document.querySelector('.bar-mode')) {
      const bar = document.createElement('div');
      bar.className = 'bar-mode';
      bar.innerHTML = `
        <div class="bar-mode-content">
          <img src="images/focuscubeslogo.png" alt="Focus Cubes" class="h-8">
          <div class="bar-mode-buttons" id="barModeButtons">
            <!-- Buttons will be added dynamically -->
          </div>
          <button class="normal-view-toggle" onclick="toggleBarMode()">Exit Bar Mode</button>
        </div>
      `;
      document.body.prepend(bar);

      // Populate with bar mode buttons
      populateBarModeButtons();
    }

    // Hide the toggle bar mode button if on index page
    const toggleButton = document.querySelector('.bar-mode-toggle');
    if (toggleButton) toggleButton.style.display = 'none';

    // Store bar mode state in localStorage
    localStorage.setItem('barModeActive', 'true');
  }
}

// Function to open MoodBlocks in a popup window
function openMoodBlocksPopup() {
  if (!document.body.classList.contains('bar-mode-active')) {
    return false; // Only open popup in bar mode
  }

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'popup-meditation-overlay';

  // Create container
  const container = document.createElement('div');
  container.className = 'popup-meditation-container';
  container.style.zIndex = '1000'; // Increased z-index

  // Create header
  const header = document.createElement('div');
  header.className = 'popup-meditation-header';

  const title = document.createElement('h3');
  title.className = 'text-lg font-medium text-slate-800';
  title.textContent = 'Mood Tracker';

  const closeButton = document.createElement('button');
  closeButton.className = 'popup-meditation-close';
  closeButton.innerHTML = '<i class="ph ph-x"></i>';
  closeButton.onclick = closePopupMeditation;

  header.appendChild(title);
  header.appendChild(closeButton);

  // Create iframe to load the MoodBlocks content
  const content = document.createElement('div');
  content.className = 'popup-meditation-content';

  const iframe = document.createElement('iframe');
  iframe.src = 'MoodBlocks.html';
  iframe.className = 'w-full h-full border-none';

  // Add onload event to optimize loading
  iframe.onload = function() {
    // Show content after it's fully loaded
    overlay.classList.add('active');
  };

  content.appendChild(iframe);

  // Append components
  container.appendChild(header);
  container.appendChild(content);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  // Make the container draggable
  makeDraggable(container, header);

  return true;
}

// Function to open Remember Your Why in a popup window
function openRememberWhyPopup() {
  if (!document.body.classList.contains('bar-mode-active')) {
    return false; // Only open popup in bar mode
  }

  // Create overlay with loading indicator
  const overlay = document.createElement('div');
  overlay.className = 'popup-meditation-overlay';

  // Show loading indicator
  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'text-center p-8';
  loadingIndicator.innerHTML = `
    <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
    <p class="text-gray-600">Loading...</p>
  `;
  overlay.appendChild(loadingIndicator);
  document.body.appendChild(overlay);

  // Show overlay immediately for feedback
  overlay.classList.add('active');

  // Create container
  const container = document.createElement('div');
  container.className = 'popup-meditation-container';
  container.style.zIndex = '1000'; // Increased z-index
  container.style.display = 'none'; // Hide until loaded

  // Create header
  const header = document.createElement('div');
  header.className = 'popup-meditation-header';

  const title = document.createElement('h3');
  title.className = 'text-lg font-medium text-slate-800';
  title.textContent = 'Remember Your Why';

  const closeButton = document.createElement('button');
  closeButton.className = 'popup-meditation-close';
  closeButton.innerHTML = '<i class="ph ph-x"></i>';
  closeButton.onclick = closePopupMeditation;

  header.appendChild(title);
  header.appendChild(closeButton);

  // Create iframe to load the Remember Your Why content
  const content = document.createElement('div');
  content.className = 'popup-meditation-content';

  const iframe = document.createElement('iframe');
  iframe.src = 'rememberyourwhy.html';
  iframe.className = 'w-full h-full border-none';

  // When iframe loads, show container and remove loading indicator
  iframe.onload = function() {
    overlay.removeChild(loadingIndicator);
    overlay.appendChild(container);
    container.style.display = 'flex';
  };

  content.appendChild(iframe);

  // Append components
  container.appendChild(header);
  container.appendChild(content);

  // Make the container draggable
  makeDraggable(container, header);

  return true;
}

// Placeholder for other functions (closePopupMeditation, populateBarModeButtons, makeDraggable, toggleBarMode)
function closePopupMeditation() {
  //Implementation to close the popup
}

function populateBarModeButtons(){
  //Implementation to populate bar mode buttons
}

function makeDraggable(element, handle){
  //Implementation to make element draggable
}

function toggleBarMode(){
  //Implementation to toggle bar mode
}