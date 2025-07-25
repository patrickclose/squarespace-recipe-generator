document.addEventListener('DOMContentLoaded', function() {
    // Add ingredient button
    document.getElementById('add-ingredient').addEventListener('click', function(e) {
        e.preventDefault();
        const list = document.getElementById('ingredients-list');
        const newItem = document.createElement('li');
        newItem.className = 'ingredient-item';
        newItem.innerHTML = `
            <input type="text" placeholder="e.g., 2 cups all-purpose flour">
            <button class="btn btn-remove"><i class="fas fa-times"></i></button>
        `;
        list.appendChild(newItem);
        addRemoveEvent(newItem.querySelector('.btn-remove'));
    });
    
    // Add instruction button
    document.getElementById('add-instruction').addEventListener('click', function(e) {
        e.preventDefault();
        const list = document.getElementById('instructions-list');
        const newItem = document.createElement('li');
        newItem.className = 'instruction-item';
        newItem.innerHTML = `
            <input type="text" placeholder="e.g., Preheat oven to 375°F (190°C)">
            <button class="btn btn-remove"><i class="fas fa-times"></i></button>
        `;
        list.appendChild(newItem);
        addRemoveEvent(newItem.querySelector('.btn-remove'));
    });
    
    // Add remove event to existing buttons
    document.querySelectorAll('.btn-remove').forEach(button => {
        addRemoveEvent(button);
    });
    
    // Template selection
    document.querySelectorAll('.template-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.template-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    // Generate code button
    document.getElementById('generate-code').addEventListener('click', generateCode);
    
    // Copy code button
    document.getElementById('copy-code').addEventListener('click', copyCode);
});

function addRemoveEvent(button) {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const item = this.closest('li');
        if (item.parentNode.children.length > 1) {
            item.remove();
        } else {
            alert('You need at least one item!');
        }
    });
}

function generateCode() {
    // Get form values
    const title = document.getElementById('recipe-title').value || 'Delicious Recipe';
    const description = document.getElementById('recipe-description').value || 'A wonderful recipe to try.';
    const prepTime = document.getElementById('prep-time').value || '15';
    const cookTime = document.getElementById('cook-time').value || '30';
    const servings = document.getElementById('servings').value || '4';
    
    // Get ingredients
    const ingredients = [];
    document.querySelectorAll('.ingredient-item input').forEach(input => {
        if (input.value.trim()) {
            ingredients.push(input.value.trim());
        }
    });
    
    // Get instructions
    const instructions = [];
    document.querySelectorAll('.instruction-item input').forEach(input => {
        if (input.value.trim()) {
            instructions.push(input.value.trim());
        }
    });
    
    // Get selected template
    const selectedTemplate = document.querySelector('.template-option.active').dataset.template;
    
    // Generate code based on template
    let code = '';
    
    if (selectedTemplate === 'classic') {
        code = generateClassicTemplate(title, description, prepTime, cookTime, servings, ingredients, instructions);
    } else {
        code = generateModernTemplate(title, description, prepTime, cookTime, servings, ingredients, instructions);
    }
    
    // Display the code
    document.getElementById('code-output').textContent = code;
}

function generateClassicTemplate(title, description, prepTime, cookTime, servings, ingredients, instructions) {
    return `<!-- Classic Recipe Template -->
<div class="recipe-container" style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
  <h1 style="color: #2c3e50; text-align: center; margin-bottom: 10px;">${title}</h1>
  
  <p style="text-align: center; color: #7f8c8d; font-style: italic; margin-bottom: 25px;">${description}</p>
  
  <div style="display: flex; justify-content: space-around; flex-wrap: wrap; margin-bottom: 30px;">
    <div style="text-align: center; padding: 15px;">
      <div style="font-weight: bold; color: #3498db;">PREP TIME</div>
      <div>${prepTime} mins</div>
    </div>
    <div style="text-align: center; padding: 15px;">
      <div style="font-weight: bold; color: #3498db;">COOK TIME</div>
      <div>${cookTime} mins</div>
    </div>
    <div style="text-align: center; padding: 15px;">
      <div style="font-weight: bold; color: #3498db;">SERVINGS</div>
      <div>${servings}</div>
    </div>
  </div>
  
  <div style="display: flex; flex-wrap: wrap; gap: 30px;">
    <div style="flex: 1; min-width: 250px;">
      <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Ingredients</h2>
      <ul style="list-style-type: none; padding-left: 0;">
        ${ingredients.map(ing => `<li style="margin-bottom: 8px; padding-left: 20px; position: relative;"><span style="position: absolute; left: 0;">•</span> ${ing}</li>`).join('')}
      </ul>
    </div>
    
    <div style="flex: 1; min-width: 250px;">
      <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Instructions</h2>
      <ol style="padding-left: 20px;">
        ${instructions.map((inst, index) => `<li style="margin-bottom: 15px; padding-left: 5px;">${inst}</li>`).join('')}
      </ol>
    </div>
  </div>
</div>`;
}

