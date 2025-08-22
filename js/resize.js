export function initResizableSections() {
  // Remove existing resizers to avoid duplicates
  document.querySelectorAll('.section-resizer').forEach(r => r.remove());

  const sections = document.querySelectorAll('.cv-section');
  sections.forEach(section => {
    section.style.position = section.style.position || 'relative';

    const resizer = document.createElement('div');
    resizer.className = 'section-resizer';
    section.appendChild(resizer);

    let startY = 0;
    let startHeight = 0;

    const onMouseDown = (e) => {
      e.preventDefault();
      startY = e.clientY;
      startHeight = parseInt(window.getComputedStyle(section).height, 10);
      document.documentElement.addEventListener('mousemove', onMouseMove);
      document.documentElement.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      const dy = e.clientY - startY;
      section.style.height = `${startHeight + dy}px`;
    };

    const onMouseUp = () => {
      document.documentElement.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseup', onMouseUp);
    };

    resizer.addEventListener('mousedown', onMouseDown);
  });
}

export function initResizableColumns() {
  const existing = document.getElementById('column-resizer');
  if (existing) existing.remove();

  const preview = document.getElementById('cv-preview');
  if (!preview || !preview.classList.contains('layout-sidebar')) return;

  const handle = document.createElement('div');
  handle.id = 'column-resizer';
  preview.appendChild(handle);

  let startX = 0;
  let startWidth = 0;

  const onMouseDown = (e) => {
    startX = e.clientX;
    startWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cv-left-column-width'));
    document.documentElement.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    const dx = e.clientX - startX;
    const previewWidth = preview.getBoundingClientRect().width;
    let newWidth = ((startWidth / 100 * previewWidth + dx) / previewWidth) * 100;
    newWidth = Math.max(10, Math.min(80, newWidth));
    document.documentElement.style.setProperty('--cv-left-column-width', `${newWidth}%`);
  };

  const onMouseUp = () => {
    document.documentElement.removeEventListener('mousemove', onMouseMove);
    document.documentElement.removeEventListener('mouseup', onMouseUp);
  };

  handle.addEventListener('mousedown', onMouseDown);
}
