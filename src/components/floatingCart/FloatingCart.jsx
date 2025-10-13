import { ShoppingCart } from "lucide-react";
import { useCheckoutMutation, useGetCartQuery } from "../../stores/apiSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const CartList = ({ carts, setOpen }) => {
  const navigate = useNavigate();
  const cartItems = carts?.data.debug.processed_items;
  console.log("All cart items", carts?.data.debug.processed_items);
  const handlegotocheckout = () => {
    navigate("/checkout");
    setOpen(false);
  };

  return (
    <div className="absolute bottom-full mb-2 right-0 w-80 max-h-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Your Cart</h3>
        <p className="text-sm text-gray-600">
          {cartItems?.length || 0} item{cartItems?.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-4">
          {cartItems?.map((cart, index) => (
            <li
              key={`${cart.product_id}-${cart.variant_id}-${index}`}
              className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                {/* Product Image Placeholder */}
                <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-gray-500">Img</span>
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {cart.product_name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      Qty: {cart.quantity}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs font-semibold text-gray-800">
                      {cart.price}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer with Totals */}
      {cartItems?.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Subtotal:</span>
              <span className="font-semibold text-gray-800">
                {carts?.data.subtotal}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Delivery Fee:</span>
              <span className="font-semibold text-gray-800">
                {carts?.data.delivery_fee}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-300">
              <span className="text-base font-bold text-gray-800">Total:</span>
              <span className="text-base font-bold text-gray-800">
                {carts?.data.total}
              </span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handlegotocheckout}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

const FloatingCart = () => {
  const { data: carts, isLoading, isError,refetch:refetchCart } = useGetCartQuery();
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState();

  useEffect(() => {
    if (carts) {
      setCart(carts);
    }
  }, [carts]);
  useEffect(()=>{
    refetchCart();
  },[carts])

  console.log("All cart data", cart);


  const handleToggle = () => {
    setOpen(!open);
    console.log("cart clicked");
  };

  const cartItemsCount = cart?.data.debug.cart_items_count || 0;

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <div className="relative">
        {/* Cart Dropdown - positioned above the button */}
        {open && <CartList carts={cart} setOpen={setOpen} />}

        {/* Cart Button */}
        <button
          className="relative bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-xl"
          onClick={handleToggle}
          aria-label={`Shopping cart with ${cartItemsCount} items`}
        >
          <ShoppingCart size={24} />

          {/* Cart Badge */}
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold border-2 border-white">
              {cartItemsCount}
            </span>
          )}
        </button>
      </div>

      {/* Overlay to close cart when clicking outside */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default FloatingCart;
