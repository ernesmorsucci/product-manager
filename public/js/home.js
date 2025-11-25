const products = document.querySelectorAll('.product-card');

products.forEach(p => {
  const pId = p.querySelector('.product-id').textContent;
  p.addEventListener('click', () => {
    window.location.href = `/products/${pId}`;
  });
});