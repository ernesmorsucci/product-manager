const productCards = document.querySelectorAll('.product-item');
const cId = document.querySelector('#cart-id').textContent.slice(8);
const btnVaciar = document.querySelector('#btn-vaciar');
console.log(btnVaciar)
console.log(productCards)
productCards.forEach(card => {
  const pId = card.querySelector('#product-id').textContent;
  const btnEliminar = card.querySelector('#btn-eliminar');
  console.log(pId)
  console.log(btnEliminar)

  btnEliminar.addEventListener('click', async() => {
    try{
      const response = await fetch(`/api/carts/${cId}/products/${pId}`, {
        method: 'DELETE'
      });
      if(response.ok){
        console.log(`Producto ${pId} eliminado del carrito ${cId}`);
        window.location.reload();
      } else{
        console.log('Error al eliminar el producto del carrito');
      }
    } catch(error){
      console.log('Error al eliminar el producto del carrito:', error);
    }
  });
});

btnVaciar.addEventListener('click', async() => {
  try{
    const response = await fetch(`/api/carts/${cId}/products`, {
      method: 'DELETE'
    });
    if(response.ok){
      console.log(`Carrito ${cId} vaciado`);
      window.location.reload();
    } else{
      console.log('Error al vaciar el carrito');
    }
  } catch(error){
    console.log('Error al vaciar el carrito:', error);
  }
});