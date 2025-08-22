// Gestion de l'onglet de disposition des blocs

export function initBlocksTab() {
  const list = document.getElementById('block-order-list');
  if (!list) return;

  const availableSections = [
    { type: 'recruitment-banner', label: 'Bannière de recrutement' },
    { type: 'header', label: 'En-tête' },
    { type: 'summary', label: 'Résumé' },
    { type: 'experience', label: 'Expérience' },
    { type: 'education', label: 'Formation' },
    { type: 'skills', label: 'Compétences' },
    { type: 'languages', label: 'Langues' },
    { type: 'certifications', label: 'Certifications' },
    { type: 'projects', label: 'Projets' }
  ];

  const hidden = JSON.parse(localStorage.getItem('cv-hidden-sections') || '[]');
  const savedOrder = JSON.parse(localStorage.getItem('cv-section-order') || '[]');

  const ordered = availableSections.slice();
  if (savedOrder.length > 0) {
    ordered.sort((a, b) => {
      const ia = savedOrder.indexOf(a.type);
      const ib = savedOrder.indexOf(b.type);
      if (ia === -1 && ib === -1) return 0;
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
  }

  ordered.forEach(sec => {
    const li = document.createElement('li');
    li.className = 'block-item';
    li.dataset.section = sec.type;
    li.innerHTML = `
      <label class="checkbox-label">
        <input type="checkbox" class="block-visibility" ${hidden.includes(sec.type) ? '' : 'checked'}>
        <span class="checkmark"></span>
        ${sec.label}
      </label>
      <span class="drag-handle">⋮⋮</span>
    `;
    list.appendChild(li);
  });

  if (window.Sortable) {
    Sortable.create(list, {
      animation: 150,
      handle: '.drag-handle',
      // Allow checkboxes to remain interactive while using drag handles
      // "filter" prevents Sortable from hijacking clicks on the inputs or their labels
      filter: '.block-visibility, .checkbox-label, .checkbox-label *',
      preventOnFilter: false,
      onEnd: saveOrder
    });
  }

  list.addEventListener('change', saveVisibility);

  // Initialiser les contrôles d'espacement
  initSpacingControls();

  function saveOrder() {
    const order = Array.from(list.querySelectorAll('.block-item')).map(i => i.dataset.section);
    localStorage.setItem('cv-section-order', JSON.stringify(order));
    window.dispatchEvent(new CustomEvent('regeneratePreview'));
  }

  function saveVisibility() {
    const hiddenSections = Array.from(list.querySelectorAll('.block-item'))
      .filter(item => !item.querySelector('.block-visibility').checked)
      .map(item => item.dataset.section);
    localStorage.setItem('cv-hidden-sections', JSON.stringify(hiddenSections));
    window.dispatchEvent(new CustomEvent('regeneratePreview'));
  }
}

function initSpacingControls() {
  // Charger les valeurs sauvegardées
  const savedSpacing = JSON.parse(localStorage.getItem('cv-spacing-settings') || '{}');
  
  const sectionSpacing = document.getElementById('sectionSpacing');
  const itemSpacing = document.getElementById('itemSpacing');
  const pageMargins = document.getElementById('pageMargins');
  const lineHeight = document.getElementById('lineHeight');
  
  // Définir les valeurs par défaut ou sauvegardées
  if (sectionSpacing) {
    sectionSpacing.value = savedSpacing.sectionSpacing || 6;
    updateRangeValue(sectionSpacing, 'mm');
  }
  if (itemSpacing) {
    itemSpacing.value = savedSpacing.itemSpacing || 4;
    updateRangeValue(itemSpacing, 'mm');
  }
  if (pageMargins) {
    pageMargins.value = savedSpacing.pageMargins || 12;
    updateRangeValue(pageMargins, 'mm');
  }
  if (lineHeight) {
    lineHeight.value = savedSpacing.lineHeight || 1.3;
    updateRangeValue(lineHeight, '');
  }
  
  // Ajouter les événements pour mettre à jour les valeurs affichées
  [sectionSpacing, itemSpacing, pageMargins].forEach(input => {
    if (input) {
      input.addEventListener('input', () => updateRangeValue(input, 'mm'));
    }
  });
  
  if (lineHeight) {
    lineHeight.addEventListener('input', () => updateRangeValue(lineHeight, ''));
  }
  
  // Bouton appliquer
  const btnApply = document.getElementById('btnApplySpacing');
  if (btnApply) {
    btnApply.addEventListener('click', applySpacingSettings);
  }
  
  // Bouton réinitialiser
  const btnReset = document.getElementById('btnResetSpacing');
  if (btnReset) {
    btnReset.addEventListener('click', resetSpacingSettings);
  }
}

function updateRangeValue(input, unit) {
  const valueSpan = input.parentElement.querySelector('.range-value');
  if (valueSpan) {
    valueSpan.textContent = input.value + unit;
  }
}

function applySpacingSettings() {
  const settings = {
    sectionSpacing: document.getElementById('sectionSpacing')?.value || 6,
    itemSpacing: document.getElementById('itemSpacing')?.value || 4,
    pageMargins: document.getElementById('pageMargins')?.value || 12,
    lineHeight: document.getElementById('lineHeight')?.value || 1.3
  };
  
  // Sauvegarder les paramètres
  localStorage.setItem('cv-spacing-settings', JSON.stringify(settings));
  
  // Appliquer les styles CSS personnalisés
  const root = document.documentElement;
  root.style.setProperty('--cv-section-spacing', settings.sectionSpacing + 'mm');
  root.style.setProperty('--cv-paragraph-spacing', settings.itemSpacing + 'mm');
  root.style.setProperty('--cv-margin-top', settings.pageMargins + 'mm');
  root.style.setProperty('--cv-margin-bottom', settings.pageMargins + 'mm');
  root.style.setProperty('--cv-margin-left', settings.pageMargins + 'mm');
  root.style.setProperty('--cv-margin-right', settings.pageMargins + 'mm');
  root.style.setProperty('--cv-line-height', settings.lineHeight);
  
  // Régénérer l'aperçu
  window.dispatchEvent(new CustomEvent('regeneratePreview'));
  
  // Feedback visuel
  const btn = document.getElementById('btnApplySpacing');
  const originalText = btn.textContent;
  btn.textContent = '✓ Appliqué';
  btn.style.background = '#10b981';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
  }, 2000);
}

function resetSpacingSettings() {
  // Réinitialiser les valeurs par défaut
  const defaults = {
    sectionSpacing: 6,
    itemSpacing: 4,
    pageMargins: 12,
    lineHeight: 1.3
  };
  
  // Mettre à jour les contrôles
  document.getElementById('sectionSpacing').value = defaults.sectionSpacing;
  document.getElementById('itemSpacing').value = defaults.itemSpacing;
  document.getElementById('pageMargins').value = defaults.pageMargins;
  document.getElementById('lineHeight').value = defaults.lineHeight;
  
  // Mettre à jour les affichages
  updateRangeValue(document.getElementById('sectionSpacing'), 'mm');
  updateRangeValue(document.getElementById('itemSpacing'), 'mm');
  updateRangeValue(document.getElementById('pageMargins'), 'mm');
  updateRangeValue(document.getElementById('lineHeight'), '');
  
  // Supprimer les paramètres sauvegardés
  localStorage.removeItem('cv-spacing-settings');
  
  // Appliquer les paramètres par défaut
  applySpacingSettings();
}

