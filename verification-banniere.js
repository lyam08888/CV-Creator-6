// Script de vérification pour la bannière de recrutement
console.log('🔍 Vérification de la bannière de recrutement...');

// Vérifier que tous les éléments HTML sont présents
function verifyHTMLElements() {
    const elements = [
        'showRecruitmentBanner',
        'recruitmentBannerControls',
        'bannerImageUrl',
        'recruiterFirstName',
        'recruiterLastName',
        'recruiterPosition',
        'recruiterPhone',
        'recruiterEmail',
        'companyName',
        'companyLogoUrl',
        'bannerMessage',
        'bannerStyle',
        'bannerColor',
        'bannerHeight',
        'fixRecruitmentBanner'
    ];
    
    const missing = [];
    elements.forEach(id => {
        if (!document.getElementById(id)) {
            missing.push(id);
        }
    });
    
    if (missing.length === 0) {
        console.log('✅ Tous les éléments HTML sont présents');
        return true;
    } else {
        console.log('❌ Éléments HTML manquants:', missing);
        return false;
    }
}

// Vérifier que les gestionnaires d'événements sont attachés
function verifyEventHandlers() {
    const checkbox = document.getElementById('showRecruitmentBanner');
    const slider = document.getElementById('bannerHeight');
    const fixCheckbox = document.getElementById('fixRecruitmentBanner');
    
    if (!checkbox || !slider) {
        console.log('❌ Éléments de contrôle non trouvés');
        return false;
    }
    
    // Simuler un changement pour tester
    try {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change'));
        
        const controls = document.getElementById('recruitmentBannerControls');
        if (controls && controls.style.display !== 'none') {
            console.log('✅ Gestionnaire de checkbox fonctionne');
        } else {
            console.log('❌ Gestionnaire de checkbox ne fonctionne pas');
            return false;
        }
        
        slider.value = '60';
        slider.dispatchEvent(new Event('input'));
        console.log('✅ Gestionnaire de slider testé');

        if (fixCheckbox) {
            fixCheckbox.checked = true;
            fixCheckbox.dispatchEvent(new Event('change'));
            console.log('✅ Gestionnaire de fixation testé');
        }
        
        return true;
    } catch (error) {
        console.log('❌ Erreur lors du test des gestionnaires:', error);
        return false;
    }
}

// Vérifier que les styles CSS sont chargés
function verifyCSS() {
    const testElement = document.createElement('div');
    testElement.className = 'cv-recruitment-banner banner-modern';
    testElement.style.position = 'absolute';
    testElement.style.visibility = 'hidden';
    document.body.appendChild(testElement);
    
    const styles = window.getComputedStyle(testElement);
    const hasStyles = styles.display === 'flex' || styles.position === 'relative';
    
    document.body.removeChild(testElement);
    
    if (hasStyles) {
        console.log('✅ Styles CSS de la bannière chargés');
        return true;
    } else {
        console.log('❌ Styles CSS de la bannière non chargés');
        return false;
    }
}

// Vérifier que les fonctions JavaScript sont disponibles
function verifyJavaScriptFunctions() {
    const functions = [
        'generatePreview',
        'getFormData',
        'loadDemoData'
    ];
    
    const missing = [];
    functions.forEach(funcName => {
        if (typeof window[funcName] !== 'function') {
            missing.push(funcName);
        }
    });
    
    if (missing.length === 0) {
        console.log('✅ Toutes les fonctions JavaScript sont disponibles');
        return true;
    } else {
        console.log('❌ Fonctions JavaScript manquantes:', missing);
        return false;
    }
}

// Test de génération de bannière
function testBannerGeneration() {
    try {
        // Simuler des données de test
        const testData = {
            showRecruitmentBanner: true,
            recruiterFirstName: "Test",
            recruiterLastName: "Recruiter",
            companyName: "Test Company",
            bannerStyle: "modern",
            bannerColor: "#3B82F6",
            bannerHeight: "50",
            fixRecruitmentBanner: true
        };
        
        // Vérifier que getFormData inclut les données de bannière
        const formData = window.getFormData ? window.getFormData() : {};
        const hasBannerData = 'showRecruitmentBanner' in formData && 'fixRecruitmentBanner' in formData;
        
        if (hasBannerData) {
            console.log('✅ getFormData inclut les données de bannière');
            return true;
        } else {
            console.log('❌ getFormData n\'inclut pas les données de bannière');
            return false;
        }
    } catch (error) {
        console.log('❌ Erreur lors du test de génération:', error);
        return false;
    }
}

// Exécuter tous les tests
function runAllTests() {
    console.log('🚀 Début des tests de vérification...');
    
    const tests = [
        { name: 'Éléments HTML', func: verifyHTMLElements },
        { name: 'Gestionnaires d\'événements', func: verifyEventHandlers },
        { name: 'Styles CSS', func: verifyCSS },
        { name: 'Fonctions JavaScript', func: verifyJavaScriptFunctions },
        { name: 'Génération de bannière', func: testBannerGeneration }
    ];
    
    let passed = 0;
    let total = tests.length;
    
    tests.forEach(test => {
        console.log(`\n🧪 Test: ${test.name}`);
        if (test.func()) {
            passed++;
        }
    });
    
    console.log(`\n📊 Résultats: ${passed}/${total} tests réussis`);
    
    if (passed === total) {
        console.log('🎉 Tous les tests sont passés ! La bannière de recrutement est prête.');
        return true;
    } else {
        console.log('⚠️ Certains tests ont échoué. Vérifiez les erreurs ci-dessus.');
        return false;
    }
}

// Exporter pour utilisation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { runAllTests, verifyHTMLElements, verifyEventHandlers, verifyCSS, verifyJavaScriptFunctions, testBannerGeneration };
} else {
    window.verificationBanniere = { runAllTests, verifyHTMLElements, verifyEventHandlers, verifyCSS, verifyJavaScriptFunctions, testBannerGeneration };
}

// Exécuter automatiquement si le DOM est chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(runAllTests, 1000);
    });
} else {
    setTimeout(runAllTests, 1000);
}