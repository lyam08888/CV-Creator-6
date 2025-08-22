// Système de personnalisation avancée du CV
console.log('Customization module loaded');

// Configuration par défaut optimisée
const defaultCustomization = {
  fontFamily: 'Arial, sans-serif',
  baseFontSize: 10.5,
  lineHeight: 1.3,
  letterSpacing: 0,
  pageMarginTop: 15,
  pageMarginBottom: 15,
  pageMarginLeft: 15,
  pageMarginRight: 15,
  sectionSpacing: 4,
  paragraphSpacing: 2.5,
  layoutType: 'single',
  leftColumnWidth: 38,
  columnGap: 5,
  maxPages: 2,
  h1Size: 16,
  h2Size: 13,
  h3Size: 12,
  titleSpacing: 1.5,
  showSectionLines: true,
  lineThickness: 0.8,
  lineColor: '#cccccc',
  lineMargin: 0.8
};

// Variables globales
let currentCustomization = { ...defaultCustomization };
window.currentCustomization = currentCustomization;
let previewContainer = null;

// Initialisation du système de personnalisation
export function initCustomization() {
  console.log('Initializing customization system...');
  
  previewContainer = document.getElementById('cv-preview');
  
  // Charger la configuration sauvegardée
  loadCustomizationFromStorage();
  
  // Initialiser les gestionnaires d'événements
  initCustomizationHandlers();
  
  // Appliquer la configuration initiale
  applyCustomization();
  
  console.log('Customization system initialized');
}

// Gestionnaires d'événements
function initCustomizationHandlers() {
  // Bouton appliquer
  document.getElementById('btnApplyCustomization').addEventListener('click', () => {
    updateCustomizationFromForm();
    applyCustomization();
    saveCustomizationToStorage();
    showNotification('Personnalisation appliquée avec succès !');
  });
  
  // Bouton réinitialiser
  document.getElementById('btnResetCustomization').addEventListener('click', () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      resetCustomization();
      showNotification('Paramètres réinitialisés');
    }
  });
  
  // Bouton sauvegarder preset
  document.getElementById('btnSavePreset').addEventListener('click', savePreset);
  
  // Bouton charger preset
  document.getElementById('btnLoadPreset').addEventListener('click', loadPreset);
  
  // Bouton optimisation deux colonnes
  document.getElementById('btnOptimizeTwoColumns').addEventListener('click', () => {
    // Changer le layout en deux colonnes
    document.getElementById('layoutType').value = 'two-column';
    currentCustomization.layoutType = 'two-column';
    
    // Appliquer l'optimisation
    optimizeForTwoColumns();
    
    // Afficher le groupe de largeur de colonne
    const columnWidthGroup = document.getElementById('columnWidthGroup');
    columnWidthGroup.style.display = 'block';
  });
  
  // Gestion du type de layout avec optimisation automatique
  document.getElementById('layoutType').addEventListener('change', (e) => {
    const columnWidthGroup = document.getElementById('columnWidthGroup');
    if (e.target.value === 'single') {
      columnWidthGroup.style.display = 'none';
    } else {
      columnWidthGroup.style.display = 'block';
      // Optimisation automatique pour les deux colonnes
      if (e.target.value === 'two-column') {
        optimizeForTwoColumns();
      }
    }
  });
  
  // Application en temps réel
  const inputs = document.querySelectorAll('#customization input, #customization select');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      updateCustomizationFromForm();
      applyCustomization();
      saveCustomizationToStorage();
      // Régénérer l'aperçu avec la nouvelle pagination
      regeneratePreviewWithPagination();
    });
    
    // Pour les checkboxes
    input.addEventListener('change', () => {
      updateCustomizationFromForm();
      applyCustomization();
      saveCustomizationToStorage();
      regeneratePreviewWithPagination();
    });
  });
}

