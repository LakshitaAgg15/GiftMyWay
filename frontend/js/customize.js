document.addEventListener('DOMContentLoaded', () => {
  
  const form = document.getElementById('gift-form');
  const items = form.querySelectorAll('input[name="item"]');
  const messageInput = document.getElementById('gift-message');
  const packagingInputs = form.querySelectorAll('input[name="packaging"]');
  
  const previewBox = document.getElementById('preview-box');
  const itemsList = document.getElementById('preview-items-list');
  const messagePreview = document.getElementById('preview-message');
  const totalCostEl = document.getElementById('total-cost');
  const occasionInput = document.getElementById('occasion-input');
  const relationshipInput = document.getElementById('relationship-input');
  const toneInput = document.getElementById('tone-input');
  const generateNoteBtn = document.getElementById('generate-note-btn');
  const aiGeneratedNote = document.getElementById('ai-generated-note');
  
  function updatePreview() {
    
    let currentTotal = 0;
    itemsList.innerHTML = '';
    
    items.forEach(item => {
      if (item.checked) {
        const li = document.createElement('li');
        li.textContent = item.value;
        itemsList.appendChild(li);
        
        currentTotal += parseFloat(item.dataset.price);
      }
    });

    const msg = messageInput.value;
    if (msg) {
      messagePreview.textContent = `"${msg}"`;
    } else {
      messagePreview.textContent = 'Your message will appear here.'; 
    }

    const selectedPackaging = form.querySelector('input[name="packaging"]:checked').value;
    
    previewBox.classList.remove('classic-kraft', 'premium-black');
    
    if (selectedPackaging === 'Classic Kraft') {
      previewBox.classList.add('classic-kraft');
    } else if (selectedPackaging === 'Premium Black') {
      previewBox.classList.add('premium-black');
    }
    
    totalCostEl.textContent = `₹${currentTotal.toFixed(2)}`;
  }

  form.querySelectorAll('input[type="checkbox"], input[type="radio"]')
    .forEach(input => {
      input.addEventListener('change', updatePreview);
    });
    
  messageInput.addEventListener('input', updatePreview);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Your custom gift has been added to the cart! (Demo)');
  });

  if (generateNoteBtn) {
    generateNoteBtn.addEventListener('click', async () => {
      const occasion = occasionInput.value.trim();
      const relationship = relationshipInput.value.trim();
      const tone = toneInput.value.trim();

      if (!occasion || !relationship || !tone) {
        alert('Please fill Occasion, Relationship, and Tone before generating.');
        return;
      }

      const defaultBtnText = 'Generate Note';
      generateNoteBtn.disabled = true;
      generateNoteBtn.textContent = 'Generating...';

      try {
        const response = await fetch('/api/ai/generate-note', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ occasion, relationship, tone }),
        });

        const data = await response.json();

        if (!response.ok || !data.note) {
          throw new Error('Note generation failed.');
        }

        aiGeneratedNote.value = data.note;
        messageInput.value = data.note;
        updatePreview();
      } catch (error) {
        console.error('Error generating note:', error);
        alert('Unable to generate note right now. Please try again.');
      } finally {
        generateNoteBtn.disabled = false;
        generateNoteBtn.textContent = defaultBtnText;
      }
    });
  }

  updatePreview();

});
