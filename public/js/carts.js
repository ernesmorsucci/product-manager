const carts = document.querySelectorAll('.cart-card');
const btnCrearCarrito = document.getElementById('btn-crear');
const deleteButtons = document.querySelectorAll('#btn-eliminar');

carts.forEach(c => {
  const cId = c.querySelector('.cart-id').textContent.slice(12);

  c.addEventListener('click', () => {
    window.location.href = `/carts/${cId}`;
  });
});

deleteButtons.forEach(btn => {
  const cId = btn.closest('.cart-card').querySelector('.cart-id').textContent.slice(12);
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    Swal.fire({
      title: '¿Estás seguro de eliminar este carrito?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try{
          const response = await fetch(`/api/carts/${cId}/delete`, {
            method: 'DELETE'
          });
          if(response.ok){
            console.log(`Carrito ${cId} eliminado`);
            window.location.reload();
          }
        } catch(error){
          console.log('Error al eliminar el carrito:', error);
        }
      }
    });
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

