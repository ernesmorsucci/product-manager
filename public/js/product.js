const form = document.getElementById('addToCart');
const pid = document.querySelector('.product-id').textContent;

form.addEventListener('submit', async(e) => {
  e.preventDefault();

  const cid = document.getElementById('cartId');
  const quantity = document.getElementById('quantity').value;

  console.log("PID obtenido desde la vista:", pid);

  const url = `/api/carts/${cid.value}/products/${pid}`;

  try{
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: quantity })
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      window.location.reload();
    } else {
      if (response.status === 400){
        cid.value = 'El producto ya está en el carrito!';
      } else{
        cid.value = 'Ingresa un ID de carrito válido!';
      }
    }
  } catch(error){
    console.log({ status: "error", message: error.message });
  }
});