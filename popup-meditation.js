
// Popup Meditation Window Functions
function createPopupMeditationWindow(meditationType) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'popup-meditation-overlay';
  
  // Create container
  const container = document.createElement('div');
  container.className = 'popup-meditation-container';
  
  // Create header
  const header = document.createElement('div');
  header.className = 'popup-meditation-header';
  
  const title = document.createElement('h3');
  title.className = 'text-lg font-medium text-slate-800';
  
  // Set title based on meditation type
  switch(meditationType) {
    case 'duringCall':
      title.textContent = 'During Call Reset';
      break;
    case 'focusClarity':
      title.textContent = 'Focus & Clarity';
      break;
    case 'compassion':
      title.textContent = 'Compassion';
      break;
    case 'energyReset':
      title.textContent = 'Energy Reset';
      break;
    default:
      title.textContent = 'Quick Reset';
  }
  
  const closeButton = document.createElement('button');
  closeButton.className = 'popup-meditation-close';
  closeButton.innerHTML = '<i class="ph ph-x"></i>';
  closeButton.onclick = closePopupMeditation;
  
  header.appendChild(title);
  header.appendChild(closeButton);
  
  // Create content
  const content = document.createElement('div');
  content.className = 'popup-meditation-content';
  
  // Create meditation screen
  const meditationScreen = document.createElement('div');
  meditationScreen.className = 'popup-meditation-screen';
  
  // Create instruction phase
  const instructionPhase = document.createElement('div');
  instructionPhase.className = 'popup-instruction-phase';
  instructionPhase.innerHTML = `
    <div class="text-center">
      <p class="text-xl text-slate-800 mb-4">Find a comfortable position</p>
      <p class="text-base text-slate-600">Follow the cube's rhythm for breathing</p>
      <p class="text-lg text-slate-800 mt-8">Starting in <span id="popup-instruction-count">3</span>...</p>
    </div>
  `;
  
  // Create breathing phase
  const breathingPhase = document.createElement('div');
  breathingPhase.className = 'popup-breathing-phase hidden';
  breathingPhase.innerHTML = `
    <p class="text-base text-slate-600 mb-4">Cycle <span id="popup-cycle-count">1</span> of 3</p>
    <p id="popup-breathing-text" class="text-lg text-slate-600 mb-6">Breathe in with the cube...</p>
    <div id="popup-breathing-cube" class="popup-breathing-cube bg-green-100">
      <span id="popup-timer" class="text-4xl font-light text-slate-800">4</span>
    </div>
  `;
  
  // Create complete phase
  const completePhase = document.createElement('div');
  completePhase.className = 'popup-complete-phase hidden';
  completePhase.innerHTML = `
    <div class="text-center">
      <h2 class="text-2xl font-light text-slate-800 mb-6">Well done!</h2>
      <div class="flex gap-3 mb-8">
        <button
          id="popup-restart-button"
          class="px-6 py-3 rounded-xl font-light border-2 border-green-600 text-green-700 hover:bg-green-50 transition-colors flex items-center gap-2"
        >
          <i class="ph ph-arrows-clockwise"></i>
          Another Reset
        </button>
        <button
          id="popup-close-button"
          class="px-6 py-3 rounded-xl font-light bg-green-600 text-white hover:bg-green-700 transition-colors"
        >
          Feel Better
        </button>
      </div>
    </div>
  `;
  
  // Append all phases to meditation screen
  meditationScreen.appendChild(instructionPhase);
  meditationScreen.appendChild(breathingPhase);
  meditationScreen.appendChild(completePhase);
  
  // Append meditation screen to content
  content.appendChild(meditationScreen);
  
  // Append header and content to container
  container.appendChild(header);
  container.appendChild(content);
  
  // Append container to overlay
  overlay.appendChild(container);
  
  // Append overlay to body
  document.body.appendChild(overlay);
  
  // Activate the popup with a slight delay for animation
  setTimeout(() => {
    overlay.classList.add('active');
  }, 10);
  
  // Set up event listeners for the complete screen buttons
  document.getElementById('popup-restart-button').addEventListener('click', () => {
    startPopupInstructionPhase();
  });
  
  document.getElementById('popup-close-button').addEventListener('click', () => {
    closePopupMeditation();
  });
  
  // Start the meditation
  startPopupInstructionPhase();
  
  return overlay;
}

