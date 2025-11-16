/* * SCRIPT FOR THE CUSTOMIZER PAGE
 */

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. Select DOM Elements ---
  const form = document.getElementById('gift-form');
  const items = form.querySelectorAll('input[name="item"]');
  const messageInput = document.getElementById('gift-message');
  const packagingInputs = form.querySelectorAll('input[name="packaging"]');
  
  const previewBox = document.getElementById('preview-box');
  const itemsList = document.getElementById('preview-items-list');
  const messagePreview = document.getElementById('preview-message');
  const totalCostEl = document.getElementById('total-cost');
  
  
  // --- 2. Main Update Function ---
  // This function will be called whenever any input changes
  function updatePreview() {
    
    // --- Update Items & Calculate Cost ---
    let currentTotal = 0;
    itemsList.innerHTML = ''; // Clear the list before rebuilding
    
    items.forEach(item => {
      if (item.checked) {
        // Create a new list item
        const li = document.createElement('li');
        li.textContent = item.value;
        itemsList.appendChild(li);
        
        // Add to total
        currentTotal += parseFloat(item.dataset.price);
      }
    });

    // --- Update Message ---
    const msg = messageInput.value;
    if (msg) {
      messagePreview.textContent = `"${msg}"`; // Show message in quotes
    } else {
      messagePreview.textContent = 'Your message will appear here.'; // Default text
    }

    // --- Update Packaging ---
    const selectedPackaging = form.querySelector('input[name="packaging"]:checked').value;
    
    // Remove old classes and add the new one for styling
    previewBox.classList.remove('classic-kraft', 'premium-black');
    
    if (selectedPackaging === 'Classic Kraft') {
      previewBox.classList.add('classic-kraft');
    } else if (selectedPackaging === 'Premium Black') {
      previewBox.classList.add('premium-black');
    }
    
    // --- Update Total Cost ---
    totalCostEl.textContent = `$${currentTotal.toFixed(2)}`;
  }

  
  // --- 3. Attach Event Listeners ---
  
  // Listen for changes on all checkboxes and radio buttons
  form.querySelectorAll('input[type="checkbox"], input[type="radio"]')
    .forEach(input => {
      input.addEventListener('change', updatePreview);
    });
    
  // Listen for key presses in the textarea (using 'input' for real-time updates)
  messageInput.addEventListener('input', updatePreview);

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop the form from actually submitting
    alert('Your custom gift has been added to the cart! (Demo)');
    // In a real app, you would gather all the data here and send it to a cart
  });

  // --- 4. Initial Call ---
  // Run the function once on page load to set the initial state
  updatePreview();

});