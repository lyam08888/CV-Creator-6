// Enhanced UI Features for CV Creator
console.log('Enhanced UI module loaded');

// Variables globales
let isEditMode = false;
let selectedElements = new Set();
let customizationPanel = null;
let floatingToolbar = null;
let contextMenu = null;
let gridOverlay = null;
let alignmentGuides = null;

// Initialisation des fonctionnalités avancées
export function initEnhancedUI() {
  console.log('Initializing enhanced UI features...');
  
  createCustomizationPanel();
  createFloatingToolbar();
  createContextMenu();
  createGridOverlay();
  createAlignmentGuides();
  initKeyboardShortcuts();
  initPerformanceMonitor();
  
  console.log('Enhanced UI features initialized');
}

// ===== PANNEAU DE PERSONNALISATION FLOTTANT =====

function createCustomizationPanel() {
  customizationPanel = document.createElement('div');
  customizationPanel.className = 'customization-panel';
  customizationPanel.innerHTML = `
    <div class="customization-header">
      <h3>Personnalisation</h3>
      <button class="customization-close" onclick="toggleCustomizationPanel()">&times;</button>
    </div>
    <div class="customization-content">
      <div class="control-group">
        <label>Taille de police</label>
        <div class="control-row">
          <input type="range" class="control-slider" id="fontSizeSlider" min="8" max="20" value="11" step="0.5">
          <span class="control-value" id="fontSizeValue">11pt</span>
        </div>
      </div>
      
      <div class="control-group">
        <label>Espacement des sections</label>
        <div class="control-row">
          <input type="range" class="control-slider" id="sectionSpacingSlider" min="2" max="15" value="6" step="0.5">
          <span class="control-value" id="sectionSpacingValue">6mm</span>
        </div>
      </div>
      
      <div class="control-group">
        <label>Marges de page</label>
        <div class="control-row">
          <input type="range" class="control-slider" id="marginSlider" min="10" max="30" value="20" step="1">
          <span class="control-value" id="marginValue">20mm</span>
        </div>
      </div>
      
      <div class="control-group">
        <label>Couleur principale</label>
        <div class="control-row">
          <input type="color" class="control-input" id="primaryColorPicker" value="#8B5CF6">
        </div>
      </div>
      
      <div class="control-group">
        <label>Police</label>
        <div class="control-row">
          <select class="control-input" id="fontFamilySelect">
            <option value="Arial, sans-serif">Arial</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'Helvetica Neue', sans-serif">Helvetica</option>
            <option value="'Georgia', serif">Georgia</option>
            <option value="'Inter', sans-serif" selected>Inter</option>
          </select>
        </div>
      </div>
      
      <div class="control-group">
        <label>Layout</label>
        <div class="control-row">
          <select class="control-input" id="layoutSelect">
            <option value="single">Une colonne</option>
            <option value="two-column">Deux colonnes</option>
            <option value="sidebar">Sidebar</option>
          </select>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(customizationPanel);
  
  // Événements pour la personnalisation en temps réel
  setupCustomizationEvents();
}

function setupCustomizationEvents() {
  const fontSizeSlider = document.getElementById('fontSizeSlider');
  const sectionSpacingSlider = document.getElementById('sectionSpacingSlider');
  const marginSlider = document.getElementById('marginSlider');
  const primaryColorPicker = document.getElementById('primaryColorPicker');
  const fontFamilySelect = document.getElementById('fontFamilySelect');
  const layoutSelect = document.getElementById('layoutSelect');
  
  // Mise à jour en temps réel
  fontSizeSlider?.addEventListener('input', (e) => {
    const value = e.target.value;
    document.getElementById('fontSizeValue').textContent = `${value}pt`;
    document.documentElement.style.setProperty('--cv-base-font-size', `${value}pt`);
    showChangeIndicator();
  });
  
  sectionSpacingSlider?.addEventListener('input', (e) => {
    const value = e.target.value;
    document.getElementById('sectionSpacingValue').textContent = `${value}mm`;
    document.documentElement.style.setProperty('--cv-section-spacing', `${value}mm`);
    showChangeIndicator();
  });
  
  marginSlider?.addEventListener('input', (e) => {
    const value = e.target.value;
    document.getElementById('marginValue').textContent = `${value}mm`;
    document.documentElement.style.setProperty('--cv-margin-top', `${value}mm`);
    document.documentElement.style.setProperty('--cv-margin-bottom', `${value}mm`);
    document.documentElement.style.setProperty('--cv-margin-left', `${value}mm`);
    document.documentElement.style.setProperty('--cv-margin-right', `${value}mm`);
    showChangeIndicator();
  });
  
  primaryColorPicker?.addEventListener('input', (e) => {
    const color = e.target.value;
    document.documentElement.style.setProperty('--primary-color', color);
    document.documentElement.style.setProperty('--primary-color-dark', adjustBrightness(color, -20));
    showChangeIndicator();
  });
  
  fontFamilySelect?.addEventListener('change', (e) => {
    const font = e.target.value;
    document.documentElement.style.setProperty('--cv-font-family', font);
    showChangeIndicator();
  });
  
  layoutSelect?.addEventListener('change', (e) => {
    const layout = e.target.value;
    applyLayout(layout);
    showChangeIndicator();
  });
}

// ===== TOOLBAR FLOTTANTE =====

function createFloatingToolbar() {
  floatingToolbar = document.createElement('div');
  floatingToolbar.className = 'floating-toolbar';
  floatingToolbar.innerHTML = `
    <button class="toolbar-btn" data-tooltip="Mode Édition" onclick="toggleEditMode()">
      <span>✏️</span>
    </button>
    <button class="toolbar-btn" data-tooltip="Grille" onclick="toggleGrid()">
      <span>⊞</span>
    </button>
    <button class="toolbar-btn" data-tooltip="Guides" onclick="toggleGuides()">
      <span>📏</span>
    </button>
    <button class="toolbar-btn" data-tooltip="Sélection multiple" onclick="toggleMultiSelect()">
      <span>☐</span>
    </button>
    <button class="toolbar-btn" data-tooltip="Aperçu" onclick="togglePreview()">
      <span>👁️</span>
    </button>
    <button class="toolbar-btn" data-tooltip="Exporter" onclick="exportCV()">
      <span>💾</span>
    </button>
  `;
  
  document.body.appendChild(floatingToolbar);
}

// ===== MENU CONTEXTUEL =====

function createContextMenu() {
  contextMenu = document.createElement('div');
  contextMenu.className = 'context-menu';
  contextMenu.innerHTML = `
    <div class="context-menu-item" onclick="duplicateSection()">
      <span>📋</span> Dupliquer
    </div>
    <div class="context-menu-item" onclick="editSection()">
      <span>✏️</span> Modifier
    </div>
    <div class="context-menu-separator"></div>
    <div class="context-menu-item" onclick="moveUp()">
      <span>⬆️</span> Déplacer vers le haut
    </div>
    <div class="context-menu-item" onclick="moveDown()">
      <span>⬇️</span> Déplacer vers le bas
    </div>
    <div class="context-menu-separator"></div>
    <div class="context-menu-item danger" onclick="deleteSection()">
      <span>🗑️</span> Supprimer
    </div>
  `;
  
  document.body.appendChild(contextMenu);
  
  // Fermer le menu en cliquant ailleurs
  document.addEventListener('click', (e) => {
    if (!contextMenu.contains(e.target)) {
      hideContextMenu();
    }
  });
}

// ===== GRILLE ET GUIDES =====

function createGridOverlay() {
  gridOverlay = document.createElement('div');
  gridOverlay.className = 'grid-overlay';
  
  const cvPreview = document.getElementById('cv-preview');
  if (cvPreview) {
    cvPreview.style.position = 'relative';
    cvPreview.appendChild(gridOverlay);
  }
}

function createAlignmentGuides() {
  alignmentGuides = document.createElement('div');
  alignmentGuides.className = 'alignment-guides';
  
  // Créer les lignes de guide
  for (let i = 0; i < 4; i++) {
    const horizontalGuide = document.createElement('div');
    horizontalGuide.className = 'guide-line horizontal';
    alignmentGuides.appendChild(horizontalGuide);
    
    const verticalGuide = document.createElement('div');
    verticalGuide.className = 'guide-line vertical';
    alignmentGuides.appendChild(verticalGuide);
  }
  
  const cvPreview = document.getElementById('cv-preview');
  if (cvPreview) {
    cvPreview.appendChild(alignmentGuides);
  }
}

// ===== RACCOURCIS CLAVIER =====

function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + E : Mode édition
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
      e.preventDefault();
      toggleEditMode();
    }
    
    // Ctrl/Cmd + G : Grille
    if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
      e.preventDefault();
      toggleGrid();
    }
    
    // Ctrl/Cmd + H : Guides
    if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
      e.preventDefault();
      toggleGuides();
    }
    
    // Ctrl/Cmd + P : Personnalisation
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      e.preventDefault();
      toggleCustomizationPanel();
    }
    
    // Échap : Désélectionner tout
    if (e.key === 'Escape') {
      clearSelection();
      hideContextMenu();
      if (customizationPanel?.classList.contains('open')) {
        toggleCustomizationPanel();
      }
    }
    
    // Suppr : Supprimer les éléments sélectionnés
    if (e.key === 'Delete' && selectedElements.size > 0) {
      deleteSelectedElements();
    }
  });
}

// ===== MONITEUR DE PERFORMANCE =====

function initPerformanceMonitor() {
  const performanceIndicator = document.createElement('div');
  performanceIndicator.className = 'performance-indicator';
  performanceIndicator.innerHTML = `
    <div class="fps-counter">FPS: <span id="fps">0</span></div>
    <div class="memory-usage">Mémoire: <span id="memory">0</span>MB</div>
    <div class="render-time">Rendu: <span id="renderTime">0</span>ms</div>
  `;
  
  document.body.appendChild(performanceIndicator);
  
  // Afficher/masquer avec Ctrl+Shift+P
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'P') {
      performanceIndicator.classList.toggle('active');
    }
  });
  
  // Mise à jour des métriques
  let lastTime = performance.now();
  let frameCount = 0;
  
  function updatePerformance() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      document.getElementById('fps').textContent = fps;
      
      if (performance.memory) {
        const memory = Math.round(performance.memory.usedJSHeapSize / 1048576);
        document.getElementById('memory').textContent = memory;
      }
      
      frameCount = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(updatePerformance);
  }
  
  updatePerformance();
}

// ===== FONCTIONS UTILITAIRES =====

function toggleEditMode() {
  isEditMode = !isEditMode;
  document.body.classList.toggle('edit-mode', isEditMode);
  
  const editBtn = document.querySelector('[data-tooltip="Mode Édition"]');
  if (editBtn) {
    editBtn.classList.toggle('active', isEditMode);
  }
  
  if (isEditMode) {
    floatingToolbar?.classList.add('active');
    showNotification('Mode édition activé');
  } else {
    floatingToolbar?.classList.remove('active');
    clearSelection();
    showNotification('Mode édition désactivé');
  }
}

function toggleGrid() {
  gridOverlay?.classList.toggle('active');
  const gridBtn = document.querySelector('[data-tooltip="Grille"]');
  gridBtn?.classList.toggle('active');
}

function toggleGuides() {
  const guides = document.querySelectorAll('.guide-line');
  const isActive = guides[0]?.classList.contains('active');
  
  guides.forEach(guide => {
    guide.classList.toggle('active', !isActive);
  });
  
  const guidesBtn = document.querySelector('[data-tooltip="Guides"]');
  guidesBtn?.classList.toggle('active', !isActive);
}

function toggleCustomizationPanel() {
  customizationPanel?.classList.toggle('open');
  
  // Créer le bouton de personnalisation s'il n'existe pas
  let customizeBtn = document.querySelector('.btn-customize');
  if (!customizeBtn) {
    customizeBtn = document.createElement('button');
    customizeBtn.className = 'btn-customize';
    customizeBtn.innerHTML = '⚙️';
    customizeBtn.onclick = toggleCustomizationPanel;
    document.body.appendChild(customizeBtn);
  }
  
  customizeBtn.classList.toggle('active', customizationPanel?.classList.contains('open'));
}

function showContextMenu(x, y, element) {
  if (!contextMenu) return;
  
  contextMenu.style.left = `${x}px`;
  contextMenu.style.top = `${y}px`;
  contextMenu.classList.add('active');
  contextMenu.dataset.target = element.dataset.section || '';
}

function hideContextMenu() {
  contextMenu?.classList.remove('active');
}

function showChangeIndicator() {
  const indicator = document.createElement('div');
  indicator.className = 'change-indicator active';
  document.body.appendChild(indicator);
  
  setTimeout(() => {
    indicator.remove();
  }, 1000);
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--primary-color);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    z-index: 4000;
    animation: fadeInUp 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'fadeOutUp 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function adjustBrightness(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function applyLayout(layout) {
  const cvPreview = document.getElementById('cv-preview');
  if (!cvPreview) return;
  
  cvPreview.className = cvPreview.className.replace(/layout-\w+/g, '');
  cvPreview.classList.add(`layout-${layout}`);
}

function clearSelection() {
  selectedElements.clear();
  document.querySelectorAll('.cv-section.selected').forEach(el => {
    el.classList.remove('selected');
  });
  
  const counter = document.querySelector('.selection-counter');
  if (counter) {
    counter.classList.remove('active');
  }
}

// ===== ACTIONS DU MENU CONTEXTUEL =====

function duplicateSection() {
  const targetId = contextMenu?.dataset.target;
  if (!targetId) return;
  
  const section = document.querySelector(`[data-section="${targetId}"]`);
  if (section) {
    const clone = section.cloneNode(true);
    section.parentNode.insertBefore(clone, section.nextSibling);
    showNotification('Section dupliquée');
  }
  hideContextMenu();
}

function editSection() {
  const targetId = contextMenu?.dataset.target;
  showNotification(`Édition de la section: ${targetId}`);
  hideContextMenu();
}

function moveUp() {
  const targetId = contextMenu?.dataset.target;
  const section = document.querySelector(`[data-section="${targetId}"]`);
  if (section && section.previousElementSibling) {
    section.parentNode.insertBefore(section, section.previousElementSibling);
    showNotification('Section déplacée vers le haut');
  }
  hideContextMenu();
}

function moveDown() {
  const targetId = contextMenu?.dataset.target;
  const section = document.querySelector(`[data-section="${targetId}"]`);
  if (section && section.nextElementSibling) {
    section.parentNode.insertBefore(section.nextElementSibling, section);
    showNotification('Section déplacée vers le bas');
  }
  hideContextMenu();
}

function deleteSection() {
  const targetId = contextMenu?.dataset.target;
  if (confirm('Êtes-vous sûr de vouloir supprimer cette section ?')) {
    const section = document.querySelector(`[data-section="${targetId}"]`);
    if (section) {
      section.remove();
      showNotification('Section supprimée');
    }
  }
  hideContextMenu();
}

function deleteSelectedElements() {
  if (selectedElements.size === 0) return;
  
  if (confirm(`Supprimer ${selectedElements.size} élément(s) sélectionné(s) ?`)) {
    selectedElements.forEach(element => {
      element.remove();
    });
    clearSelection();
    showNotification(`${selectedElements.size} élément(s) supprimé(s)`);
  }
}

// ===== ÉVÉNEMENTS DE DRAG & DROP AMÉLIORÉS =====

function initEnhancedDragDrop() {
  const cvSections = document.querySelectorAll('.cv-section');
  
  cvSections.forEach(section => {
    // Clic droit pour menu contextuel
    section.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (isEditMode) {
        showContextMenu(e.clientX, e.clientY, section);
      }
    });
    
    // Sélection multiple avec Ctrl+clic
    section.addEventListener('click', (e) => {
      if (isEditMode && e.ctrlKey) {
        e.preventDefault();
        toggleSelection(section);
      }
    });
    
    // Survol pour guides d'alignement
    section.addEventListener('mouseenter', () => {
      if (isEditMode) {
        showAlignmentGuides(section);
      }
    });
    
    section.addEventListener('mouseleave', () => {
      hideAlignmentGuides();
    });
  });
}

function toggleSelection(element) {
  if (selectedElements.has(element)) {
    selectedElements.delete(element);
    element.classList.remove('selected');
  } else {
    selectedElements.add(element);
    element.classList.add('selected');
  }
  
  updateSelectionCounter();
}

function updateSelectionCounter() {
  let counter = document.querySelector('.selection-counter');
  
  if (selectedElements.size > 0) {
    if (!counter) {
      counter = document.createElement('div');
      counter.className = 'selection-counter';
      document.body.appendChild(counter);
    }
    
    counter.textContent = `${selectedElements.size} élément(s) sélectionné(s)`;
    counter.classList.add('active');
  } else if (counter) {
    counter.classList.remove('active');
  }
}

function showAlignmentGuides(element) {
  const rect = element.getBoundingClientRect();
  const guides = document.querySelectorAll('.guide-line');
  
  if (guides.length >= 4) {
    // Guide horizontal haut
    guides[0].style.top = `${rect.top}px`;
    guides[0].classList.add('active');
    
    // Guide horizontal bas
    guides[1].style.top = `${rect.bottom}px`;
    guides[1].classList.add('active');
    
    // Guide vertical gauche
    guides[2].style.left = `${rect.left}px`;
    guides[2].classList.add('active');
    
    // Guide vertical droite
    guides[3].style.left = `${rect.right}px`;
    guides[3].classList.add('active');
  }
}

function hideAlignmentGuides() {
  const guides = document.querySelectorAll('.guide-line');
  guides.forEach(guide => {
    guide.classList.remove('active');
  });
}

// Rendre les fonctions disponibles globalement
window.initEnhancedUI = initEnhancedUI;
window.toggleEditMode = toggleEditMode;
window.toggleGrid = toggleGrid;
window.toggleGuides = toggleGuides;
window.toggleCustomizationPanel = toggleCustomizationPanel;
window.toggleMultiSelect = () => {
  const btn = document.querySelector('[data-tooltip="Sélection multiple"]');
  btn?.classList.toggle('active');
  showNotification('Sélection multiple ' + (btn?.classList.contains('active') ? 'activée' : 'désactivée'));
};
window.togglePreview = () => {
  const preview = document.querySelector('.preview-overlay');
  if (!preview) {
    const overlay = document.createElement('div');
    overlay.className = 'preview-overlay';
    overlay.innerHTML = `
      <div class="preview-modal">
        <div id="cv-preview-clone"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    
    const cvPreview = document.getElementById('cv-preview');
    const clone = cvPreview.cloneNode(true);
    document.getElementById('cv-preview-clone').appendChild(clone);
    
    overlay.classList.add('active');
    
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        setTimeout(() => overlay.remove(), 300);
      }
    });
  }
};
window.exportCV = () => {
  showNotification('Export en cours...');
  // Logique d'export ici
};

// Auto-initialisation si le DOM est prêt
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEnhancedUI);
} else {
  initEnhancedUI();
}