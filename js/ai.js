const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function runAI(options) {
  const apiKey = localStorage.getItem('cvpro_api_key') || '';
  if (!apiKey) {
    alert('Veuillez enregistrer votre clé API Gemini dans les paramètres.');
    return;
  }

  let prompt;
  if (options.action === 'generate-summary' || options.action === 'improve-text' || options.action === 'suggest-skills' || options.action === 'analyze-cv' || options.action === 'auto-fill-cv') {
    prompt = options.prompt;
  } else {
    // Original prompt for full CV generation
    prompt = `
      Génère un CV professionnel et moderne en HTML basé sur les informations suivantes.
      Utilise des classes CSS simples et sémantiques pour que je puisse le styliser facilement.
      Voici les données :

      Informations Personnelles:
      - Nom complet: ${options.fullName}
      - Titre du poste: ${options.jobTitle}
      - Email: ${options.email}
      - Téléphone: ${options.phone}
      - Adresse: ${options.address}

      Résumé:
      ${options.summary}

      Expérience Professionnelle:
      ${options.experience ? options.experience.map(exp => `- ${exp.title} chez ${exp.company} (${exp.period}): ${exp.description}`).join('\n') : ''}

      Formation:
      ${options.education ? options.education.map(edu => `- ${edu.degree} à ${edu.school} (${edu.period})`).join('\n') : ''}

      Compétences:
      ${options.skills}
    `;
  }

  try {
    const res = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ "text": prompt }]
        }]
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text;
      }
    } else {
        const error = await res.json();
        console.error('Gemini API error:', error);
        alert(`Erreur de l'API Gemini: ${error.error.message}`);
    }
  } catch (e) {
    console.error('Network error:', e);
    alert('Erreur réseau. Impossible de joindre l\'API Gemini.');
  }
}