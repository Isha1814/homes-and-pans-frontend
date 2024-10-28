document.addEventListener('DOMContentLoaded', function() {
    updateTotals();
    
    // Quantity change
    document.querySelectorAll('.cart-quantity').forEach(input => {
        input.addEventListener('change', updateTotals);
    });

    // Remove item
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            row.remove();
            updateTotals();  // Recalculate totals after removing item
        });
    });

    // Update totals
    function updateTotals() {
        let subtotal = 0;
        
        // Iterate over each row in the cart table
        document.querySelectorAll('.cart-table tbody tr').forEach(row => {
            const priceText = row.querySelector('.product-price').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.-]+/g,""));
            const quantity = parseInt(row.querySelector('.cart-quantity').value);
            const totalPrice = price * quantity;

            // Update the total for the current row
            row.querySelector('.product-total').textContent = `Rs. ${totalPrice.toFixed(2)}`;
            
            // Add to subtotal
            subtotal += totalPrice;
        });

        // Update subtotal in the order summary
        document.querySelector('.cart-subtotal').textContent = `Rs. ${subtotal.toFixed(2)}`;

        // Calculate the delivery charges and final total
        const deliveryCharges = parseFloat(document.querySelector('.cart-delivery').textContent.replace(/[^0-9.-]+/g, "")) || 0;
        const discount = parseFloat(document.querySelector('.cart-discount').textContent.replace(/[^0-9.-]+/g, "")) || 0;
        const total = subtotal + deliveryCharges - discount;

        // Update total price in the order summary
        document.querySelector('.cart-total-price').textContent = `Rs. ${total.toFixed(2)}`;
    }

    // Apply coupon
    document.querySelector('.apply-coupon-btn').addEventListener('click', function() {
        const couponCode = document.querySelector('.coupon-input input').value;

        if (couponCode === 'DISCOUNT10') {
            // Apply a 10% discount
            let subtotal = parseFloat(document.querySelector('.cart-subtotal').textContent.replace(/[^0-9.-]+/g, ""));
            let discount = subtotal * 0.10; // 10% discount
            document.querySelector('.cart-discount').textContent = `Rs. ${discount.toFixed(2)}`;

            // Recalculate total after applying discount
            updateTotals();
        } else {
            alert('Invalid coupon code');
        }
    });

    // Update totals initially
    updateTotals();
});