function closePopupMeditation() {
  const overlay = document.querySelector('.popup-meditation-overlay');
  
  if (overlay) {
    // Remove active class to trigger exit animation
    overlay.classList.remove('active');
    
    // Clear any active intervals
    if (window.popupBreathingInterval) {
      clearInterval(window.popupBreathingInterval);
      window.popupBreathingInterval = null;
    }
    
    // Remove the element after animation completes
    setTimeout(() => {
      overlay.remove();
    }, 400); // Match the CSS transition duration
  }
}

function startPopupInstructionPhase() {
  const instructionPhase = document.querySelector('.popup-instruction-phase');
  const breathingPhase = document.querySelector('.popup-breathing-phase');
  const completePhase = document.querySelector('.popup-complete-phase');
  
  // Show instruction phase, hide others
  instructionPhase.classList.remove('hidden');
  breathingPhase.classList.add('hidden');
  completePhase.classList.add('hidden');
  
  let timeLeft = 3;
  document.getElementById('popup-instruction-count').textContent = timeLeft;
  
  const countdown = setInterval(() => {
    timeLeft--;
    document.getElementById('popup-instruction-count').textContent = timeLeft;
    
    if (timeLeft <= 0) {
      clearInterval(countdown);
      startPopupBreathingPhase();
    }
  }, 1000);
}

function startPopupBreathingPhase() {
  const instructionPhase = document.querySelector('.popup-instruction-phase');
  const breathingPhase = document.querySelector('.popup-breathing-phase');
  
  // Show breathing phase, hide instruction
  instructionPhase.classList.add('hidden');
  breathingPhase.classList.remove('hidden');
  
  // Initialize state
  let currentCycle = 1;
  let currentPhase = 'hold2';  // Start with small cube
  let timeLeft = 4;
  
  // Update UI to initial state
  updatePopupBreathingUI();
  
  // Add a small delay before starting the inhale phase
  setTimeout(() => {
    currentPhase = 'inhale';  // Now switch to inhale
    updatePopupBreathingUI();  // Update UI to start the expansion
    
    // Start the interval
    window.popupBreathingInterval = setInterval(() => {
      timeLeft--;
      
      if (timeLeft <= 0) {
        switch(currentPhase) {
          case 'inhale':
            currentPhase = 'hold1';
            timeLeft = 4;
            break;
          case 'hold1':
            currentPhase = 'exhale';
            timeLeft = 4;
            break;
          case 'exhale':
            currentPhase = 'hold2';
            timeLeft = 4;
            break;
          case 'hold2':
            if (currentCycle < 3) {
              currentCycle++;
              currentPhase = 'inhale';
              timeLeft = 4;
            } else {
              clearInterval(window.popupBreathingInterval);
              showPopupCompletePhase();
              return;
            }
            break;
        }
      }
      
      updatePopupBreathingUI();
    }, 1000);
  }, 100);
  
  function updatePopupBreathingUI() {
    const cube = document.getElementById('popup-breathing-cube');
    const timer = document.getElementById('popup-timer');
    const breathingText = document.getElementById('popup-breathing-text');
    document.getElementById('popup-cycle-count').textContent = currentCycle;
    
    timer.textContent = timeLeft;
    
    breathingText.textContent = 
      currentPhase === 'inhale' ? 'Breathe in with the cube...' :
      currentPhase === 'hold1' || currentPhase === 'hold2' ? 'Hold...' :
      'Breathe out with the cube...';
    
    cube.style.transform = 
      (currentPhase === 'inhale' || currentPhase === 'hold1') ? 'scale(1.5)' : 'scale(1)';
    
    cube.className = `popup-breathing-cube ${
      currentPhase === 'hold1' || currentPhase === 'hold2' ? 'bg-yellow-50' : 'bg-green-100'
    }`;
  }
}

function showPopupCompletePhase() {
  const breathingPhase = document.querySelector('.popup-breathing-phase');
  const completePhase = document.querySelector('.popup-complete-phase');
  
  // Show complete phase, hide breathing phase
  breathingPhase.classList.add('hidden');
  completePhase.classList.remove('hidden');
}

// Function to start meditation in popup from bar mode
function startPopupMeditationFromBarMode(meditationType) {
  if (document.body.classList.contains('bar-mode-active')) {
    createPopupMeditationWindow(meditationType);
    return true;
  }
  return false;
}
