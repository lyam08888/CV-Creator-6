import { runAI } from './ai.js';

export function initForm() {
  document.getElementById('btnAddExperience').addEventListener('click', addExperience);
  document.getElementById('btnAddEducation').addEventListener('click', addEducation);
}

function addExperience() {
  const list = document.getElementById('experience-list');
  const index = list.children.length;
  const item = document.createElement('div');
  item.classList.add('form-group');
  item.innerHTML = `
    <input type="text" name="experience[${index}][title]" class="input" placeholder="Titre du poste">
    <input type="text" name="experience[${index}][company]" class="input" placeholder="Entreprise">
    <input type="text" name="experience[${index}][period]" class="input" placeholder="Période (ex: 2020 - 2022)">
    <div class="textarea-wrapper">
      <textarea name="experience[${index}][description]" class="textarea" placeholder="Description des missions"></textarea>
      <button type="button" class="btn-ai-icon hidden" data-target="experience[${index}][description]" title="Améliorer avec IA">✨</button>
    </div>
  `;
  list.appendChild(item);
  attachAIButtonListeners(item);
}

function addEducation() {
  const list = document.getElementById('education-list');
  const index = list.children.length;
  const item = document.createElement('div');
  item.classList.add('form-group');
  item.innerHTML = `
    <input type="text" name="education[${index}][degree]" class="input" placeholder="Diplôme">
    <input type="text" name="education[${index}][school]" class="input" placeholder="École ou université">
    <input type="text" name="education[${index}][period]" class="input" placeholder="Période (ex: 2018 - 2020)">
    <div class="textarea-wrapper">
      <textarea name="education[${index}][description]" class="textarea" placeholder="Description de la formation"></textarea>
      <button type="button" class="btn-ai-icon hidden" data-target="education[${index}][description]" title="Améliorer avec IA">✨</button>
    </div>
  `;
  list.appendChild(item);
  attachAIButtonListeners(item);
}

function attachAIButtonListeners(container) {
  const textarea = container.querySelector('.textarea');
  const aiButton = container.querySelector('.btn-ai-icon');

  textarea.addEventListener('focus', () => aiButton.classList.remove('hidden'));
  textarea.addEventListener('blur', () => {
    // Hide only if textarea is empty
    if (textarea.value.trim() === '') {
      aiButton.classList.add('hidden');
    }
  });

  aiButton.addEventListener('click', async (e) => {
    const targetName = e.target.dataset.target;
    const targetTextarea = container.querySelector(`textarea[name="${targetName}"]`);
    const currentText = targetTextarea.value;
    const prompt = `Reformule et améliore la description suivante pour un CV professionnel, en la rendant plus percutante et orientée résultats:\n\n${currentText}`;
    const improvedText = await runAI({ action: 'improve-text', prompt: prompt });
    if (improvedText) {
      targetTextarea.value = improvedText;
    }
  });
}


