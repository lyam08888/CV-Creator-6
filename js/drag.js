// Système de drag & drop amélioré pour CV Creator
let sortableInstances = [];
let resizeObserver = null;

// Initialiser le drag & drop
export function initDragAndDrop() {
  console.log('Initializing enhanced drag & drop...');
  
  // Vérifier si Sortable est disponible
  if (typeof window.Sortable === 'undefined') {
    console.warn('⚠️ Sortable.js non disponible, tentative de rechargement...');
    // Attendre un peu et réessayer
    setTimeout(() => {
      if (typeof window.Sortable !== 'undefined') {
        console.log('✅ Sortable.js maintenant disponible, initialisation...');
        initDragAndDrop();
      } else {
        console.error('❌ Sortable.js toujours non disponible après attente');
      }
    }, 1000);
    return;
  }
  
  // Nettoyer les instances existantes
  cleanupDragAndDrop();
  
  const cvContainer = document.querySelector('.cv-page') || document.getElementById('cv-preview');
  if (!cvContainer) {
    console.warn('CV container not found for drag & drop');
    return;
  }
  
  // Créer l'instance Sortable
  const sortable = Sortable.create(cvContainer, {
    animation: 200,
    ghostClass: 'cv-section-ghost',
    chosenClass: 'cv-section-chosen',
    dragClass: 'cv-section-drag',
    handle: '.drag-handle',
    filter: '.cv-recruitment-banner', // Exclure la bannière du drag & drop
    onStart: function(evt) {
      evt.item.classList.add('dragging');
      document.body.classList.add('dragging-active');
    },
    onEnd: function(evt) {
      evt.item.classList.remove('dragging');
      document.body.classList.remove('dragging-active');
      
      // Sauvegarder l'ordre des sections
      saveSectionOrder();
      
      console.log('Section moved from', evt.oldIndex, 'to', evt.newIndex);
    }
  });
  
  sortableInstances.push(sortable);
  
  // Initialiser le redimensionnement
  initResizing();
  
  // Ajouter les handles de drag
  addDragHandles();
}

// Nettoyer les instances de drag & drop
export function cleanupDragAndDrop() {
  sortableInstances.forEach(instance => {
    if (instance && typeof instance.destroy === 'function') {
      instance.destroy();
    }
  });
  sortableInstances = [];
  
  if (resizeObserver) {
    resizeObserver.disconnect();
    resizeObserver = null;
  }
}

// Ajouter les handles de drag
function addDragHandles() {
  const sections = document.querySelectorAll('.cv-section.sortable');
  
  sections.forEach(section => {
    // Vérifier si le handle existe déjà
    if (section.querySelector('.drag-handle')) {
      return;
    }
    
    const handle = document.createElement('div');
    handle.className = 'drag-handle';
    handle.innerHTML = '⋮⋮';
    handle.title = 'Glisser pour réorganiser';
    
    section.appendChild(handle);
  });
}

// Initialiser le redimensionnement des sections
function initResizing() {
  const sections = document.querySelectorAll('.cv-section');
  
  sections.forEach(section => {
    makeResizable(section);
  });
}

// Rendre une section redimensionnable
function makeResizable(element) {
  // Créer les handles de redimensionnement
  const resizeHandles = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
  
  resizeHandles.forEach(direction => {
    const handle = document.createElement('div');
    handle.className = `resize-handle resize-${direction}`;
    handle.style.display = 'none'; // Masqué par défaut
    element.appendChild(handle);
    
    // Ajouter les événements de redimensionnement
    addResizeEvents(handle, element, direction);
  });
  
  // Afficher les handles au survol
  element.addEventListener('mouseenter', () => {
    if (document.body.classList.contains('edit-mode')) {
      element.querySelectorAll('.resize-handle').forEach(h => h.style.display = 'block');
    }
  });
  
  element.addEventListener('mouseleave', () => {
    element.querySelectorAll('.resize-handle').forEach(h => h.style.display = 'none');
  });
}

// Ajouter les événements de redimensionnement
function addResizeEvents(handle, element, direction) {
  let isResizing = false;
  let startX, startY, startWidth, startHeight;
  
  handle.addEventListener('mousedown', (e) => {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10);
    
    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
    
    e.preventDefault();
  });
  
  function doResize(e) {
    if (!isResizing) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    let newWidth = startWidth;
    let newHeight = startHeight;
    
    // Calculer les nouvelles dimensions selon la direction
    if (direction.includes('e')) newWidth = startWidth + deltaX;
    if (direction.includes('w')) newWidth = startWidth - deltaX;
    if (direction.includes('s')) newHeight = startHeight + deltaY;
    if (direction.includes('n')) newHeight = startHeight - deltaY;
    
    // Appliquer les contraintes minimales
    newWidth = Math.max(100, newWidth);
    newHeight = Math.max(50, newHeight);
    
    // Appliquer les nouvelles dimensions
    element.style.width = newWidth + 'px';
    element.style.height = newHeight + 'px';
  }
  
  function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', doResize);
    document.removeEventListener('mouseup', stopResize);
  }
}

// Sauvegarder l'ordre des sections
function saveSectionOrder() {
  const sections = document.querySelectorAll('.cv-section[data-section]');
  const order = Array.from(sections).map(section => section.dataset.section);
  
  localStorage.setItem('cv-section-order', JSON.stringify(order));
  console.log('Section order saved:', order);
}

// Restaurer l'ordre des sections
export function restoreSectionOrder() {
  const savedOrder = localStorage.getItem('cv-section-order');
  if (!savedOrder) return;
  
  try {
    const order = JSON.parse(savedOrder);
    const container = document.querySelector('.cv-page') || document.getElementById('cv-preview');
    if (!container) return;
    
    const sections = container.querySelectorAll('.cv-section[data-section]');
    const sectionMap = new Map();
    
    // Créer une map des sections
    sections.forEach(section => {
      sectionMap.set(section.dataset.section, section);
    });
    
    // Réorganiser selon l'ordre sauvegardé
    order.forEach(sectionType => {
      const section = sectionMap.get(sectionType);
      if (section) {
        container.appendChild(section);
      }
    });
    
    console.log('Section order restored:', order);
  } catch (error) {
    console.error('Error restoring section order:', error);
  }
}

// Optimiser les espaces vides
export function optimizeSpacing() {
  const sections = document.querySelectorAll('.cv-section');
  
  sections.forEach(section => {
    // Supprimer les espaces vides excessifs
    const paragraphs = section.querySelectorAll('p');
    paragraphs.forEach(p => {
      if (!p.textContent.trim()) {
        p.remove();
      }
    });
    
    // Optimiser les marges
    const items = section.querySelectorAll('.cv-item');
    items.forEach((item, index) => {
      if (index === items.length - 1) {
        item.style.marginBottom = '0';
      }
    });
  });
}

// Rendre les fonctions disponibles globalement
window.initDragAndDrop = initDragAndDrop;
window.cleanupDragAndDrop = cleanupDragAndDrop;
window.restoreSectionOrder = restoreSectionOrder;
window.optimizeSpacing = optimizeSpacing;
