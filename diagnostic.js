// Script de diagnostic pour CV Creator
console.log('🔧 Diagnostic CV Creator - Démarrage...');

// Vérifier que le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM chargé');
    
    // Vérifier les éléments essentiels
    const essentialElements = [
        { id: 'cv-form', name: 'Formulaire principal' },
        { id: 'cv-preview', name: 'Aperçu CV' },
        { class: 'nav-btn', name: 'Boutons de navigation' },
        { class: 'form-section', name: 'Sections de formulaire' }
    ];
    
    essentialElements.forEach(element => {
        let found;
        if (element.id) {
            found = document.getElementById(element.id);
        } else if (element.class) {
            found = document.querySelectorAll('.' + element.class);
        }
        
        if (found && (found.length > 0 || found.nodeType)) {
            console.log(`✅ ${element.name} trouvé`);
        } else {
            console.error(`❌ ${element.name} non trouvé`);
        }
    });
    
    // Vérifier les scripts externes avec retry
    const externalScripts = [
        { name: 'Sortable.js', check: () => typeof window.Sortable !== 'undefined' },
        { name: 'html2canvas', check: () => typeof window.html2canvas !== 'undefined' },
        { name: 'jsPDF', check: () => typeof window.jspdf !== 'undefined' }
    ];
    
    function checkExternalScripts() {
        externalScripts.forEach(script => {
            if (script.check()) {
                console.log(`✅ ${script.name} chargé`);
            } else {
                console.warn(`⚠️ ${script.name} non chargé`);
                
                // Pour Sortable.js, essayer de charger le fallback
                if (script.name === 'Sortable.js') {
                    console.log('🔄 Tentative de chargement du fallback Sortable.js...');
                    setTimeout(() => {
                        if (script.check()) {
                            console.log('✅ Fallback Sortable.js chargé avec succès');
                        } else {
                            console.error('❌ Impossible de charger Sortable.js (CDN + fallback)');
                        }
                    }, 2000);
                }
            }
        });
    }
    
    checkExternalScripts();
    
    // Revérifier après 3 secondes
    setTimeout(checkExternalScripts, 3000);
    
    // Vérifier les fonctions principales
    setTimeout(() => {
        const mainFunctions = [
            'initNavigation',
            'initFormHandlers',
            'generatePreview',
            'initDragAndDrop'
        ];
        
        mainFunctions.forEach(funcName => {
            if (typeof window[funcName] === 'function') {
                console.log(`✅ Fonction ${funcName} disponible`);
            } else {
                console.warn(`⚠️ Fonction ${funcName} non disponible`);
            }
        });
        
        // Test de navigation
        const navButtons = document.querySelectorAll('.nav-btn');
        if (navButtons.length > 0) {
            console.log(`✅ ${navButtons.length} boutons de navigation trouvés`);
            
            // Tester le premier bouton
            const firstButton = navButtons[0];
            const targetForm = firstButton.getAttribute('data-form');
            const targetSection = document.getElementById(targetForm);
            
            if (targetSection) {
                console.log(`✅ Navigation fonctionnelle (test avec ${targetForm})`);
            } else {
                console.error(`❌ Section cible ${targetForm} non trouvée`);
            }
        }
        
        console.log('🔧 Diagnostic terminé');
    }, 1000);
});

// Capturer les erreurs JavaScript
window.addEventListener('error', function(e) {
    console.error('❌ Erreur JavaScript détectée:', e.message, 'dans', e.filename, 'ligne', e.lineno);
});

// Capturer les erreurs de modules
window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Erreur de module détectée:', e.reason);
});