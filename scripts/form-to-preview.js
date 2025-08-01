const fields = [
  { inputId: 'input-name', previewId: 'preview-name', placeholder: 'Your Name' },
  { inputId: 'input-email', previewId: 'preview-email', placeholder: 'example@email.com' },
  { inputId: 'input-phone', previewId: 'preview-phone', placeholder: '1234567890' },
  { inputId: 'input-linkedin', previewId: 'preview-linkedin', placeholder: 'linkedin.com/in/yourprofile' },
  { inputId: 'input-summary', previewId: 'preview-summary', placeholder: 'Your summary will appear here.' },
  { inputId: 'input-degree', previewId: 'preview-degree', placeholder: 'Your Degree' },
  { inputId: 'input-school', previewId: 'preview-school', placeholder: 'Your University' },
  { inputId: 'input-project-name', previewId: 'preview-project-name', placeholder: 'Project Name' },
  { inputId: 'input-project-description', previewId: 'preview-project-description', placeholder: 'Project Description' },
];

function updateLivePreview(inputId, previewId, placeholder) {
  const value = document.querySelector(`#${inputId}`).value.trim();
  localStorage.setItem(inputId, value);
  document.querySelector(`#${previewId}`).textContent = value || placeholder;
}

function loadFromStorage(inputId, previewId) {
  const saved = localStorage.getItem(inputId);
  if (saved) {
    document.getElementById(inputId).value = saved;
    document.getElementById(previewId).textContent = saved;
  }
}

fields.forEach(({ inputId, previewId, placeholder }) => {
  document.querySelector(`#${inputId}`).addEventListener('input', () => {
    updateLivePreview(inputId, previewId, placeholder);
  });
  loadFromStorage(inputId, previewId);
});


['skills', 'interests'].forEach((type) => {
  const input = document.querySelector(`#input-${type}`);
  const output = document.querySelector(`#preview-${type}-list`);
  const list = document.querySelector(`.item-${type}-list`);
  const addBtn = document.querySelector(`.js-add-${type}`);

  function renderItem(text) {
    const li = document.createElement('li');
    li.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => {
      li.remove();
      const items = JSON.parse(localStorage.getItem(type)) || [];
      const updated = items.filter((item) => item !== text);
      localStorage.setItem(type, JSON.stringify(updated));
    };

    li.appendChild(deleteBtn);
    list.appendChild(text);
    output.appendChild(li);
    
  }

  addBtn.addEventListener('click', () => {
    const value = input.value.trim();
    if (value) {
      renderItem(value);
      const items = JSON.parse(localStorage.getItem(type)) || [];
      items.push(value);
      localStorage.setItem(type, JSON.stringify(items));
      input.value = '';
    }
  });

  const saved = JSON.parse(localStorage.getItem(type)) || [];
  saved.forEach(renderItem);
});
