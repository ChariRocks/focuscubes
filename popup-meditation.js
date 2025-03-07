// Popup Meditation Window Functions
function createPopupMeditationWindow(meditationType) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'popup-meditation-overlay';

  // Create container
  const container = document.createElement('div');
  container.className = 'popup-meditation-container';

  // Make the container draggable
  makeDraggable(container);

  // Create header
  const header = document.createElement('div');
  header.className = 'popup-meditation-header';

  const title = document.createElement('h3');
  title.className = 'text-lg font-medium text-slate-800';

  // Set title and background color based on meditation type
  let headerColor = 'bg-white';
  let mainColor = 'bg-green-100';
  let highlightColor = 'bg-yellow-50';
  let buttonColor = 'border-green-600 text-green-700';
  let primaryButtonColor = 'bg-green-600 text-white hover:bg-green-700';

  switch(meditationType) {
    case 'duringCall':
      title.textContent = 'During Call Reset';
      break;
    case 'focusClarity':
      title.textContent = 'Clarity and Focus';
      mainColor = 'bg-emerald-50';
      highlightColor = 'bg-emerald-100';
      buttonColor = 'border-emerald-600 text-emerald-700';
      primaryButtonColor = 'bg-emerald-600 text-white hover:bg-emerald-700';
      break;
    case 'compassion':
      title.textContent = 'Grow Compassion';
      mainColor = 'bg-rose-50';
      highlightColor = 'bg-rose-100';
      buttonColor = 'border-rose-600 text-rose-700';
      primaryButtonColor = 'bg-rose-600 text-white hover:bg-rose-700';
      break;
    case 'energyReset':
      title.textContent = 'Energy Reset';
      mainColor = 'bg-green-50';
      highlightColor = 'bg-yellow-100';
      buttonColor = 'border-green-600 text-green-700';
      primaryButtonColor = 'bg-green-600 text-white hover:bg-green-700';
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

  // Focus & Clarity special content
  if (meditationType === 'focusClarity') {
    content.innerHTML = `
      <div class="max-w-md mx-auto p-6">
        <div class="space-y-8 text-center">
          <h2 class="text-2xl font-medium text-slate-800">Clarity and Focus</h2>
          <p class="text-lg text-slate-600">Choose your 2-minute practice</p>

          <div class="flex flex-col gap-4">
            <button id="popup-body-scan-button" 
              class="px-6 py-4 bg-emerald-50 rounded-xl hover:bg-emerald-100 
                   active:bg-emerald-200 transition-colors text-lg font-medium">
              Body Scan
              <p class="text-sm text-slate-600 mt-1">Feel and relax each part of your body</p>
            </button>
            <button id="popup-breath-awareness-button"
              class="px-6 py-4 bg-green-50 rounded-xl hover:bg-green-100 
                   active:bg-green-200 transition-colors text-lg font-medium">
              Breath Awareness
              <p class="text-sm text-slate-600 mt-1">Focus on the sensations of breathing</p>
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.appendChild(container);
    container.appendChild(header);
    container.appendChild(content);

    // Activate the popup with a slight delay for animation
    setTimeout(() => {
      overlay.classList.add('active');
    }, 10);

    // Set up event listeners for the buttons
    document.getElementById('popup-body-scan-button').addEventListener('click', () => {
      closePopupMeditation();
      setTimeout(() => {
        createFocusClarityMeditationPopup('bodyScan');
      }, 400);
    });

    document.getElementById('popup-breath-awareness-button').addEventListener('click', () => {
      closePopupMeditation();
      setTimeout(() => {
        createFocusClarityMeditationPopup('breathAwareness');
      }, 400);
    });

    return overlay;
  }

  // Compassion special content
  if (meditationType === 'compassion') {
    content.innerHTML = `
      <div class="max-w-md mx-auto p-6">
        <div class="space-y-8 text-center">
          <h2 class="text-2xl font-medium text-slate-800">Grow Compassion</h2>
          <p class="text-lg text-slate-600">Follow the breathing guidance</p>
          <div class="space-y-2 text-base text-slate-600">
            <p>• Breathe in as the cube expands</p>
            <p>• Breathe out as it contracts</p>
          </div>
          <p class="text-base text-slate-500">Choose your duration:</p>

          <div class="flex flex-col gap-4">
            <button id="popup-brief-button" 
              class="px-6 py-4 bg-rose-50 rounded-xl hover:bg-rose-100 
                   active:bg-rose-200 transition-colors text-lg font-medium">
              90 Seconds
            </button>
            <button id="popup-full-button"
              class="px-6 py-4 bg-rose-200 rounded-xl hover:bg-rose-300 
                   active:bg-rose-400 transition-colors text-lg font-medium">
              2 Minutes
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.appendChild(container);
    container.appendChild(header);
    container.appendChild(content);

    // Activate the popup with a slight delay for animation
    setTimeout(() => {
      overlay.classList.add('active');
    }, 10);

    // Set up event listeners for the buttons
    document.getElementById('popup-brief-button').addEventListener('click', () => {
      closePopupMeditation();
      setTimeout(() => {
        createCompassionMeditationPopup('brief');
      }, 400);
    });

    document.getElementById('popup-full-button').addEventListener('click', () => {
      closePopupMeditation();
      setTimeout(() => {
        createCompassionMeditationPopup('full');
      }, 400);
    });

    return overlay;
  }

  // Energy Reset special content
  if (meditationType === 'energyReset') {
    content.innerHTML = `
      <div class="max-w-md mx-auto p-6">
        <div class="space-y-8 text-center">
          <h2 class="text-2xl font-medium text-slate-800">Quick Energy Reset</h2>
          <p class="text-lg text-slate-600">Use the power of double-breath to boost your energy in minutes</p>

          <div class="space-y-4 bg-green-50 p-6 rounded-xl text-left">
            <p class="font-medium text-slate-700">How it works:</p>
            <ul class="space-y-2 text-slate-600">
              <li>1. Take a full breath in</li>
              <li>2. Now breathe in a little more air</li>
              <li>3. Hold briefly</li>
              <li>4. Exhale completely</li>
            </ul>
          </div>

          <p class="text-base text-slate-500">Select your session duration:</p>

          <div class="flex gap-3 justify-center flex-wrap">
            <button id="popup-short-button" 
              class="px-5 py-3 bg-green-100 rounded-xl hover:bg-green-200 
                   active:bg-green-300 transition-colors text-base font-medium">
              30 Seconds
            </button>
            <button id="popup-medium-button"
              class="px-5 py-3 bg-green-100 rounded-xl hover:bg-green-200 
                   active:bg-green-300 transition-colors text-base font-medium">
              1 Minute
            </button>
            <button id="popup-long-button"
              class="px-5 py-3 bg-green-100 rounded-xl hover:bg-green-200 
                   active:bg-green-300 transition-colors text-base font-medium">
              2 Minutes
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.appendChild(container);
    container.appendChild(header);
    container.appendChild(content);

    // Activate the popup with a slight delay for animation
    setTimeout(() => {
      overlay.classList.add('active');
    }, 10);

    // Set up event listeners for the buttons
    document.getElementById('popup-short-button').addEventListener('click', () => {
      closePopupMeditation();
      setTimeout(() => {
        createEnergyResetMeditationPopup(0.5);
      }, 400);
    });

    document.getElementById('popup-medium-button').addEventListener('click', () => {
      closePopupMeditation();
      setTimeout(() => {
        createEnergyResetMeditationPopup(1);
      }, 400);
    });

    document.getElementById('popup-long-button').addEventListener('click', () => {
      closePopupMeditation();
      setTimeout(() => {
        createEnergyResetMeditationPopup(2);
      }, 400);
    });

    return overlay;
  }

  // Default meditation content (During Call Reset)
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
    <div id="popup-breathing-cube" class="popup-breathing-cube ${mainColor}">
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
          class="px-6 py-3 rounded-xl font-light border-2 ${buttonColor} hover:bg-green-50 transition-colors flex items-center gap-2"
        >
          <i class="ph ph-arrows-clockwise"></i>
          Another Reset
        </button>
        <button
          id="popup-close-button"
          class="px-6 py-3 rounded-xl font-light ${primaryButtonColor} transition-colors"
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

  // Add a larger delay before starting the inhale phase
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
  }, 500); // 500ms delay (increased from 100ms)

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

// Create Focus & Clarity meditation popup
function createFocusClarityMeditationPopup(type) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'popup-meditation-overlay';

  // Create container
  const container = document.createElement('div');
  container.className = 'popup-meditation-container';

  // Make the container draggable
  makeDraggable(container);

  // Create header
  const header = document.createElement('div');
  header.className = 'popup-meditation-header';

  const title = document.createElement('h3');
  title.className = 'text-lg font-medium text-slate-800';
  title.textContent = 'Clarity and Focus';

  const closeButton = document.createElement('button');
  closeButton.className = 'popup-meditation-close';
  closeButton.innerHTML = '<i class="ph ph-x"></i>';
  closeButton.onclick = closePopupMeditation;

  header.appendChild(title);
  header.appendChild(closeButton);

  // Create content for the meditation
  const content = document.createElement('div');
  content.className = 'popup-meditation-content';

  // Create instruction screen first
  const instructionScreen = document.createElement('div');
  instructionScreen.className = 'flex-1 flex flex-col items-center justify-center p-6';
  instructionScreen.innerHTML = `
    <div class="text-center">
      <p class="text-xl text-slate-800 mb-4">Find a comfortable position</p>
      <p class="text-base text-slate-600">Follow the guided breathing practice</p>
      <p class="text-lg text-slate-800 mt-8">Starting in <span id="popup-fc-instruction-count">3</span>...</p>
    </div>
  `;

  content.appendChild(instructionScreen);

  // Append components
  container.appendChild(header);
  container.appendChild(content);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  // Activate the popup with a slight delay for animation
  setTimeout(() => {
    overlay.classList.add('active');
  }, 10);

  // Start the 3-second countdown
  let timeLeft = 3;
  const countdownElement = document.getElementById('popup-fc-instruction-count');
  countdownElement.textContent = timeLeft;

  const countdown = setInterval(() => {
    timeLeft--;
    countdownElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      // Replace instruction screen with meditation content
      content.innerHTML = '';
      startFocusClarityMeditation(content, type);
    }
  }, 1000);

  return overlay;
}

function startFocusClarityMeditation(content, type) {
  // Define breath patterns based on selection
  const bodyScanBreaths = [
    // Start with feet and legs
    {
      inhale: "Feel your toes and feet",
      exhale: "Let them soften and relax"
    },
    {
      inhale: "Aware of your ankles and calves",
      exhale: "Release any tension there"
    },
    {
      inhale: "Notice your knees and thighs",
      exhale: "Allow them to relax completely"
    },
    // Torso and arms
    {
      inhale: "Feel your hips and lower back",
      exhale: "Let them sink into the chair"
    },
    {
      inhale: "Aware of your stomach and chest",
      exhale: "Feel them release with the breath"
    },
    {
      inhale: "Notice your shoulders and arms",
      exhale: "Let them drop and soften"
    },
    // Head and neck
    {
      inhale: "Feel your neck and throat",
      exhale: "Allow any tension to dissolve"
    },
    {
      inhale: "Aware of your face and jaw",
      exhale: "Let your expression soften"
    },
    // Whole body
    {
      inhale: "Feel your whole body",
      exhale: "Letting everything relax"
    },
    {
      inhale: "Present with your entire body",
      exhale: "Resting in awareness"
    }
  ];

  const breathAwarenessBreaths = [
    // Initial settling
    {
      inhale: "Notice the breath coming in",
      exhale: "Follow the breath flowing out"
    },
    {
      inhale: "Feel where the breath is clearest",
      exhale: "Stay with that sensation"
    },
    // Detailed awareness
    {
      inhale: "Notice the beginning of the breath",
      exhale: "Notice the end of the breath"
    },
    {
      inhale: "Feel the cool air entering",
      exhale: "Feel the warm air leaving"
    },
    // Depth and quality
    {
      inhale: "Notice the depth of the breath",
      exhale: "Notice the length of the breath"
    },
    {
      inhale: "Feel the expansion",
      exhale: "Feel the release"
    },
    // Subtle sensations
    {
      inhale: "Notice the subtle sensations",
      exhale: "Let them come and go"
    },
    {
      inhale: "Feel the natural rhythm",
      exhale: "Rest in the flow of breath"
    },
    // Integration
    {
      inhale: "Breath flowing in",
      exhale: "Breath flowing out"
    },
    {
      inhale: "Present with each breath",
      exhale: "Clear and calm"
    }
  ];

  const breaths = type === 'bodyScan' ? bodyScanBreaths : breathAwarenessBreaths;
  const totalBreaths = breaths.length;
  const BREATH_DURATION = 4000; // 4 seconds

  // Create the screens
  const meditationDiv = document.createElement('div');
  meditationDiv.className = 'flex-1 flex flex-col items-center p-6';

  const cycleCount = document.createElement('p');
  cycleCount.id = 'popup-focus-cycle-count';
  cycleCount.className = 'text-xl text-slate-600 text-center mb-4';

  const breatheText = document.createElement('p');
  breatheText.id = 'popup-focus-breathe-text';
  breatheText.className = 'text-base text-slate-600 mt-2 text-center mb-8';

  const cubeContainer = document.createElement('div');
  cubeContainer.className = 'flex-1 flex items-center justify-center';

  const cube = document.createElement('div');
  cube.id = 'popup-focus-cube';
  cube.className = 'w-36 h-36 rounded-xl flex items-center justify-center shadow-xl bg-emerald-50 text-center p-6';

  const instruction = document.createElement('p');
  instruction.id = 'popup-focus-instruction';
  instruction.className = 'text-xl font-medium text-slate-700';

  cube.appendChild(instruction);
  cubeContainer.appendChild(cube);

  meditationDiv.appendChild(cycleCount);
  meditationDiv.appendChild(breatheText);
  meditationDiv.appendChild(cubeContainer);

  content.appendChild(meditationDiv);

  // Define meditation logic
  let currentBreath = 0;
  let phase = 'inhale';
  let timeoutRef;

  // Start the meditation sequence
  function startMeditation() {
    updateCycleDisplay();
    animateBreath();
  }

  function updateCycleDisplay() {
    cycleCount.textContent = `Breath ${currentBreath + 1} of ${totalBreaths}`;
  }

  async function animateBreath() {
    if (currentBreath >= totalBreaths) {
      showComplete();
      return;
    }

    // First ensure cube is small with no transition
    cube.style.transition = 'none';
    cube.style.transform = 'scale(1)';

    // Force a reflow to ensure small size is applied
    cube.offsetHeight;

    // Inhale phase - setup appearance
    phase = 'inhale';
    breatheText.textContent = 'Inhale with the cube';
    instruction.textContent = breaths[currentBreath].inhale;
    cube.className = 'w-36 h-36 rounded-xl flex items-center justify-center shadow-xl bg-emerald-100 text-center p-6';

    // Set up transition property
    cube.style.transition = `all ${BREATH_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    // Use timeout to ensure browser registers initial state before animating
    setTimeout(() => {
      cube.style.transform = 'scale(1.3)';
    }, 50);

    timeoutRef = setTimeout(() => {
      // Exhale phase
      phase = 'exhale';
      breatheText.textContent = 'Exhale with the cube';
      instruction.textContent = breaths[currentBreath].exhale;
      cube.className = 'w-36 h-36 rounded-xl flex items-center justify-center shadow-xl bg-emerald-50 text-center p-6';
      cube.style.transform = 'scale(1)';

      timeoutRef = setTimeout(() => {
        currentBreath++;
        animateBreath();
      }, BREATH_DURATION);
    }, BREATH_DURATION);
  }

  function showComplete() {
    // Clear any running timers
    if (timeoutRef) clearTimeout(timeoutRef);

    // Replace content with completion message
    content.innerHTML = `
      <div class="flex-1 flex flex-col items-center justify-center p-6">
        <div class="text-center space-y-6">
          <h2 class="text-2xl font-light text-slate-800 mb-6">Well done!</h2>
          <p class="text-xl text-slate-600 mb-6">
            ${type === 'bodyScan' 
              ? 'Your body is relaxed and your mind is clear' 
              : 'Your breath has brought you clarity and calm'}
          </p>
          <div class="flex gap-3 mb-8">
            <button
              id="popup-fc-restart-button"
              class="px-6 py-3 rounded-xl font-light border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center gap-2"
            >
              <i class="ph ph-arrows-clockwise"></i>
              Another Reset
            </button>
            <button
              id="popup-fc-close-button"
              class="px-6 py-3 rounded-xl font-light bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            >
              Feel Better
            </button>
          </div>
        </div>
      </div>
    `;

    // Create confetti effect
    createConfetti();

    // Set up buttons
    document.getElementById('popup-fc-restart-button').addEventListener('click', () => {
      closePopupMeditation();
      setTimeout(() => {
        createFocusClarityMeditationPopup(type);
      }, 400);
    });

    document.getElementById('popup-fc-close-button').addEventListener('click', () => {
      closePopupMeditation();
    });
  }

  // Start meditation
  startMeditation();

  return overlay;
}

// Create Compassion meditation popup
function createCompassionMeditationPopup(intensity) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'popup-meditation-overlay';

  // Create container
  const container = document.createElement('div');
  container.className = 'popup-meditation-container';

  // Make the container draggable
  makeDraggable(container);

  // Create header
  const header = document.createElement('div');
  header.className = 'popup-meditation-header';

  const title = document.createElement('h3');
  title.className = 'text-lg font-medium text-slate-800';
  title.textContent = 'Grow Compassion';

  const closeButton = document.createElement('button');
  closeButton.className = 'popup-meditation-close';
  closeButton.innerHTML = '<i class="ph ph-x"></i>';
  closeButton.onclick = closePopupMeditation;

  header.appendChild(title);
  header.appendChild(closeButton);

  // Create content for the meditation
  const content = document.createElement('div');
  content.className = 'popup-meditation-content';

  // Create instruction screen first
  const instructionScreen = document.createElement('div');
  instructionScreen.className = 'flex-1 flex flex-col items-center justify-center p-6';
  instructionScreen.innerHTML = `
    <div class="text-center">
      <p class="text-xl text-slate-800 mb-4">Find a comfortable position</p>
      <p class="text-base text-slate-600">Follow the compassion practice</p>
      <p class="text-lg text-slate-800 mt-8">Starting in <span id="popup-comp-instruction-count">3</span>...</p>
    </div>
  `;

  content.appendChild(instructionScreen);

  // Append components
  container.appendChild(header);
  container.appendChild(content);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  // Activate the popup with a slight delay for animation
  setTimeout(() => {
    overlay.classList.add('active');
  }, 10);

  // Start the 3-second countdown
  let timeLeft = 3;
  const countdownElement = document.getElementById('popup-comp-instruction-count');
  countdownElement.textContent = timeLeft;

  const countdown = setInterval(() => {
    timeLeft--;
    countdownElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      // Replace instruction screen with meditation content
      content.innerHTML = '';
      startCompassionMeditation(content, intensity);
    }
  }, 1000);

  return overlay;
}

