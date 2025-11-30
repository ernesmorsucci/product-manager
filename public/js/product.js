const form = document.getElementById('addToCart');
const pid = document.querySelector('.product-id').textContent;

form.addEventListener('submit', async(e) => {
  e.preventDefault();

  const cid = document.getElementById('cartId');
  const quantity = document.getElementById('quantity');

  console.log("PID obtenido desde la vista:", pid);

  const url = `/api/carts/${cid.value}/products/${pid}`;

  try{
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: quantity.value })
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      Swal.fire({
          icon: "success",
          text: "Producto agregado al carrito!",
          confirmButtonColor: '#2563eb'
        });
      cid.value = '';
      quantity.value = '';
    } else {
      if (response.status === 400){
        Swal.fire({
          icon: "error",
          text: "El producto ya está en el carrito!",
          confirmButtonColor: '#ef4444'
        });
      } else{
        cid.value = '';
        Swal.fire({
          icon: "error",
          text: "Ingresa un ID de carrito válido!",
          confirmButtonColor: '#ef4444'
        });
      }
    }
  } catch(error){
    console.log({ status: "error", message: error.message });
  }
});