// Mettre à jour la configuration depuis le formulaire
function updateCustomizationFromForm() {
  currentCustomization = {
    fontFamily: document.getElementById('fontFamily').value,
    baseFontSize: parseFloat(document.getElementById('baseFontSize').value),
    lineHeight: parseFloat(document.getElementById('lineHeight').value),
    letterSpacing: parseFloat(document.getElementById('letterSpacing').value),
    pageMarginTop: parseFloat(document.getElementById('pageMarginTop').value),
    pageMarginBottom: parseFloat(document.getElementById('pageMarginBottom').value),
    pageMarginLeft: parseFloat(document.getElementById('pageMarginLeft').value),
    pageMarginRight: parseFloat(document.getElementById('pageMarginRight').value),
    sectionSpacing: parseFloat(document.getElementById('sectionSpacing').value),
    paragraphSpacing: parseFloat(document.getElementById('paragraphSpacing').value),
    layoutType: document.getElementById('layoutType').value,
    leftColumnWidth: parseFloat(document.getElementById('leftColumnWidth').value),
    columnGap: parseFloat(document.getElementById('columnGap').value),
    maxPages: parseInt(document.getElementById('maxPages').value),
    h1Size: parseFloat(document.getElementById('h1Size').value),
    h2Size: parseFloat(document.getElementById('h2Size').value),
    h3Size: parseFloat(document.getElementById('h3Size').value),
    titleSpacing: parseFloat(document.getElementById('titleSpacing').value),
    showSectionLines: document.getElementById('showSectionLines').checked,
    lineThickness: parseFloat(document.getElementById('lineThickness').value),
    lineColor: document.getElementById('lineColor').value,
    lineMargin: parseFloat(document.getElementById('lineMargin').value)
  };
  window.currentCustomization = currentCustomization;
}

// Appliquer la personnalisation au CV
function applyCustomization() {
  if (!previewContainer) return;
  
  const root = document.documentElement;
  
  // Appliquer les variables CSS
  root.style.setProperty('--cv-font-family', currentCustomization.fontFamily);
  root.style.setProperty('--cv-base-font-size', `${currentCustomization.baseFontSize}pt`);
  root.style.setProperty('--cv-line-height', currentCustomization.lineHeight);
  root.style.setProperty('--cv-letter-spacing', `${currentCustomization.letterSpacing}pt`);
  root.style.setProperty('--cv-margin-top', `${currentCustomization.pageMarginTop}mm`);
  root.style.setProperty('--cv-margin-bottom', `${currentCustomization.pageMarginBottom}mm`);
  root.style.setProperty('--cv-margin-left', `${currentCustomization.pageMarginLeft}mm`);
  root.style.setProperty('--cv-margin-right', `${currentCustomization.pageMarginRight}mm`);
  root.style.setProperty('--cv-section-spacing', `${currentCustomization.sectionSpacing}mm`);
  root.style.setProperty('--cv-paragraph-spacing', `${currentCustomization.paragraphSpacing}mm`);
  root.style.setProperty('--cv-column-gap', `${currentCustomization.columnGap}mm`);
  root.style.setProperty('--cv-left-column-width', `${currentCustomization.leftColumnWidth}%`);
  root.style.setProperty('--cv-h1-size', `${currentCustomization.h1Size}pt`);
  root.style.setProperty('--cv-h2-size', `${currentCustomization.h2Size}pt`);
  root.style.setProperty('--cv-h3-size', `${currentCustomization.h3Size}pt`);
  root.style.setProperty('--cv-title-spacing', `${currentCustomization.titleSpacing}mm`);
  root.style.setProperty('--cv-line-thickness', `${currentCustomization.lineThickness}pt`);
  root.style.setProperty('--cv-line-color', currentCustomization.lineColor);
  root.style.setProperty('--cv-line-margin', `${currentCustomization.lineMargin}mm`);
  
  // Appliquer le layout
  applyLayout();
  
  // Gérer les lignes de section
  applySectionLines();
  
  // Gérer la pagination
  handlePagination();
  
  console.log('Customization applied:', currentCustomization);
}

// Appliquer le type de layout
function applyLayout() {
  // Supprimer les classes de layout existantes du conteneur et des pages
  previewContainer.classList.remove('layout-single', 'layout-two-column', 'layout-sidebar');
  
  const pages = previewContainer.querySelectorAll('.cv-page');
  pages.forEach(page => {
    page.classList.remove('layout-single', 'layout-two-column', 'layout-sidebar');
    page.classList.add(`layout-${currentCustomization.layoutType}`);
  });
  
  // Le conteneur reste en disposition verticale pour empiler les pages
  previewContainer.style.display = 'block';
  
  // Pour le layout sidebar, assigner les sections aux colonnes
  if (currentCustomization.layoutType === 'sidebar') {
    const sections = previewContainer.querySelectorAll('.cv-section');
    sections.forEach((section, index) => {
      section.classList.remove('sidebar-left', 'sidebar-right');
      
      // Header reste en pleine largeur
      if (section.dataset.section === 'header') {
        return;
      }
      
      // Répartir les autres sections
      if (section.dataset.section === 'summary' || 
          section.dataset.section === 'skills' || 
          section.dataset.section === 'languages') {
        section.classList.add('sidebar-left');
      } else {
        section.classList.add('sidebar-right');
      }
    });
  }
}