function startCompassionMeditation(content, intensity) {

  // Define breath patterns based on selection
  const briefBreaths = [
    // 1. Two sighs (2 breaths)
    {
      inhale: "Take a deep breath",
      exhale: "Let it out with a sigh"
    },
    {
      inhale: "And another deep breath",
      exhale: "Let it go with a sigh"
    },
    // 2. Acceptance (2 breaths)
    {
      inhale: "Whatever I am feeling is ok",
      exhale: "It is totally normal to feel this"
    },
    {
      inhale: "Whatever I am feeling is ok",
      exhale: "I let it all go the best I can"
    },
    // 3. Self-kindness (2 breaths)
    {
      inhale: "Being gentle with myself",
      exhale: "I'm doing my best here"
    },
    {
      inhale: "I am taking care of myself",
      exhale: "One breath at a time"
    },
    // 4. Understanding others (1 breath)
    {
      inhale: "Everyone struggles sometimes",
      exhale: "And we do the best we can"
    },
    // 5. Building compassion (1 breath)
    {
      inhale: "We're all human here",
      exhale: ""It's important to be kind to eachother"
    }
  ];

  // 2 minutes = 12 breaths total
  const fullBreaths = [
    // 1. Two sighs (2 breaths)
    {
      inhale: "Take a deep breath",
      exhale: "Let it out with a sigh"
    },
    {
      inhale: "And another deep breathe",
      exhale: "Let it go with a sigh"
    },
    // 2. Acceptance (3 breaths)
    {
      inhale: "Whatever I am feeling is ok",
      exhale: "It is totally normal to feel this"
    },
    {
      inhale: "Whatever I am feeling is ok",
      exhale: "I let it all go the best I can"
    },
    {
      inhale: "Whatever I am feeling",
      exhale: "I can always be kinder to myself"
    },
    // 3. Self-kindness (3 breaths)
    {
      inhale: "Being gentle with myself",
      exhale: "I'm doing my best here"
    },
    {
      inhale: "I am taking care of myself",
      exhale: "One breath at a time"
    },
    {
      inhale: "I can be kinder to myself",
      exhale: "All it take is some practice"
    },
    // 4. Understanding others (2 breaths)
    {
      inhale: "Everyone struggles sometimes",
      exhale: "And we do the best we can"
    },
    {
      inhale: "Everyone has their own challenges",
      exhale: "And they may be doing the best they can"
    },
    // 5. Building compassion (2 breaths)
    {
      inhale: "We're all human here",
      exhale: "It helps to be kind to each other"
    },
    {
      inhale: "I can rest in more kindness",
      exhale: "With each breath that I take"
    }
  ];

  const breaths = intensity === 'brief' ? briefBreaths : fullBreaths;
  const totalBreaths = breaths.length;
  const BREATH_DURATION = 4000; // 4 seconds

  // Create the screens
  const meditationDiv = document.createElement('div');
  meditationDiv.className = 'flex-1 flex flex-col items-center p-6';

  const cycleCount = document.createElement('p');
  cycleCount.id = 'popup-compassion-cycle-count';
  cycleCount.className = 'text-xl text-slate-600 text-center mb-4';

  const breatheText = document.createElement('p');
  breatheText.id = 'popup-compassion-breathe-text';
  breatheText.className = 'text-base text-slate-600 mt-2 text-center mb-8';

  const cubeContainer = document.createElement('div');
  cubeContainer.className = 'flex-1 flex items-center justify-center';

  const cube = document.createElement('div');
  cube.id = 'popup-compassion-cube';
  cube.className = 'w-36 h-36 rounded-3xl flex items-center justify-center shadow-xl bg-rose-50 text-center p-6';

  const instruction = document.createElement('p');
  instruction.id = 'popup-compassion-instruction';
  instruction.className = 'text-xl font-medium text-slate-700';

  cube.appendChild(instruction);
  cubeContainer.appendChild(cube);

  meditationDiv.appendChild(cycleCount);
  meditationDiv.appendChild(breatheText);
  meditationDiv.appendChild(cubeContainer);

  content.appendChild(meditationDiv);

  // Define meditation logic
  let currentBreath = 0;
  let phase = 'inhale';
  let timeoutRef;

  // Start the meditation sequence
  function startMeditation() {
    updateCycleDisplay();
    animateBreath();
  }

  function updateCycleDisplay() {
    cycleCount.textContent = `Breath ${currentBreath + 1} of ${totalBreaths}`;
  }

  async function animateBreath() {
    if (currentBreath >= totalBreaths) {
      showComplete();
      return;
    }

    // First reset cube to small size with no transition
    cube.style.transition = 'none';
    cube.style.transform = 'scale(1)';

    // Force a reflow to ensure small size is applied
    cube.offsetHeight;

    // Inhale phase - setup appearance
    phase = 'inhale';
    breatheText.textContent = 'Inhale with the cube';
    instruction.textContent = breaths[currentBreath].inhale;
    cube.className = 'w-36 h-36 rounded-3xl flex items-center justify-center shadow-xl bg-rose-100 text-center p-6';

    // Set up transition property
    cube.style.transition = `all ${BREATH_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    // Use timeout to ensure browser registers initial state before animating
    setTimeout(() => {
      cube.style.transform = 'scale(1.3)';
    }, 50);

    timeoutRef = setTimeout(() => {
      // Exhale phase
      phase = 'exhale';
      breatheText.textContent = 'Exhale with the cube';
      instruction.textContent = breaths[currentBreath].exhale;

      // Add sigh instruction for first two breaths
      if (currentBreath < 2) {
        instruction.textContent += "\n(sigh out)";
      }

      cube.className = 'w-36 h-36 rounded-3xl flex items-center justify-center shadow-xl bg-rose-50 text-center p-6';
      cube.style.transform = 'scale(1)';

      timeoutRef = setTimeout(() => {
        currentBreath++;
        animateBreath();
      }, BREATH_DURATION);
    }, BREATH_DURATION);
  }

  function showComplete() {
    // Clear any running timers
    if (timeoutRef) clearTimeout(timeoutRef);

    // Replace content with completion message
    content.innerHTML = `
      <div class="flex-1 flex flex-col items-center justify-center p-6">
        <div class="text-center space-y-6">
          <h2 class="text-2xl font-light text-slate-800 mb-6">Wonderfully Done!</h2>
          <p class="text-xl text-slate-600 mb-6">
            You've created space for understanding and growth
          </p>
          <div class="flex gap-3 mb-8">
            <button
              id="popup-comp-restart-button"
              class="px-6 py-3 rounded-xl font-light border-2 border-rose-600 text-rose-700 hover:bg-rose-50 transition-colors flex items-center gap-2"
            >
              <i class="ph ph-arrows-clockwise"></i>
              Another Reset
            </button>
            <button
              id="popup-comp-close-button"
              class="px-6 py-3 rounded-xl font-light bg-rose-600 text-white hover:bg-rose-700 transition-colors"
            >
              Feel Better
            </button>
          </div>
        </div>
      </div>
    `;

    // Create confetti effect
    createConfetti();

    // Set up buttons
    document.getElementById('popup-comp-restart-button').addEventListener('click', () => {
      closePopupMeditation();
      setTimeout(() => {
        createCompassionMeditationPopup(intensity);
      }, 400);
    });

    document.getElementById('popup-comp-close-button').addEventListener('click', () => {
      closePopupMeditation();
    });
  }

  // Start meditation
  startMeditation();

  return overlay;
}

// Create Energy Reset meditation popup
function createEnergyResetMeditationPopup(minutes) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'popup-meditation-overlay';

  // Create container
  const container = document.createElement('div');
  container.className = 'popup-meditation-container';

  // Make the container draggable
  makeDraggable(container);

  // Create header
  const header = document.createElement('div');
  header.className = 'popup-meditation-header';

  const title = document.createElement('h3');
  title.className = 'text-lg font-medium text-slate-800';
  title.textContent = 'Energy Reset';

  const closeButton = document.createElement('button');
  closeButton.className = 'popup-meditation-close';
  closeButton.innerHTML = '<i class="ph ph-x"></i>';
  closeButton.onclick = closePopupMeditation;

  header.appendChild(title);
  header.appendChild(closeButton);

  // Create content for the meditation
  const content = document.createElement('div');
  content.className = 'popup-meditation-content';

  // Create instruction screen first
  const instructionScreen = document.createElement('div');
  instructionScreen.className = 'flex-1 flex flex-col items-center justify-center p-6';
  instructionScreen.innerHTML = `
    <div class="text-center">
      <p class="text-xl text-slate-800 mb-4">Find a comfortable position</p>
      <p class="text-base text-slate-600">Follow the double-breath practice</p>
      <p class="text-lg text-slate-800 mt-8">Starting in <span id="popup-energy-instruction-count">3</span>...</p>
    </div>
  `;

  content.appendChild(instructionScreen);

  // Append components
  container.appendChild(header);
  container.appendChild(content);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  // Activate the popup with a slight delay for animation
  setTimeout(() => {
    overlay.classList.add('active');
  }, 10);

  // Start the 3-second countdown
  let timeLeft = 3;
  const countdownElement = document.getElementById('popup-energy-instruction-count');
  countdownElement.textContent = timeLeft;

  const countdown = setInterval(() => {
    timeLeft--;
    countdownElement.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      // Replace instruction screen with meditation content
      content.innerHTML = '';
      startEnergyResetMeditation(content, minutes);
    }
  }, 1000);

  return overlay;
}

function startEnergyResetMeditation(content, minutes) {

  // Create meditation screen
  const meditationDiv = document.createElement('div');
  meditationDiv.className = 'flex-1 flex flex-col items-center p-6';

  const cycleCount = document.createElement('p');
  cycleCount.id = 'popup-energy-cycle-count';
  cycleCount.className = 'text-xl text-slate-600 text-center mb-4';

  const breatheText = document.createElement('p');
  breatheText.id = 'popup-energy-breathe-text';
  breatheText.className = 'text-base text-slate-600 mt-2 text-center mb-8';

  const cubeContainer = document.createElement('div');
  cubeContainer.className = 'flex-1 flex items-center justify-center';

  const cube = document.createElement('div');
  cube.id = 'popup-energy-cube';
  cube.className = 'w-36 h-36 rounded-3xl flex flex-col items-center justify-center shadow-xl bg-green-50';

  const instruction = document.createElement('p');
  instruction.id = 'popup-energy-instruction';
  instruction.className = 'text-xl font-medium text-slate-700 text-center w-full mb-2';

  const timeSquares = document.createElement('div');
  timeSquares.className = 'time-squares';

  cube.appendChild(instruction);
  cube.appendChild(timeSquares);
  cubeContainer.appendChild(cube);

  meditationDiv.appendChild(cycleCount);
  meditationDiv.appendChild(breatheText);
  meditationDiv.appendChild(cubeContainer);

  content.appendChild(meditationDiv);

  // Set up the meditation parameters
  const cyclesPerMinute = Math.floor(60 / 7.5);
  const totalCycles = Math.floor(minutes * cyclesPerMinute);
  let currentCycle = 1;
  let timeoutRef;

  function updateCycleDisplay() {
    cycleCount.textContent = `Breath ${currentCycle} of ${totalCycles}`;
  }

  function updateTimeSquares(count) {
    timeSquares.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const square = document.createElement('div');
      square.className = 'time-square';
      timeSquares.appendChild(square);
    }
  }

  function updateActiveSquares(activeCount) {
    const squares = timeSquares.querySelectorAll('.time-square');
    squares.forEach((square) => square.classList.remove('empty'));

    const totalSquares = squares.length;
    const emptyCount = totalSquares - activeCount;

    for (let i = totalSquares - 1; i >= totalSquares - emptyCount; i--) {
      if (squares[i]) squares[i].classList.add('empty');
    }
  }

  async function startBreathingCycle() {
    if (timeoutRef) clearTimeout(timeoutRef);

    if (currentCycle > totalCycles) {
      showComplete();
      return;
    }

    updateCycleDisplay();

    // Reset the cube state first without transition
    cube.style.transition = 'none';
    cube.style.transform = 'scale(1)';

    // Force a reflow to ensure the browser applies this state immediately
    cube.offsetHeight;

    // First inhale (4 seconds)
    breatheText.textContent = "Inhale as the cube expands";
    cube.className = 'w-36 h-36 rounded-3xl flex flex-col items-center justify-center shadow-xl bg-green-50';
    instruction.innerHTML = "Take a full<br>breath in";
    updateTimeSquares(4);
    updateActiveSquares(4);

    // Now set the transition and start the expansion after a small delay
    cube.style.transition = 'all 4s cubic-bezier(0.4, 0, 0.2, 1)';

    // Use a small timeout to ensure the browser registers the initial state
    setTimeout(() => {
      cube.style.transform = 'scale(1.25)';
    }, 50);

    for (let i = 3; i >= 0; i--) {
      await new Promise(r => { timeoutRef = setTimeout(r, 1000); });
      updateActiveSquares(i);
    }

    // Brief pause between inhales
    await new Promise(r => { timeoutRef = setTimeout(r, 500); });

    // Second inhale (2 seconds)
    breatheText.textContent = "Inhale a bit more";
    cube.className = 'w-36 h-36 rounded-3xl flex flex-col items-center justify-center shadow-xl bg-yellow-100';
    instruction.innerHTML = "Now breathe in <br>some more air";
    updateTimeSquares(2);
    updateActiveSquares(2);

    cube.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
    cube.style.transform = 'scale(1.5)';

    for (let i = 1; i >= 0; i--) {
      await new Promise(r => { timeoutRef = setTimeout(r, 1000); });
      updateActiveSquares(i);
    }

    // Hold (2 seconds)
    breatheText.textContent = "Hold your breath";
    cube.className = 'w-36 h-36 rounded-3xl flex flex-col items-center justify-center shadow-xl bg-yellow-100';
    instruction.innerHTML = "Hold your<br>breath";
    updateTimeSquares(2);
    updateActiveSquares(2);

    for (let i = 1; i >= 0; i--) {
      await new Promise(r => { timeoutRef = setTimeout(r, 1000); });
      updateActiveSquares(i);
    }

    // Exhale (3 seconds)
    breatheText.textContent = "Exhale as the cube shrinks";
    cube.className = 'w-36 h-36 rounded-3xl flex flex-col items-center justify-center shadow-xl bg-green-50';
    instruction.innerHTML = "Strong exhale!<br>Empty your lungs!";
    updateTimeSquares(3);
    updateActiveSquares(3);

    cube.style.transition = 'all 3s cubic-bezier(0.4, 0, 0.2, 1)';
    cube.style.transform = 'scale(1)';

    for (let i = 2; i >= 0; i--) {
      await new Promise(r => { timeoutRef = setTimeout(r, 1000); });
      updateActiveSquares(i);
    }

    // Bottom hold (2 seconds)
    breatheText.textContent = "Brief hold";
    cube.className = 'w-36 h-36 rounded-3xl flex flex-col items-center justify-center shadow-xl bg-yellow-100';
    instruction.innerHTML = "Keep your<br>lungs empty";
    updateTimeSquares(2);
    updateActiveSquares(2);

    for (let i = 1; i >= 0; i--) {
      await new Promise(r => { timeoutRef = setTimeout(r, 1000); });
      updateActiveSquares(i);
    }

    // Move to next cycle
    currentCycle++;
    timeoutRef = setTimeout(startBreathingCycle, 500);
  }

  function showComplete() {
    // Clear any running timers
    if (timeoutRef) clearTimeout(timeoutRef);

    // Replace content with completion message
    content.innerHTML = `
      <div class="flex-1 flex flex-col items-center justify-center p-6">
        <div class="text-center space-y-6">
          <h2 class="text-2xl font-light text-slate-800 mb-6">Great work!</h2>
          <p class="text-xl text-slate-600 mb-6">
            Your body is naturally energized and ready to go
          </p>
          <div class="flex gap-3 mb-8">
            <button
              id="popup-energy-restart-button"
              class="px-6 py-3 rounded-xl font-light border-2 border-green-600 text-green-700 hover:bg-green-50 transition-colors flex items-center gap-2"
            >
              <i class="ph ph-arrows-clockwise"></i>
              Another Reset
            </button>
            <button
              id="popup-energy-close-button"
              class="px-6 py-3 rounded-xl font-light bg-green-600 text-white hover:bg-green-700 transition-colors"
            >
              Feel Better
            </button>
          </div>
        </div>
      </div>
    `;

    // Create confetti effect
    createConfetti();

    // Set up buttons
    document.getElementById('popup-energy-restart-button').addEventListener('click', () => {
      closePopupMeditation();
      setTimeout(() => {
        createEnergyResetMeditationPopup(minutes);
      }, 400);
    });

    document.getElementById('popup-energy-close-button').addEventListener('click', () => {
      closePopupMeditation();
    });
  }

  // Start the sequence
  startBreathingCycle();

  return overlay;
}

// Function to start meditation in popup from bar mode
function startPopupMeditationFromBarMode(meditationType) {
  if (document.body.classList.contains('bar-mode-active')) {
    createPopupMeditationWindow(meditationType);
    return true;
  }
  return false;
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

  // Make the container draggable
  makeDraggable(container);

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

  content.appendChild(iframe);

  // Append components
  container.appendChild(header);
  container.appendChild(content);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  // Activate the popup with a slight delay for animation
  setTimeout(() => {
    overlay.classList.add('active');
  }, 10);

  return true;
}

// Function to open Remember Your Why in a popup window
function openRememberWhyPopup() {
  if (!document.body.classList.contains('bar-mode-active')) {
    return false; // Only open popup in bar mode
  }

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'popup-meditation-overlay';

  // Create container
  const container = document.createElement('div');
  container.className = 'popup-meditation-container';

  // Make the container draggable
  makeDraggable(container);

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

  content.appendChild(iframe);

  // Append components
  container.appendChild(header);
  container.appendChild(content);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  // Activate the popup with a slight delay for animation
  setTimeout(() => {
    overlay.classList.add('active');
  }, 10);

  return true;
}

// Function to make an element draggable
function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  // Get the header as the drag handle
  const header = element.querySelector('.popup-meditation-header');

  if (header) {
    // If present, the header is where you move the element from
    header.style.cursor = 'move';
    header.onmousedown = dragMouseDown;
    header.ontouchstart = dragTouchStart;
  } else {
    // Otherwise, move the element from anywhere inside it
    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragTouchStart;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // Get the mouse cursor position at startup
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Change position from transform to actual positioning
    const computedStyle = window.getComputedStyle(element);
    const transform = computedStyle.getPropertyValue('transform');

    // Only modify position if the element has been animated in
    if (transform !== 'matrix(1, 0, 0, 1, 0, 0)' && transform !== 'none') {
      // Reset transform and set absolute positioning
      element.style.transform = 'none';
      element.style.transition = 'none';
      element.style.position = 'absolute';
      element.style.margin = '0';

      // Calculate current position
      const rect = element.getBoundingClientRect();
      element.style.top = rect.top + 'px';
      element.style.right = (window.innerWidth - rect.right) + 'px';
    }

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function dragTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    pos3 = touch.clientX;
    pos4 = touch.clientY;

    // Change position from transform to actual positioning
    const computedStyle = window.getComputedStyle(element);
    const transform = computedStyle.getPropertyValue('transform');

    // Only modify position if the element has been animated in
    if (transform !== 'matrix(1, 0, 0, 1, 0, 0)' && transform !== 'none') {
      // Reset transform and set absolute positioning
      element.style.transform = 'none';
      element.style.transition = 'none';
      element.style.position = 'absolute';
      element.style.margin = '0';

      // Calculate current position
      const rect = element.getBoundingClientRect();
      element.style.top = rect.top + 'px';
      element.style.right = (window.innerWidth - rect.right) + 'px';
    }

    document.ontouchend = closeDragElement;
    document.ontouchmove = elementTouchDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    // Calculate the new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Constrain the element to stay within the viewport
    const rect = element.getBoundingClientRect();
    let newTop = (element.offsetTop - pos2);
    let newLeft = (element.offsetLeft - pos1);

    // Constrain to viewport
    newTop = Math.max(0, Math.min(newTop, window.innerHeight - rect.height));
    newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - rect.width));

    // Set the element's new position
    element.style.top = newTop + "px";
    element.style.left = newLeft + "px";
    element.style.right = "auto"; // Clear right positioning
  }

  function elementTouchDrag(e) {
    const touch = e.touches[0];

    // Calculate the new touch position
    pos1 = pos3 - touch.clientX;
    pos2 = pos4 - touch.clientY;
    pos3 = touch.clientX;
    pos4 = touch.clientY;

    // Constrain the element to stay within the viewport
    const rect = element.getBoundingClientRect();
    let newTop = (element.offsetTop - pos2);
    let newLeft = (element.offsetLeft - pos1);

    // Constrain to viewport
    newTop = Math.max(0, Math.min(newTop, window.innerHeight - rect.height));
    newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - rect.width));

    // Set the element's new position
    element.style.top = newTop + "px";
    element.style.left = newLeft + "px";
    element.style.right = "auto"; // Clear right positioning
  }

  function closeDragElement() {
    // Stop moving when mouse button or touch is released
    document.onmouseup = null;
    document.onmousemove = null;
    document.ontouchend = null;
    document.ontouchmove = null;
  }
}