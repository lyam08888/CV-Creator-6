import { initDragAndDrop } from './drag.js';
import { initResizableSections, initResizableColumns } from './resize.js';

export function generatePreview(formData) {
  const previewContainer = document.getElementById('cv-preview');

  // Générer le contenu des sections
  const sections = generateSections(formData);
  
  // Créer les pages avec pagination automatique
  const pages = createPagesWithPagination(sections);
  
  // Injecter le HTML dans le conteneur
  previewContainer.innerHTML = pages;
  
  // Optimiser les espaces vides
  optimizeSpacing();
  
  // Initialiser le drag & drop après avoir généré le contenu
  initDragAndDrop();
  initResizableSections();
  initResizableColumns();
  
  // Appliquer la personnalisation
  applyCustomizationToPreview();
}

// Fonction pour optimiser les espaces vides
export function optimizeSpacing() {
  const sections = document.querySelectorAll('.cv-section');
  
  sections.forEach(section => {
    // Supprimer les paragraphes vides
    const emptyParagraphs = section.querySelectorAll('p:empty, p:not(:has(*)):not([contenteditable])');
    emptyParagraphs.forEach(p => {
      if (!p.textContent.trim()) {
        p.remove();
      }
    });
    
    // Supprimer les divs vides
    const emptyDivs = section.querySelectorAll('div:empty:not(.drag-handle):not(.resize-handle)');
    emptyDivs.forEach(div => div.remove());
    
    // Optimiser les marges des éléments cv-item
    const items = section.querySelectorAll('.cv-item');
    items.forEach((item, index) => {
      // Réduire l'espacement par défaut
      item.style.marginBottom = '4px';
      item.style.paddingLeft = '4px';
      
      if (index === items.length - 1) {
        item.style.marginBottom = '0';
      }
      
      // Optimiser les paragraphes internes
      const paragraphs = item.querySelectorAll('p');
      paragraphs.forEach(p => {
        p.style.marginBottom = '2px';
        p.style.lineHeight = '1.3';
      });
      
      // Optimiser les titres h3
      const titles = item.querySelectorAll('h3');
      titles.forEach(title => {
        title.style.marginBottom = '2px';
        title.style.marginTop = '0';
      });
      
      // Optimiser les périodes
      const periods = item.querySelectorAll('.cv-period');
      periods.forEach(period => {
        period.style.marginTop = '1px';
        period.style.marginBottom = '2px';
      });
    });

    // Optimiser les titres de section h2
    const sectionTitles = section.querySelectorAll('h2');
    sectionTitles.forEach(title => {
      title.style.marginBottom = '4px';
      title.style.marginTop = '0';
    });

    // Réduire l'espacement global de la section
    section.style.marginBottom = '4px';
  });
  
  // Supprimer les sections complètement vides
  const emptySections = document.querySelectorAll('.cv-section:not(.cv-recruitment-banner)');
  emptySections.forEach(section => {
    const hasContent = section.querySelector('h1, h2, h3, p, li, img, .cv-item');
    const textContent = section.textContent.trim();
    if (!hasContent || textContent.length < 10) {
      section.remove();
    }
  });
  
  // Optimiser l'espacement des pages
  const pages = document.querySelectorAll('.cv-page');
  pages.forEach(page => {
    page.style.gap = '4px';
  });
}