function generateModernTemplate(title, description, prepTime, cookTime, servings, ingredients, instructions) {
    return `<!-- Modern Recipe Template -->
<div class="recipe-container" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 900px; margin: 0 auto; padding: 30px; background: #fff; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #e74c3c; font-size: 2.5rem; margin-bottom: 10px;">${title}</h1>
    <p style="color: #7f8c8d; font-size: 1.1rem; max-width: 600px; margin: 0 auto;">${description}</p>
  </div>
  
  <div style="background: #f8f9fa; border-radius: 10px; padding: 20px; margin-bottom: 30px;">
    <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 25px;">
      <div style="text-align: center; padding: 15px 25px; background: white; border-radius: 8px; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
        <div style="font-weight: bold; color: #e74c3c; font-size: 1.1rem;">PREP TIME</div>
        <div style="font-size: 1.3rem; font-weight: bold;">${prepTime} mins</div>
      </div>
      <div style="text-align: center; padding: 15px 25px; background: white; border-radius: 8px; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
        <div style="font-weight: bold; color: #e74c3c; font-size: 1.1rem;">COOK TIME</div>
        <div style="font-size: 1.3rem; font-weight: bold;">${cookTime} mins</div>
      </div>
      <div style="text-align: center; padding: 15px 25px; background: white; border-radius: 8px; box-shadow: 0 3px 10px rgba(0,0,0,0.05);">
        <div style="font-weight: bold; color: #e74c3c; font-size: 1.1rem;">SERVINGS</div>
        <div style="font-size: 1.3rem; font-weight: bold;">${servings}</div>
      </div>
    </div>
  </div>
  
  <div style="display: flex; flex-wrap: wrap; gap: 40px; margin-bottom: 30px;">
    <div style="flex: 1; min-width: 300px;">
      <div style="background: #3498db; color: white; padding: 12px 20px; border-radius: 8px 8px 0 0; font-weight: bold; font-size: 1.2rem;">
        <i class="fas fa-list"></i> Ingredients
      </div>
      <div style="border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px; padding: 20px;">
        <ul style="list-style-type: none; padding-left: 0;">
          ${ingredients.map(ing => `<li style="margin-bottom: 12px; padding: 10px; background: #f8f9fa; border-radius: 5px; display: flex; align-items: center;">
            <i class="fas fa-check-circle" style="color: #2ecc71; margin-right: 10px;"></i> ${ing}
          </li>`).join('')}
        </ul>
      </div>
    </div>
    
    <div style="flex: 1; min-width: 300px;">
      <div style="background: #2ecc71; color: white; padding: 12px 20px; border-radius: 8px 8px 0 0; font-weight: bold; font-size: 1.2rem;">
        <i class="fas fa-clipboard-list"></i> Instructions
      </div>
      <div style="border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px; padding: 20px;">
        <ol style="padding-left: 20px;">
          ${instructions.map((inst, index) => `<li style="margin-bottom: 20px; padding-left: 10px; position: relative;">
            <div style="position: absolute; left: -30px; top: 0; width: 24px; height: 24px; background: #2ecc71; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">${index + 1}</div>
            <div style="padding-top: 3px;">${inst}</div>
          </li>`).join('')}
        </ol>
      </div>
    </div>
  </div>
  
  <div style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 10px;">
    <p style="margin: 0; color: #7f8c8d;">Enjoy your delicious meal! Don't forget to share your results with us.</p>
  </div>
</div>`;
}

function copyCode() {
    const codeOutput = document.getElementById('code-output');
    const textArea = document.createElement('textarea');
    textArea.value = codeOutput.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // Show notification
    const notification = document.getElementById('notification');
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}