// Gérer l'affichage des lignes de section
function applySectionLines() {
  const sectionTitles = previewContainer.querySelectorAll('.cv-section-title, .cv-preview h3');
  
  sectionTitles.forEach(title => {
    if (currentCustomization.showSectionLines) {
      title.classList.remove('no-line');
    } else {
      title.classList.add('no-line');
    }
  });
}

// Gestion de la pagination automatique
function handlePagination() {
  const maxPages = currentCustomization.maxPages;
  const pageHeight = 297; // mm
  const marginTop = currentCustomization.pageMarginTop;
  const marginBottom = currentCustomization.pageMarginBottom;
  const availableHeight = pageHeight - marginTop - marginBottom;
  
  // Calculer la hauteur approximative du contenu
  const contentHeight = calculateContentHeight();
  
  if (contentHeight > availableHeight) {
    // Le contenu dépasse une page
    if (maxPages > 1) {
      splitIntoPages();
    } else {
      showPageOverflowWarning();
    }
  } else {
    // Le contenu tient sur une page
    removePageOverflowWarning();
  }
}

// Calculer la hauteur approximative du contenu
function calculateContentHeight() {
  // Estimation basée sur le nombre d'éléments et les espacements
  const sections = previewContainer.querySelectorAll('.cv-section');
  let totalHeight = 0;
  
  sections.forEach(section => {
    // Estimation approximative en mm
    const sectionHeight = section.offsetHeight * 0.264583; // px to mm
    totalHeight += sectionHeight + currentCustomization.sectionSpacing;
  });
  
  return totalHeight;
}

// Diviser le contenu en pages
function splitIntoPages() {
  // Cette fonction sera implémentée pour diviser automatiquement le contenu
  console.log('Content needs to be split into multiple pages');
  // TODO: Implémenter la logique de division en pages
}

// Afficher un avertissement de débordement
function showPageOverflowWarning() {
  let indicator = previewContainer.querySelector('.page-overflow-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'page-overflow-indicator';
    indicator.textContent = 'Contenu trop long pour 1 page';
    previewContainer.style.position = 'relative';
    previewContainer.appendChild(indicator);
  }
}

// Supprimer l'avertissement de débordement
function removePageOverflowWarning() {
  const indicator = previewContainer.querySelector('.page-overflow-indicator');
  if (indicator) {
    indicator.remove();
  }
}

// Mettre à jour le formulaire avec la configuration actuelle
function updateFormFromCustomization() {
  document.getElementById('fontFamily').value = currentCustomization.fontFamily;
  document.getElementById('baseFontSize').value = currentCustomization.baseFontSize;
  document.getElementById('lineHeight').value = currentCustomization.lineHeight;
  document.getElementById('letterSpacing').value = currentCustomization.letterSpacing;
  document.getElementById('pageMarginTop').value = currentCustomization.pageMarginTop;
  document.getElementById('pageMarginBottom').value = currentCustomization.pageMarginBottom;
  document.getElementById('pageMarginLeft').value = currentCustomization.pageMarginLeft;
  document.getElementById('pageMarginRight').value = currentCustomization.pageMarginRight;
  document.getElementById('sectionSpacing').value = currentCustomization.sectionSpacing;
  document.getElementById('paragraphSpacing').value = currentCustomization.paragraphSpacing;
  document.getElementById('layoutType').value = currentCustomization.layoutType;
  document.getElementById('leftColumnWidth').value = currentCustomization.leftColumnWidth;
  document.getElementById('columnGap').value = currentCustomization.columnGap;
  document.getElementById('maxPages').value = currentCustomization.maxPages;
  document.getElementById('h1Size').value = currentCustomization.h1Size;
  document.getElementById('h2Size').value = currentCustomization.h2Size;
  document.getElementById('h3Size').value = currentCustomization.h3Size;
  document.getElementById('titleSpacing').value = currentCustomization.titleSpacing;
  document.getElementById('showSectionLines').checked = currentCustomization.showSectionLines;
  document.getElementById('lineThickness').value = currentCustomization.lineThickness;
  document.getElementById('lineColor').value = currentCustomization.lineColor;
  document.getElementById('lineMargin').value = currentCustomization.lineMargin;
  
  // Gérer l'affichage du groupe de largeur de colonne
  const columnWidthGroup = document.getElementById('columnWidthGroup');
  if (currentCustomization.layoutType === 'single') {
    columnWidthGroup.style.display = 'none';
  } else {
    columnWidthGroup.style.display = 'block';
  }
}

