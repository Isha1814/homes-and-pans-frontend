
let productsec=document.querySelector(".product");
function hideshow(){
    productsec.classList.toggle("hide");
}
  // Add to Cart Button Logic
  document.querySelector('.add-to-cart').addEventListener('click', function() {
    alert("Item added to your cart!");
  });
  
  // Buy Now Button Logic
  document.querySelector('.buy-now').addEventListener('click', function() {
    alert("Proceed to checkout!");
  });
     