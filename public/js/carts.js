const carts = document.querySelectorAll('.cart-card');
const btnCrearCarrito = document.getElementById('btn-crear');

carts.forEach(c => {
  const cId = c.querySelector('.cart-id').textContent.slice(12);

  c.addEventListener('click', () => {
    window.location.href = `/carts/${cId}`;
  });
});

btnCrearCarrito.addEventListener('click', async() => {
  try{
    const response = await fetch('/api/carts', {
      method: 'POST'
    });
    if(response.ok){
      const data = await response.json();
      const newCartId = data.payload._id;
      console.log(`Carrito ${newCartId} creado`);
      window.location.reload();
    }
  } catch(error){
    console.log('Error al crear el carrito:', error);
  }
});