// Réinitialiser la personnalisation
function resetCustomization() {
  currentCustomization = { ...defaultCustomization };
  window.currentCustomization = currentCustomization;
  updateFormFromCustomization();
  applyCustomization();
  saveCustomizationToStorage();
}

// Sauvegarder dans le localStorage
function saveCustomizationToStorage() {
  localStorage.setItem('cv-customization', JSON.stringify(currentCustomization));
}

// Charger depuis le localStorage
function loadCustomizationFromStorage() {
  const saved = localStorage.getItem('cv-customization');
  if (saved) {
    try {
      currentCustomization = { ...defaultCustomization, ...JSON.parse(saved) };
      window.currentCustomization = currentCustomization;
      updateFormFromCustomization();
    } catch (error) {
      console.error('Error loading customization:', error);
      currentCustomization = { ...defaultCustomization };
      window.currentCustomization = currentCustomization;
    }
  }
}

// Sauvegarder un preset
function savePreset() {
  const presetName = prompt('Nom du preset :');
  if (!presetName) return;
  
  const presets = JSON.parse(localStorage.getItem('cv-presets') || '{}');
  presets[presetName] = { ...currentCustomization };
  localStorage.setItem('cv-presets', JSON.stringify(presets));
  
  showNotification(`Preset "${presetName}" sauvegardé !`);
}

// Charger un preset
function loadPreset() {
  const presets = JSON.parse(localStorage.getItem('cv-presets') || '{}');
  const presetNames = Object.keys(presets);
  
  if (presetNames.length === 0) {
    alert('Aucun preset sauvegardé');
    return;
  }
  
  const presetName = prompt(`Presets disponibles :\n${presetNames.join('\n')}\n\nNom du preset à charger :`);
  if (!presetName || !presets[presetName]) {
    alert('Preset non trouvé');
    return;
  }

  currentCustomization = { ...presets[presetName] };
  window.currentCustomization = currentCustomization;
  updateFormFromCustomization();
  applyCustomization();
  saveCustomizationToStorage();
  
  showNotification(`Preset "${presetName}" chargé !`);
}

