const addListButton = document.getElementById('addList');
const listsContainer = document.getElementById('lists');

addListButton.addEventListener('click', createList);

function createList() {
  const listElement = document.createElement('div');
  listElement.classList.add('list');

  const listTitle = prompt('Enter list title:');
  if (listTitle === null || listTitle.trim() === '') {
    return;
  }

  const listHeader = document.createElement('h2');
  listHeader.textContent = listTitle;
  listElement.appendChild(listHeader);

  const addCardButton = document.createElement('button');
  addCardButton.textContent = 'Add Card';
  addCardButton.addEventListener('click', () => createCard(listElement));
  listElement.appendChild(addCardButton);

  listsContainer.appendChild(listElement);
}

function createCard(listElement) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');

  const cardTitle = prompt('Enter card title:');
  if (cardTitle === null || cardTitle.trim() === '') {
    return;
  }

  const cardHeader = document.createElement('h3');
  cardHeader.textContent = cardTitle;
  cardElement.appendChild(cardHeader);

  const dueDate = prompt('Enter due date:');
  if (dueDate !== null && dueDate.trim() !== '') {
    const dueDateElement = document.createElement('p');
    dueDateElement.classList.add('due-date');
    dueDateElement.textContent = `Due Date: ${dueDate}`;
    cardElement.appendChild(dueDateElement);
  }

  const checklist = prompt('Enter checklist items (comma-separated):');
  if (checklist !== null && checklist.trim() !== '') {
    const checklistItems = checklist.split(',');
    const checklistElement = document.createElement('ul');
    checklistElement.classList.add('checklist');
    checklistItems.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = item.trim();
      checklistElement.appendChild(listItem);
    });
    cardElement.appendChild(checklistElement);
  }

  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete Card';
  deleteButton.addEventListener('click', () => deleteCard(cardElement));
  cardElement.appendChild(deleteButton);

  listElement.appendChild(cardElement);

  
  const completedButton = document.createElement('button');
  completedButton.textContent = 'Mark Completed';
  completedButton.addEventListener('click', () => markCompleted(cardElement));
  cardElement.appendChild(completedButton);

  listElement.appendChild(cardElement);


  const labels = prompt('Enter labels (comma-separated):');
  if (labels !== null && labels.trim() !== '') {
    const labelItems = labels.split(',');
    labelItems.forEach(item => {
      const labelElement = document.createElement('span');
      labelElement.classList.add('label');
      labelElement.textContent = item.trim();
      cardElement.appendChild(labelElement);
    });
  }

  listElement.appendChild(cardElement);
}
function deleteCard(cardElement) {
  if (confirm('Are you sure you want to delete this card?')) {
    cardElement.remove();
  }
}
function markCompleted(cardElement) {
  cardElement.classList.toggle('completed');
  const completedButton = cardElement.querySelector('button');
  
  if (cardElement.classList.contains('completed')) {
    completedButton.textContent = 'Undo Completed';
  } else {
    completedButton.textContent = 'Mark Completed';
  }
}