function generateSections(formData) {
  const sections = [];
  const hiddenSections = JSON.parse(localStorage.getItem('cv-hidden-sections') || '[]');

  // Bannière de recrutement
  if (formData.showRecruitmentBanner && !hiddenSections.includes('recruitment-banner')) {
    const bannerStyle = formData.bannerStyle || 'modern';
    const bannerColor = formData.bannerColor || '#3B82F6';
    const bannerHeight = parseInt(formData.bannerHeight) || 20;
    const bannerImageUrl = formData.bannerImageUrl || '';
    
    // Ne pas ajouter la bannière si la hauteur est 0
    if (bannerHeight > 0) {
      sections.push({
        type: 'recruitment-banner',
        content: generateRecruitmentBanner(formData, bannerStyle, bannerColor, bannerHeight, bannerImageUrl),
        height: bannerHeight + 5 // hauteur + marge réduite
      });
    }
  }

  // En-tête
  if (!hiddenSections.includes('header')) {
    sections.push({
      type: 'header',
      content: `
        <div class="cv-section sortable" data-section="header">
          <div class="drag-handle">⋮⋮</div>
          <div class="cv-header">
            <h1 contenteditable="false">${formData.fullName || ''}</h1>
            <p contenteditable="false">${formData.jobTitle || ''}</p>
            <p contenteditable="false">${formData.email || ''} | ${formData.phone || ''} | ${formData.address || ''}</p>
          </div>
        </div>
      `,
      height: 35
    });
  }

  // Résumé
  if (formData.summary && !hiddenSections.includes('summary')) {
    sections.push({
      type: 'summary',
      content: `
        <div class="cv-section sortable" data-section="summary">
          <div class="drag-handle">⋮⋮</div>
          <h2 contenteditable="false">Résumé</h2>
          <p contenteditable="false">${formData.summary}</p>
        </div>
      `,
      height: 18 + Math.min((formData.summary.length / 200) * 6, 15) // estimation plus compacte
    });
  }

  // Expérience
  if (formData.experience && formData.experience.length > 0 && !hiddenSections.includes('experience')) {
    let experienceContent = '<div class="cv-section sortable" data-section="experience"><div class="drag-handle">⋮⋮</div><h2 contenteditable="false">Expérience Professionnelle</h2>';
    let experienceHeight = 15; // titre réduit
    let experienceItems = 0;
    formData.experience.forEach(exp => {
      const title = (exp.title || '').trim();
      const company = (exp.company || '').trim();
      const period = (exp.period || '').trim();
      const description = (exp.description || '').trim();

      // Ignorer l'entrée si toutes les informations sont vides
      if (!title && !company && !period && !description) {
        return;
      }

      experienceContent += `
        <div class="cv-item">
          <h3 contenteditable="false">${title}${company ? ` chez ${company}` : ''}</h3>
          ${period ? `<p class="cv-period" contenteditable="false">${period}</p>` : ''}
          ${description ? `<p contenteditable="false">${description}</p>` : ''}
        </div>
      `;
      experienceHeight += 12 + (description ? Math.min(description.length / 250 * 6, 12) : 0); // plus compact
      experienceItems++;
    });

    if (experienceItems > 0) {
      experienceContent += '</div>';

      sections.push({
        type: 'experience',
        content: experienceContent,
        height: experienceHeight
      });
    }
  }

  // Formation
  if (formData.education && formData.education.length > 0 && !hiddenSections.includes('education')) {
    let educationContent = '<div class="cv-section sortable" data-section="education"><div class="drag-handle">⋮⋮</div><h2 contenteditable="false">Formation</h2>';
    let educationHeight = 15;
    let educationItems = 0;

    formData.education.forEach(edu => {
      const degree = (edu.degree || '').trim();
      const school = (edu.school || '').trim();
      const period = (edu.period || '').trim();
      const description = (edu.description || '').trim();

      // Ignorer l'entrée si toutes les informations sont vides
      if (!degree && !school && !period && !description) {
        return;
      }

      educationContent += `
        <div class="cv-item">
          <h3 contenteditable="false">${degree}${school ? ` - ${school}` : ''}</h3>
          ${period ? `<p class="cv-period" contenteditable="false">${period}</p>` : ''}
          ${description ? `<p contenteditable="false">${description}</p>` : ''}
        </div>
      `;
      educationHeight += 12 + (description ? description.length / 200 * 6 : 0);
      educationItems++;
    });

    if (educationItems > 0) {
      educationContent += '</div>';

      sections.push({
        type: 'education',
        content: educationContent,
        height: educationHeight
      });
    }
  }

  // Compétences
  if (formData.skills && !hiddenSections.includes('skills')) {
    sections.push({
      type: 'skills',
      content: `
        <div class="cv-section sortable" data-section="skills">
          <div class="drag-handle">⋮⋮</div>
          <h2 contenteditable="false">Compétences</h2>
          <p contenteditable="false">${formData.skills}</p>
        </div>
      `,
      height: 40 + (formData.skills.length / 100) * 5
    });
  }

  // Appliquer l'ordre sauvegardé des sections si disponible
  const savedOrder = JSON.parse(localStorage.getItem('cv-section-order') || '[]');
  if (savedOrder.length > 0) {
    sections.sort((a, b) => {
      const indexA = savedOrder.indexOf(a.type);
      const indexB = savedOrder.indexOf(b.type);
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  }

  // Si la bannière doit être fixée, la forcer en première position
  if (formData.fixRecruitmentBanner) {
    const bannerIndex = sections.findIndex(sec => sec.type === 'recruitment-banner');
    if (bannerIndex > 0) {
      const [banner] = sections.splice(bannerIndex, 1);
      sections.unshift(banner);
    }
  }

  return sections;
}

function createPagesWithPagination(sections) {
  let maxPages = parseInt(localStorage.getItem('cv-max-pages') || '2');
  const pageMarginTop = parseFloat(localStorage.getItem('cv-margin-top') || '20');
  const pageMarginBottom = parseFloat(localStorage.getItem('cv-margin-bottom') || '20');
  const availableHeight = 297 - pageMarginTop - pageMarginBottom; // A4 height minus margins

  let pages = [];
  let currentPage = [];
  let currentPageHeight = 0;

  sections.forEach(section => {
    // Start a new page if the current one is full
    if (currentPageHeight + section.height > availableHeight && currentPage.length > 0) {
      pages.push(createPageHTML(currentPage, pages.length + 1));
      currentPage = [];
      currentPageHeight = 0;
    }

    currentPage.push(section);
    currentPageHeight += section.height;
  });

  // Push the last page
  if (currentPage.length > 0) {
    pages.push(createPageHTML(currentPage, pages.length + 1));
  }

  // If more pages are needed than allowed, automatically expand the limit
  if (pages.length > maxPages) {
    maxPages = pages.length;
    localStorage.setItem('cv-max-pages', maxPages.toString());
  }

  // If the user increased the max pages, append empty pages
  if (pages.length < maxPages) {
    for (let i = pages.length; i < maxPages; i++) {
      pages.push(createPageHTML([], i + 1));
    }
  }

  return pages.join('');
}

function createPageHTML(sections, pageNumber) {
  const sectionsHTML = sections.map(section => section.content).join('');
  
  return `
    <div class="cv-page" data-page="${pageNumber}">
      ${sectionsHTML}
      <div class="page-number">Page ${pageNumber}</div>
    </div>
  `;
}

function generateRecruitmentBanner(formData, bannerStyle, bannerColor, bannerHeight, bannerImageUrl) {
  const companyName = formData.companyName || '';
  const recruiterFirstName = formData.recruiterFirstName || '';
  const recruiterLastName = formData.recruiterLastName || '';
  const recruiterPosition = formData.recruiterPosition || '';
  const recruiterPhone = formData.recruiterPhone || '';
  const recruiterEmail = formData.recruiterEmail || '';
  const companyLogoUrl = formData.companyLogoUrl || '';
  const bannerMessage = formData.bannerMessage || '';

  const recruiterName = [recruiterFirstName, recruiterLastName].filter(Boolean).join(' ');
  
  // Si la hauteur est 0, retourner une bannière masquée
  if (bannerHeight <= 0) {
    return `
      <div class="cv-section cv-recruitment-banner banner-${bannerStyle} sortable" 
           data-section="recruitment-banner" 
           style="display: none !important; height: 0 !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important;">
      </div>
    `;
  }
  
  // Styles CSS inline pour la bannière
  const bannerStyles = `
    --banner-height: ${bannerHeight}mm;
    --banner-color: ${bannerColor};
    --banner-color-secondary: ${adjustColor(bannerColor, -20)};
    min-height: ${bannerHeight}mm;
    height: ${bannerHeight}mm;
    ${bannerImageUrl ? `background-image: url('${bannerImageUrl}');` : ''}
  `;

  const fixedClass = formData.fixRecruitmentBanner ? ' fixed-banner' : ' sortable';
  const dragHandle = formData.fixRecruitmentBanner ? '' : '<div class="drag-handle">⋮⋮</div>';

  return `
    <div class="cv-section cv-recruitment-banner banner-${bannerStyle}${fixedClass}"
         data-section="recruitment-banner"
         style="${bannerStyles}">
      ${dragHandle}
      <div class="banner-content">
        ${companyLogoUrl ? `<img src="${companyLogoUrl}" alt="${companyName} Logo" class="banner-logo">` : ''}
        <div class="banner-info">
          ${companyName ? `<h3 class="banner-company">${companyName}</h3>` : ''}
          ${recruiterName ? `<p class="banner-recruiter">Contact: ${recruiterName}</p>` : ''}
          ${recruiterPosition ? `<p class="banner-position">${recruiterPosition}</p>` : ''}
          ${recruiterPhone ? `<p class="banner-phone">Tel: ${recruiterPhone}</p>` : ''}
          ${recruiterEmail ? `<p class="banner-email">${recruiterEmail}</p>` : ''}
          ${bannerMessage ? `<p class="banner-message">${bannerMessage}</p>` : ''}
        </div>
      </div>
    </div>
  `;
}

function adjustColor(color, amount) {
  // Fonction utilitaire pour ajuster la luminosité d'une couleur
  const usePound = color[0] === '#';
  const col = usePound ? color.slice(1) : color;
  const num = parseInt(col, 16);
  let r = (num >> 16) + amount;
  let g = (num >> 8 & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;
  r = r > 255 ? 255 : r < 0 ? 0 : r;
  g = g > 255 ? 255 : g < 0 ? 0 : g;
  b = b > 255 ? 255 : b < 0 ? 0 : b;
  return (usePound ? '#' : '') + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}

function applyCustomizationToPreview() {
  // Cette fonction sera appelée pour appliquer les styles de personnalisation
  const customization = JSON.parse(localStorage.getItem('cv-customization') || '{}');
  
  if (Object.keys(customization).length > 0) {
    // Importer et appliquer la personnalisation
    import('./customization.js').then(module => {
      if (module.applyCurrentCustomization) {
        module.applyCurrentCustomization();
      }
    });
  }
}


// Fonction pour ajouter une nouvelle page
window.addNewPage = function() {

  // Augmente le nombre maximum de pages et régénère l'aperçu
  const currentMax = parseInt(localStorage.getItem('cv-max-pages') || '2');
  const newMax = currentMax + 1;
  localStorage.setItem('cv-max-pages', newMax.toString());

  const maxPagesInput = document.getElementById('maxPages');
  if (maxPagesInput) {
    maxPagesInput.value = newMax.toString();
  }

  if (window.currentCustomization) {
    window.currentCustomization.maxPages = newMax;
  }

  window.dispatchEvent(new CustomEvent('regeneratePreview'));

};

// Fonction pour supprimer la dernière page
window.removeLastPage = function() {
  const currentMax = parseInt(localStorage.getItem('cv-max-pages') || '2');
  if (currentMax > 1) {
    const newMax = currentMax - 1;
    localStorage.setItem('cv-max-pages', newMax.toString());

    const maxPagesInput = document.getElementById('maxPages');
    if (maxPagesInput) {
      maxPagesInput.value = newMax.toString();
    }

    if (window.currentCustomization) {
      window.currentCustomization.maxPages = newMax;
    }

    window.dispatchEvent(new CustomEvent('regeneratePreview'));
  }
};
