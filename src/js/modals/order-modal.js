import axios from 'axios';

const close = document.querySelector('.order-modal-svg-close');
const modal = document.querySelector('.order-modal');
const form = document.querySelector('.order-form');

close.addEventListener('click', () => {
  modal.classList.add('hidden');
});

document.addEventListener('click', (e) => {
  if (e.target == modal) {
    modal.classList.add('hidden');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key == 'Escape') {
    modal.classList.add('hidden');
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { name, tel, comment } = e.target.elements;
  const formData = {
    name: name.value,
    tel: tel.value,
    comment: comment.value,
    modelId: '682f9bbf8acbdf505592ac36',
    color: '#1212ca',
  };

  form.reset();
});
