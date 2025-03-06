
// Popup Meditation Functionality
let popupCurrentPhase = 'instruction';
let popupCurrentCycle = 1;
let popupTimeLeft = 4;
let popupBreathingInterval;
let activePopup = null;

function createMeditationPopup(title) {
  // Create popup container
  const popup = document.createElement('div');
  popup.className = 'popup-meditation';
  popup.innerHTML = `
    <div class="popup-header">
      <h3>${title}</h3>
      <button class="popup-close">&times;</button>
    </div>
    <div class="popup-content">
      <div class="popup-instruction-phase">
        <div class="popup-text">
          <p>Find a comfortable position</p>
          <p>Follow the cube's rhythm for breathing</p>
          <p>Starting in <span class="popup-countdown">3</span>...</p>
        </div>
      </div>
      
      <div class="popup-breathing-phase" style="display: none;">
        <div class="popup-text">
          <p>Cycle <span class="popup-cycle-count">1</span> of 3</p>
          <p class="popup-breathing-text">Breathe in with the cube...</p>
        </div>
        <div class="popup-cube-container">
          <div class="popup-cube">
            <span class="popup-timer">4</span>
          </div>
        </div>
      </div>
      
      <div class="popup-complete-phase" style="display: none;">
        <div class="popup-text">
          <p>Well done!</p>
          <p>How do you feel?</p>
        </div>
      </div>
    </div>
    <div class="popup-footer">
      <button class="popup-button secondary popup-minimize">Minimize</button>
      <button class="popup-button popup-close-btn">Close</button>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  // Add event listeners
  popup.querySelector('.popup-close').addEventListener('click', () => closePopup(popup));
  popup.querySelector('.popup-close-btn').addEventListener('click', () => closePopup(popup));
  popup.querySelector('.popup-minimize').addEventListener('click', () => minimizePopup(popup));
  
  // Show popup with animation
  setTimeout(() => {
    popup.classList.add('active');
  }, 50);
  
  // Start meditation sequence
  startPopupInstructionPhase(popup);
  
  return popup;
}

function startPopupInstructionPhase(popup) {
  const countdown = popup.querySelector('.popup-countdown');
  let countdownValue = 3;
  
  const instructionInterval = setInterval(() => {
    countdownValue--;
    countdown.textContent = countdownValue;
    
    if (countdownValue <= 0) {
      clearInterval(instructionInterval);
      startPopupBreathingPhase(popup);
    }
  }, 1000);
}

function startPopupBreathingPhase(popup) {
  const instructionPhase = popup.querySelector('.popup-instruction-phase');
  const breathingPhase = popup.querySelector('.popup-breathing-phase');
  
  instructionPhase.style.display = 'none';
  breathingPhase.style.display = 'block';
  
  popupCurrentCycle = 1;
  popupCurrentPhase = 'hold2';  // Start with small cube
  popupTimeLeft = 4;
  
  updatePopupBreathingUI(popup);
  
  // Add a small delay before starting the inhale phase
  setTimeout(() => {
    popupCurrentPhase = 'inhale';  // Now switch to inhale
    updatePopupBreathingUI(popup);  // Update UI to start the expansion
    popupBreathingInterval = setInterval(() => updatePopupBreathing(popup), 1000);
  }, 100);
}

function updatePopupBreathing(popup) {
  popupTimeLeft--;
  
  if (popupTimeLeft <= 0) {
    switch(popupCurrentPhase) {
      case 'inhale':
        popupCurrentPhase = 'hold1';
        popupTimeLeft = 4;
        break;
      case 'hold1':
        popupCurrentPhase = 'exhale';
        popupTimeLeft = 4;
        break;
      case 'exhale':
        popupCurrentPhase = 'hold2';
        popupTimeLeft = 4;
        break;
      case 'hold2':
        if (popupCurrentCycle < 3) {
          popupCurrentCycle++;
          popupCurrentPhase = 'inhale';
          popupTimeLeft = 4;
        } else {
          clearInterval(popupBreathingInterval);
          showPopupCompletePhase(popup);
          return;
        }
        break;
    }
  }
  
  updatePopupBreathingUI(popup);
}

function updatePopupBreathingUI(popup) {
  const cube = popup.querySelector('.popup-cube');
  const timer = popup.querySelector('.popup-timer');
  const breathingText = popup.querySelector('.popup-breathing-text');
  const cycleCount = popup.querySelector('.popup-cycle-count');
  
  cycleCount.textContent = popupCurrentCycle;
  timer.textContent = popupTimeLeft;
  
  breathingText.textContent = 
    popupCurrentPhase === 'inhale' ? 'Breathe in with the cube...' :
    popupCurrentPhase === 'hold1' || popupCurrentPhase === 'hold2' ? 'Hold...' :
    'Breathe out with the cube...';
  
  cube.style.transform = 
    (popupCurrentPhase === 'inhale' || popupCurrentPhase === 'hold1') ? 'scale(1.5)' : 'scale(1)';
  
  cube.style.backgroundColor = 
    (popupCurrentPhase === 'hold1' || popupCurrentPhase === 'hold2') ? '#fef9c3' : '#e0f2f1';
}

function showPopupCompletePhase(popup) {
  const breathingPhase = popup.querySelector('.popup-breathing-phase');
  const completePhase = popup.querySelector('.popup-complete-phase');
  
  breathingPhase.style.display = 'none';
  completePhase.style.display = 'block';
  
  // Create mini confetti effect
  createMiniConfetti(popup);
}

function createMiniConfetti(popup) {
  const colors = ['#86efac', '#fef9c3', '#e5e7eb'];
  const container = popup.querySelector('.popup-content');
  
  for (let i = 0; i < 20; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '2px';
    confetti.style.top = '0';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.transform = 'translateY(0) rotate(0deg)';
    confetti.style.opacity = '1';
    confetti.style.transition = 'all 3s ease-out';
    
    container.appendChild(confetti);
    
    // Animate confetti falling
    setTimeout(() => {
      confetti.style.transform = `translateY(${container.clientHeight}px) rotate(360deg)`;
      confetti.style.opacity = '0';
    }, 50);
    
    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

function closePopup(popup) {
  if (popupBreathingInterval) {
    clearInterval(popupBreathingInterval);
  }
  
  popup.classList.remove('active');
  
  setTimeout(() => {
    popup.remove();
    activePopup = null;
  }, 300);
}

function minimizePopup(popup) {
  popup.classList.toggle('minimized');
  if (popup.classList.contains('minimized')) {
    popup.style.height = '40px';
    popup.querySelector('.popup-content').style.display = 'none';
    popup.querySelector('.popup-minimize').textContent = 'Maximize';
  } else {
    popup.style.height = '550px';
    popup.querySelector('.popup-content').style.display = 'flex';
    popup.querySelector('.popup-minimize').textContent = 'Minimize';
  }
}

// Function to start popup meditation
function startPopupMeditation(title) {
  // Close existing popup if there is one
  if (activePopup) {
    closePopup(activePopup);
  }
  
  // Create and store new popup
  activePopup = createMeditationPopup(title);
}
