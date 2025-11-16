document.addEventListener('DOMContentLoaded', () => {
  
  const form = document.getElementById('gift-form');
  const items = form.querySelectorAll('input[name="item"]');
  const messageInput = document.getElementById('gift-message');
  const packagingInputs = form.querySelectorAll('input[name="packaging"]');
  
  const previewBox = document.getElementById('preview-box');
  const itemsList = document.getElementById('preview-items-list');
  const messagePreview = document.getElementById('preview-message');
  const totalCostEl = document.getElementById('total-cost');
  
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
    alert('Your custom gift has been added to the cart! (Demo)');
  });

  updatePreview();

});