// Afficher une notification
function showNotification(message) {
  // Créer une notification temporaire
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000;
    font-weight: 500;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Fonction utilitaire debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Exporter la fonction d'application pour utilisation externe
export function applyCurrentCustomization() {
  applyCustomization();
}

// Rendre la fonction disponible globalement pour compatibilité
window.applyCurrentCustomization = applyCurrentCustomization;

// Exporter la configuration actuelle
export function getCurrentCustomization() {
  return { ...currentCustomization };
}

// Fonction d'optimisation automatique pour les deux colonnes
function optimizeForTwoColumns() {
  // Paramètres optimisés pour deux colonnes
  const twoColumnOptimization = {
    baseFontSize: 10,
    lineHeight: 1.25,
    pageMarginTop: 12,
    pageMarginBottom: 12,
    pageMarginLeft: 12,
    pageMarginRight: 12,
    sectionSpacing: 3.5,
    paragraphSpacing: 2,
    leftColumnWidth: 40,
    columnGap: 4,
    h1Size: 15,
    h2Size: 12,
    h3Size: 11,
    titleSpacing: 1.2,
    lineThickness: 0.6,
    lineMargin: 0.6
  };
  
  // Appliquer les optimisations
  Object.assign(currentCustomization, twoColumnOptimization);
  
  // Mettre à jour le formulaire
  updateFormFromCustomization();
  
  // Appliquer les changements
  applyCustomization();
  saveCustomizationToStorage();
  
  // Notification
  showNotification('✨ Optimisation automatique appliquée pour deux colonnes !');
}

// Fonction pour régénérer l'aperçu avec pagination
function regeneratePreviewWithPagination() {
  // Sauvegarder les paramètres dans localStorage pour la pagination
  localStorage.setItem('cv-max-pages', currentCustomization.maxPages.toString());
  localStorage.setItem('cv-margin-top', currentCustomization.pageMarginTop.toString());
  localStorage.setItem('cv-margin-bottom', currentCustomization.pageMarginBottom.toString());
  localStorage.setItem('cv-margin-left', currentCustomization.pageMarginLeft.toString());
  localStorage.setItem('cv-margin-right', currentCustomization.pageMarginRight.toString());
  
  // Importer et appeler la fonction de génération d'aperçu
  import('./app.js').then(module => {
    // Récupérer les données du formulaire et régénérer l'aperçu
    const formData = collectFormData();
    import('./preview.js').then(previewModule => {
      if (previewModule.generatePreview) {
        previewModule.generatePreview(formData);
      }
    });
  }).catch(error => {
    console.log('Régénération de l\'aperçu en cours...');
    // Fallback: déclencher un événement personnalisé
    window.dispatchEvent(new CustomEvent('regeneratePreview'));
  });
}

// Fonction pour collecter les données du formulaire
function collectFormData() {
  const form = document.getElementById('cv-form');
  if (!form) return {};
  
  const formData = new FormData(form);
  const data = {};
  
  // Collecter les données de base
  data.fullName = document.getElementById('fullName')?.value || '';
  data.jobTitle = document.getElementById('jobTitle')?.value || '';
  data.email = document.getElementById('email')?.value || '';
  data.phone = document.getElementById('phone')?.value || '';
  data.address = document.getElementById('address')?.value || '';
  data.summary = document.getElementById('summary-text')?.value || '';
  
  // Collecter les expériences
  data.experience = [];
  const experienceItems = document.querySelectorAll('#experience-list .form-item');
  experienceItems.forEach((item, index) => {
    const title = item.querySelector(`input[name="experience[${index}][title]"]`)?.value || '';
    const company = item.querySelector(`input[name="experience[${index}][company]"]`)?.value || '';
    const description = item.querySelector(`textarea[name="experience[${index}][description]"]`)?.value || '';
    const startDate = item.querySelector(`input[name="experience[${index}][startDate]"]`)?.value || '';
    const endDate = item.querySelector(`input[name="experience[${index}][endDate]"]`)?.value || '';
    const current = item.querySelector(`input[name="experience[${index}][current]"]`)?.checked || false;
    
    if (title && company) {
      data.experience.push({
        title,
        company,
        description,
        period: formatPeriod(startDate, endDate, current)
      });
    }
  });
  
  // Collecter les formations
  data.education = [];
  const educationItems = document.querySelectorAll('#education-list .form-item');
  educationItems.forEach((item, index) => {
    const degree = item.querySelector(`input[name="education[${index}][degree]"]`)?.value || '';
    const school = item.querySelector(`input[name="education[${index}][school]"]`)?.value || '';
    const startDate = item.querySelector(`input[name="education[${index}][startDate]"]`)?.value || '';
    const endDate = item.querySelector(`input[name="education[${index}][endDate]"]`)?.value || '';
    
    if (degree && school) {
      data.education.push({
        degree,
        school,
        period: formatPeriod(startDate, endDate, false)
      });
    }
  });
  
  // Collecter les compétences
  const technicalSkills = [];
  const softSkills = [];
  
  document.querySelectorAll('#technical-skills .skill-item').forEach(item => {
    const name = item.querySelector('input[type="text"]')?.value;
    if (name) technicalSkills.push(name);
  });
  
  document.querySelectorAll('#soft-skills .skill-item').forEach(item => {
    const name = item.querySelector('input[type="text"]')?.value;
    if (name) softSkills.push(name);
  });
  
  if (technicalSkills.length > 0 || softSkills.length > 0) {
    data.skills = '';
    if (technicalSkills.length > 0) {
      data.skills += 'Compétences techniques: ' + technicalSkills.join(', ');
    }
    if (softSkills.length > 0) {
      if (data.skills) data.skills += '\n';
      data.skills += 'Compétences transversales: ' + softSkills.join(', ');
    }
  }
  
  // Données de recrutement
  data.recruiterFirstName = document.getElementById('recruiterFirstName')?.value || '';
  data.recruiterLastName = document.getElementById('recruiterLastName')?.value || '';
  data.recruiterPosition = document.getElementById('recruiterPosition')?.value || '';
  data.recruiterPhone = document.getElementById('recruiterPhone')?.value || '';
  data.recruiterEmail = document.getElementById('recruiterEmail')?.value || '';
  data.companyName = document.getElementById('companyName')?.value || '';
  data.companyLogoUrl = document.getElementById('companyLogoUrl')?.value || '';
  
  return data;
}

// Fonction utilitaire pour formater les périodes
function formatPeriod(startDate, endDate, current) {
  if (!startDate) return '';
  
  const start = new Date(startDate + '-01');
  const startFormatted = start.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  
  if (current) {
    return `${startFormatted} - Présent`;
  } else if (endDate) {
    const end = new Date(endDate + '-01');
    const endFormatted = end.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    return `${startFormatted} - ${endFormatted}`;
  } else {
    return startFormatted;
  }
}