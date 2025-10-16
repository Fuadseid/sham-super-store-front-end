import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  CreditCard,
  Truck,
  Check,
  Lock,
  Shield,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building,
  ChevronDown,
  ChevronUp,
  Upload,
  FileText,
  X,
  Globe,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import ReviewPopup from "../../components/reviewPopup/ReviewPopup";
import {
  useAddCustomerAddressMutation,
  useDeleteCustomerAddressMutation,
  useDeleteCustomerAddressbyIdMutation,
  useGetCustomerAddressesQuery,
  useGetCartQuery,
  useGetPublicMethodsQuery,
  useCreateCheckoutSessionMutation,
  useProcessCheckoutMutation,
} from "../../stores/apiSlice";
import { BsStripe } from "react-icons/bs";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dropAreaRef = useRef(null);

  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [showAllItems, setShowAllItems] = useState(false);
  const [isOrderSummaryExpanded, setIsOrderSummaryExpanded] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const { upload_url } = useSelector((state) => state.auth);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [paymentMethodsData, setPaymentMethodsData] = useState([]);
  const [showBillingDropdown, setShowBillingDropdown] = useState(false);
  const [showShippingDropdown, setShowShippingDropdown] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  // API mutations and queries
  const [createAddress, { isLoading: createAddressLoading }] =
    useAddCustomerAddressMutation();
  const [deleteAllAddresses, { isLoading: deleteAllAddressesLoading }] =
    useDeleteCustomerAddressMutation();
  const [deleteAddressById, { isLoading: deleteAddressByIdLoading }] =
    useDeleteCustomerAddressbyIdMutation();
  const { data: addressesData, refetch: refetchAddresses } =
    useGetCustomerAddressesQuery();
  const { data: paymentMethodsDatas } = useGetPublicMethodsQuery();
  const { data: carts, isLoading, isError } = useGetCartQuery();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();
  const [processCheckout] = useProcessCheckoutMutation();

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [billingDetails, setBillingDetails] = useState(null);
  const [shippingDetails, setShippingDetails] = useState(null);
  const [cartData, setCartData] = useState();
  const [errors, setErrors] = useState({});
  const [stripePaymentMethodId, setStripePaymentMethodId] = useState("");

  const [newAddress, setNewAddress] = useState({
    type: "billing",
    physical_address: "",
    city: "",
    country: "",
    created_at: new Date().toISOString().split("T")[0],
  });

  const [shippingToBilling, setShippingToBilling] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [notes, setNotes] = useState("");

  // Load addresses from API
  useEffect(() => {
    if (addressesData?.data) {
      setSavedAddresses(addressesData.data);

      // Auto-select first billing and shipping addresses if available
      const billingAddresses = addressesData.data.filter(
        (addr) => addr.type === "billing"
      );
      const shippingAddresses = addressesData.data.filter(
        (addr) => addr.type === "shipping"
      );

      if (billingAddresses.length > 0 && !billingDetails) {
        setBillingDetails(billingAddresses[0]);
      }
      if (shippingAddresses.length > 0 && !shippingDetails) {
        setShippingDetails(shippingAddresses[0]);
      }
    }
  }, [addressesData, billingDetails, shippingDetails]);

  useEffect(() => {
    if (paymentMethodsDatas?.data) {
      setPaymentMethodsData(paymentMethodsDatas.data);
      // Set default payment method to the first one
      if (paymentMethodsDatas.data.length > 0 && !paymentMethod) {
        setPaymentMethod(paymentMethodsDatas.data[0].id.toString());
      }
    }
  }, [paymentMethodsDatas, paymentMethod]);

  useEffect(() => {
    if (carts) {
      setCartData(carts);
    }
  }, [carts]);

  const cartItems = carts?.data?.debug?.processed_items || [];
  const items = cartItems;

  // Calculate total price function
  const getTotalPrice = () => {
    if (!cartItems || cartItems.length === 0) return 0;

    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = parseInt(item.quantity) || 0;
      return total + itemPrice * itemQuantity;
    }, 0);
  };

  const subtotal = getTotalPrice();
  const total = subtotal; // Delivery fee will be calculated by backend

  // Country options
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "South Korea",
    "Singapore",
    "United Arab Emirates",
    "Saudi Arabia",
    "India",
    "China",
    "Brazil",
    "Mexico",
    "Ethiopia",
  ];

  // Address type options
  const addressTypes = [
    { value: "billing", label: "Billing Address" },
    { value: "shipping", label: "Shipping Address" },
  ];

  // Filter addresses by type
  const billingAddresses = savedAddresses.filter(
    (addr) => addr.type === "billing"
  );
  const shippingAddresses = savedAddresses.filter(
    (addr) => addr.type === "shipping"
  );

  // Address management functions
  const handleSelectBillingAddress = (address) => {
    setBillingDetails(address);
    setShowBillingDropdown(false);
  };

  const handleSelectShippingAddress = (address) => {
    setShippingDetails(address);
    setShowShippingDropdown(false);
  };

  const handleNewAddressChange = (field, value) => {
    setNewAddress((prev) => ({ ...prev, [field]: value }));
  };

  // API call to save address
  const handleSaveAddress = async () => {
    if (
      !newAddress.physical_address ||
      !newAddress.city ||
      !newAddress.country ||
      !newAddress.type
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const response = await createAddress(newAddress).unwrap();

      if (response.success) {
        // Refetch addresses to get updated list
        await refetchAddresses();

        // Reset form
        setNewAddress({
          type: "billing",
          physical_address: "",
          city: "",
          country: "",
          created_at: new Date().toISOString().split("T")[0],
        });
        setShowAddressForm(false);
        setEditingAddress(null);

        alert("Address saved successfully!");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Error saving address. Please try again.");
    }
  };

  const handleEditAddress = (address) => {
    setNewAddress({ ...address });
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (addressId) => {
    if (savedAddresses.length <= 1) {
      alert("You must have at least one saved address");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this address?")) {
      return;
    }

    try {
      const response = await deleteAddressById(addressId).unwrap();

      if (response.success) {
        // Refetch addresses to get updated list
        await refetchAddresses();

        // If deleted address was selected in billing or shipping, switch to another address
        if (billingDetails?.id === addressId) {
          const newBillingAddress = billingAddresses.find(
            (addr) => addr.id !== addressId
          );
          setBillingDetails(newBillingAddress || null);
        }

        if (shippingDetails?.id === addressId) {
          const newShippingAddress = shippingAddresses.find(
            (addr) => addr.id !== addressId
          );
          setShippingDetails(newShippingAddress || null);
        }

        alert("Address deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Error deleting address. Please try again.");
    }
  };

  const handleDeleteAllAddresses = async () => {
    if (!window.confirm("Are you sure you want to delete all addresses?")) {
      return;
    }

    try {
      const response = await deleteAllAddresses().unwrap();

      if (response.success) {
        await refetchAddresses();
        setBillingDetails(null);
        setShippingDetails(null);
        alert("All addresses deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting all addresses:", error);
      alert("Error deleting addresses. Please try again.");
    }
  };

  const openAddAddressForm = () => {
    setNewAddress({
      type: "billing",
      physical_address: "",
      city: "",
      country: "",
      created_at: new Date().toISOString().split("T")[0],
    });
    setEditingAddress(null);
    setShowAddressForm(true);
  };

  // Updated file upload logic to match CreateUserPopup
  const handleDocumentUpload = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("dzchunkindex", 0);
      formData.append("dztotalchunkcount", 1);

      const response = await fetch(upload_url, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Document upload failed");
      }

      const data = await response.json();

      // Ensure we return just the filename, not the full URL
      // Based on your FileUploadController, it returns { url: filename }
      // So extract just the filename from the response
      const uploadedFilename = data.url || data.filename;

      // If it's a full URL, extract just the filename part
      if (uploadedFilename.includes("/")) {
        return uploadedFilename.split("/").pop();
      }

      return uploadedFilename;
    } catch (error) {
      console.error("Document upload error:", error);
      alert("Failed to upload document. Please try again.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Handle receipt file change with new upload logic
  // Replace the handleReceiptChange function
  const handleReceiptChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Please select a valid file type (JPG, PNG, PDF, DOC)");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }

      const uploadedReceiptUrl = await handleDocumentUpload(file);
      if (uploadedReceiptUrl) {
        // Store both the file object and the uploaded filename
        setReceiptFile({
          file: file,
          filename: uploadedReceiptUrl, // This is the filename returned from your upload endpoint
        });

        // Create preview for images
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => setReceiptPreview(e.target.result);
          reader.readAsDataURL(file);
        } else {
          setReceiptPreview(null);
        }

        alert("Receipt uploaded successfully!");
      }
    }
  };

  // File upload handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleReceiptChange({ target: { files } });
    }
  };

  const handleFileSelect = (e) => {
    handleReceiptChange(e);
  };

  const removeReceipt = () => {
    setReceiptFile(null);
    setReceiptPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!billingDetails) {
        newErrors.billing_address = "Please select a billing address";
      }

      if (!shippingToBilling && !shippingDetails) {
        newErrors.shipping_address = "Please select a shipping address";
      }
    }

    if (step === 2) {
      if (!paymentMethod) {
        newErrors.paymentMethod = "Please select a payment method";
      }

      const selectedPaymentMethod = paymentMethodsData.find(
        (pm) => pm.id.toString() === paymentMethod
      );
      if (selectedPaymentMethod?.payment_type === "bank" && !receiptFile) {
        newErrors.receipt = "Please upload your bank transfer receipt";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = async () => {
    if (activeStep === 1) {
      if (!validateStep(1)) {
        return;
      }
      setActiveStep(2);
    } else if (activeStep === 2) {
      if (!validateStep(2)) {
        return;
      }
      setActiveStep(3);
    }
  };

  const handlePreviousStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  // Convert file to base64 for API
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle Stripe Checkout
  const handleStripeCheckout = async (sessionId) => {
    try {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error("Stripe checkout error:", error);
        alert("Error redirecting to Stripe checkout. Please try again.");
      }
    } catch (error) {
      console.error("Stripe checkout error:", error);
      alert("Error processing Stripe payment. Please try again.");
    }
  };

  // Main checkout submission
  // Main checkout submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) {
      return;
    }

    setIsProcessing(true);

    try {
      const selectedPaymentMethod = paymentMethodsData.find(
        (pm) => pm.id.toString() === paymentMethod
      );

      if (!selectedPaymentMethod) {
        throw new Error("Invalid payment method selected");
      }

      const checkoutData = {
        payment_method_id: parseInt(paymentMethod),
        notes: notes || "",
      };

      // Add payment image filename for bank transfer (NOT base64)
      if (selectedPaymentMethod.payment_type === "bank" && receiptFile) {
        // Use the filename instead of base64
        checkoutData.payment_image = receiptFile.filename; // This should be just the filename string
      }

      // For Stripe payment method, use the checkout session endpoint
      if (selectedPaymentMethod.payment_type === "stripe") {
        const result = await createCheckoutSession(checkoutData).unwrap();

        if (result.success) {
          if (result.payment_type === "cash_on_delivery") {
            // Cash on delivery success
            setOrderNumber(result.order_id);
            setOrderComplete(true);
            setIsProcessing(false);

            setTimeout(() => {
              setShowReviewPopup(true);
            }, 2000);
          } else if (
            result.payment_type === "stripe_checkout" &&
            result.redirect_url
          ) {
            // Redirect to Stripe Checkout
            window.location.href = result.redirect_url;
          } else if (result.sessionId) {
            // Handle Stripe Checkout with session ID
            await handleStripeCheckout(result.sessionId);
          }
        } else {
          throw new Error(
            result.message || "Failed to create checkout session"
          );
        }
      } else {
        // For other payment methods (cash, bank), use process checkout
        const result = await processCheckout(checkoutData).unwrap();

        if (result.success) {
          setOrderNumber(result.order_id);
          setOrderComplete(true);
          setIsProcessing(false);

          setTimeout(() => {
            setShowReviewPopup(true);
          }, 2000);
        } else {
          throw new Error(result.message || "Failed to process checkout");
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        error.message ||
          "An error occurred while processing your order. Please try again."
      );
      setIsProcessing(false);
    }
  };

  const handleContinueShopping = () => {
    navigate("/shop");
  };

  const steps = [
    { number: 1, title: "Shipping", completed: activeStep > 1 },
    { number: 2, title: "Payment", completed: activeStep > 2 },
    { number: 3, title: "Review", completed: activeStep > 3 },
  ];

  const displayedItems = showAllItems ? items : items.slice(0, 5);
  const hasMoreItems = items.length > 5;

  if (items.length === 0 && !orderComplete) {
    return (
      <div className={`min-h-screen bg-gray-50 py-8 ${isRTL ? "rtl" : "ltr"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🛒</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Add some products to your cart before checkout.
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className={`min-h-screen bg-gray-50 py-8 ${isRTL ? "rtl" : "ltr"}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t("checkout.success.title") || "Order Successful!"}
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              {t("checkout.success.message") ||
                "Thank you for your purchase. Your order has been placed successfully."}
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 inline-block">
              <span className="text-gray-700 font-medium">
                {t("checkout.success.orderNumber") || "Order Number"}:{" "}
              </span>
              <strong className="text-blue-600 text-lg">{orderNumber}</strong>
            </div>
            <br />
            <button
              onClick={handleContinueShopping}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {t("checkout.success.continueShopping") || "Continue Shopping"}
            </button>
          </div>
        </div>

        {showReviewPopup && (
          <ReviewPopup
            isOpen={showReviewPopup}
            onClose={() => setShowReviewPopup(false)}
            orderNumber={orderNumber}
          />
        )}
      </div>
    );
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <>
            {/* Header with single Add Address button */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Address Information
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Manage your billing and shipping addresses
                  </p>
                </div>
                <div className="flex space-x-2">
                  {savedAddresses.length > 0 && (
                    <button
                      type="button"
                      onClick={handleDeleteAllAddresses}
                      disabled={deleteAllAddressesLoading}
                      className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete All</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={openAddAddressForm}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Address</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Billing Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Billing Information
                </h2>
              </div>

              {/* Billing Address Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Billing Address *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowBillingDropdown(!showBillingDropdown)}
                    className={`w-full flex items-center justify-between p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.billing_address
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-medium text-gray-900">
                        {billingDetails
                          ? `${billingDetails.physical_address}, ${billingDetails.city}`
                          : "Select billing address"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {billingDetails?.country}
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        showBillingDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showBillingDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {billingAddresses.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          No billing addresses saved. Click "Add New Address" to
                          create one.
                        </div>
                      ) : (
                        billingAddresses.map((address) => (
                          <div
                            key={address.id}
                            onClick={() => handleSelectBillingAddress(address)}
                            className={`p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                              billingDetails?.id === address.id
                                ? "bg-blue-50 border-blue-200"
                                : ""
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-gray-900">
                                    {address.physical_address}
                                  </span>
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                    Billing
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {address.city}, {address.country}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {address.phone}
                                </p>
                              </div>
                              <div className="flex space-x-1 ml-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditAddress(address);
                                  }}
                                  className="text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteAddress(address.id);
                                  }}
                                  className="text-gray-400 hover:text-red-600 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
                {errors.billing_address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.billing_address}
                  </p>
                )}
              </div>

              {/* Selected Billing Address Details */}
              {billingDetails && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Selected Billing Address:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">
                        Address:
                      </span>
                      <p className="text-gray-900">
                        {billingDetails.physical_address}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">City:</span>
                      <p className="text-gray-900">{billingDetails.city}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Country:
                      </span>
                      <p className="text-gray-900">{billingDetails.country}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-xl font-semibold text-gray-900">
                    Shipping Address
                  </h2>
                </div>
                <label className="flex items-center cursor-pointer">
                  <span className="mr-3 text-sm font-medium text-gray-700">
                    Same as billing
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={shippingToBilling}
                      onChange={(e) => setShippingToBilling(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-10 h-6 rounded-full transition-colors ${
                        shippingToBilling ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                        shippingToBilling ? "transform translate-x-4" : ""
                      }`}
                    ></div>
                  </div>
                </label>
              </div>

              {!shippingToBilling && (
                <>
                  {/* Shipping Address Dropdown */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Shipping Address *
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setShowShippingDropdown(!showShippingDropdown)
                        }
                        className={`w-full flex items-center justify-between p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.shipping_address
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <div className="text-left">
                          <div className="font-medium text-gray-900">
                            {shippingDetails
                              ? `${shippingDetails.physical_address}, ${shippingDetails.city}`
                              : "Select shipping address"}
                          </div>
                          <div className="text-sm text-gray-600">
                            {shippingDetails?.country}
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 transition-transform ${
                            showShippingDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {showShippingDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                          {shippingAddresses.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                              No shipping addresses saved. Click "Add New
                              Address" to create one.
                            </div>
                          ) : (
                            shippingAddresses.map((address) => (
                              <div
                                key={address.id}
                                onClick={() =>
                                  handleSelectShippingAddress(address)
                                }
                                className={`p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                                  shippingDetails?.id === address.id
                                    ? "bg-blue-50 border-blue-200"
                                    : ""
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium text-gray-900">
                                        {address.physical_address}
                                      </span>
                                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                        Shipping
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                      {address.city}, {address.country}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {address.phone}
                                    </p>
                                  </div>
                                  <div className="flex space-x-1 ml-2">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditAddress(address);
                                      }}
                                      className="text-gray-400 hover:text-blue-600 transition-colors"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteAddress(address.id);
                                      }}
                                      className="text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                    {errors.shipping_address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shipping_address}
                      </p>
                    )}
                  </div>

                  {/* Selected Shipping Address Details */}
                  {shippingDetails && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Selected Shipping Address:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">
                            Address:
                          </span>
                          <p className="text-gray-900">
                            {shippingDetails.physical_address}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            City:
                          </span>
                          <p className="text-gray-900">
                            {shippingDetails.city}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Country:
                          </span>
                          <p className="text-gray-900">
                            {shippingDetails.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Order Notes */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Order Notes
                </h2>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any special instructions or notes for your order..."
                  maxLength={500}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {notes.length}/500 characters
                </p>
              </div>
            </div>

            {/* Add/Edit Address Form Modal */}
            {showAddressForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {editingAddress ? "Edit Address" : "Add New Address"}
                      </h3>
                      <button
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddress(null);
                          setNewAddress({
                            type: "billing",
                            physical_address: "",
                            city: "",
                            country: "",
                            created_at: new Date().toISOString().split("T")[0],
                          });
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address Type *
                        </label>
                        <select
                          value={newAddress.type}
                          onChange={(e) =>
                            handleNewAddressChange("type", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                        >
                          <option value="">Select Address Type</option>
                          {addressTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Physical Address *
                        </label>
                        <input
                          type="text"
                          value={newAddress.physical_address}
                          onChange={(e) =>
                            handleNewAddressChange(
                              "physical_address",
                              e.target.value
                            )
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="123 Main Street"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={newAddress.city}
                          onChange={(e) =>
                            handleNewAddressChange("city", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="New York"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country *
                        </label>
                        <select
                          value={newAddress.country}
                          onChange={(e) =>
                            handleNewAddressChange("country", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-6">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddressForm(false);
                          setEditingAddress(null);
                          setNewAddress({
                            type: "billing",
                            physical_address: "",
                            city: "",
                            country: "",
                            created_at: new Date().toISOString().split("T")[0],
                          });
                        }}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveAddress}
                        disabled={createAddressLoading}
                        className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
                      >
                        {createAddressLoading
                          ? "Saving..."
                          : editingAddress
                          ? "Update Address"
                          : "Save Address"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        );

      case 2:
        return (
          <>
            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center mb-6">
                <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Method
                </h2>
              </div>
              <div className="space-y-4">
                {paymentMethodsData.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === method.id.toString()
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id.toString()}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex items-center mx-4">
                      {method.payment_type === "stripe" && (
                        <BsStripe className="w-5 h-5 text-gray-600 mr-2" />
                      )}
                      {method.payment_type === "cash" && (
                        <CreditCard className="w-5 h-5 text-gray-600 mr-2" />
                      )}
                      {method.payment_type === "bank" && (
                        <Building className="w-5 h-5 text-gray-600 mr-2" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {method.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {method.description}
                      </div>
                    </div>
                  </label>
                ))}
                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.paymentMethod}
                  </p>
                )}
              </div>
            </div>

            {/* Receipt Upload for Bank Transfer */}
            {paymentMethod &&
              paymentMethodsData.find(
                (pm) => pm.id.toString() === paymentMethod
              )?.payment_type === "bank" && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center mb-6">
                    <Upload className="w-6 h-6 text-blue-600 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-900">
                      Upload Bank Transfer Receipt
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div
                      ref={dropAreaRef}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
                        isDragOver
                          ? "border-blue-500 bg-blue-50"
                          : receiptFile
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 bg-gray-50 hover:border-gray-400"
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {receiptFile ? (
                        <div className="space-y-4">
                          <div className="relative">
                            {receiptPreview ? (
                              <div className="mx-auto max-w-xs">
                                <img
                                  src={receiptPreview}
                                  alt="Receipt preview"
                                  className="w-full h-32 object-contain rounded-lg"
                                />
                              </div>
                            ) : (
                              <FileText className="w-16 h-16 text-green-500 mx-auto" />
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeReceipt();
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="space-y-2">
                            <p className="font-medium text-gray-900">
                              {receiptFile.filename}
                            </p>
                            <p className="text-sm text-gray-500">
                              {(receiptFile.file.size / 1024 / 1024).toFixed(2)}{" "}
                              MB
                            </p>
                            <p className="text-green-600 text-sm font-medium">
                              ✓ File uploaded successfully
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              fileInputRef.current?.click();
                            }}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Replace File
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload
                            className={`w-12 h-12 mx-auto mb-4 ${
                              isDragOver ? "text-blue-500" : "text-gray-400"
                            }`}
                          />
                          <div className="space-y-3">
                            <p className="text-lg font-medium text-gray-900">
                              {isDragOver
                                ? "Drop your file here"
                                : "Upload your bank transfer receipt"}
                            </p>
                            <p className="text-sm text-gray-500">
                              Drag and drop your file here, or click to browse
                            </p>
                            <div className="flex items-center justify-center space-x-4">
                              <label className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                {uploading ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Uploading...
                                  </>
                                ) : (
                                  <>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Browse Files
                                  </>
                                )}
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*,.pdf,.doc,.docx"
                                  onChange={handleFileSelect}
                                  className="hidden"
                                  disabled={uploading}
                                />
                              </label>
                            </div>
                            <p className="text-xs text-gray-500">
                              Supported formats: JPG, PNG, PDF, DOC (Max 10MB)
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    {errors.receipt && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.receipt}
                      </p>
                    )}
                  </div>
                </div>
              )}
          </>
        );

      case 3:
        const selectedPaymentMethod = paymentMethodsData.find(
          (pm) => pm.id.toString() === paymentMethod
        );

        return (
          <>
            {/* Order Review */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center mb-6">
                <Check className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Review Your Order
                </h2>
              </div>

              {/* Billing Information Review */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Billing Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    <strong>Address:</strong> {billingDetails?.physical_address}
                  </p>
                  <p className="text-gray-700">
                    <strong>City:</strong> {billingDetails?.city}
                  </p>
                  <p className="text-gray-700">
                    <strong>Country:</strong> {billingDetails?.country}
                  </p>
                </div>
              </div>

              {/* Shipping Information Review */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Shipping Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {shippingToBilling ? (
                    <>
                      <p className="text-gray-700 text-sm mb-2">
                        Same as billing address
                      </p>
                      <p className="text-gray-700">
                        <strong>Address:</strong>{" "}
                        {billingDetails?.physical_address},{" "}
                        {billingDetails?.city}, {billingDetails?.country}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-700">
                        <strong>Address:</strong>{" "}
                        {shippingDetails?.physical_address}
                      </p>
                      <p className="text-gray-700">
                        <strong>City:</strong> {shippingDetails?.city}
                      </p>
                      <p className="text-gray-700">
                        <strong>Country:</strong> {shippingDetails?.country}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Payment Method Review */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Payment Method
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{selectedPaymentMethod?.name}</p>
                  // In the review section (step 3)
                  {selectedPaymentMethod?.payment_type === "bank" &&
                    receiptFile && (
                      <p className="text-green-600 text-sm mt-2">
                        ✓ Receipt uploaded: {receiptFile.filename}
                      </p>
                    )}
                  {selectedPaymentMethod?.payment_type === "cash" && (
                    <p className="text-blue-600 text-sm mt-2">
                      Payment will be collected on delivery
                    </p>
                  )}
                </div>
              </div>

              {/* Order Notes Review */}
              {notes && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Order Notes
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{notes}</p>
                  </div>
                </div>
              )}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 py-8 ${isRTL ? "rtl" : "ltr"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("checkout.title") || "Checkout"}
          </h1>
          <p className="text-gray-600">Complete your purchase securely</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex flex-col items-center ${
                    isRTL ? "ml-8" : "mr-8"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold ${
                      step.completed || activeStep === step.number
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 text-gray-500"
                    }`}
                  >
                    {step.completed ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span
                    className={`text-sm mt-2 ${
                      step.completed || activeStep === step.number
                        ? "text-blue-600 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 ${
                      step.completed ? "bg-blue-600" : "bg-gray-300"
                    } ${isRTL ? "mr-8" : "ml-8"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  disabled={activeStep === 1}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Previous
                </button>

                {activeStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isProcessing || uploading}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {isProcessing ? "Placing Order..." : "Place Order"}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div
              className={`bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 ${
                isOrderSummaryExpanded ? "max-h-[800px]" : "max-h-[600px]"
              }`}
            >
              <div className="p-6">
                {/* Header with toggle */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {t("checkout.order.title") || "Order Summary"}
                  </h2>
                  <button
                    onClick={() =>
                      setIsOrderSummaryExpanded(!isOrderSummaryExpanded)
                    }
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {isOrderSummaryExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Scrollable Order Items */}
                <div className="mb-6">
                  <div
                    className={`space-y-4 overflow-y-auto ${
                      isOrderSummaryExpanded ? "max-h-96" : "max-h-64"
                    } scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100`}
                  >
                    {displayedItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 pr-2"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <img
                            src={item.image || "/api/placeholder/64/64"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-semibold text-gray-900 flex-shrink-0">
                          $
                          {(
                            (parseFloat(item.price) || 0) *
                            (parseInt(item.quantity) || 0)
                          ).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Show More/Less Button */}
                  {hasMoreItems && (
                    <div className="pt-4 border-t border-gray-200 mt-4">
                      <button
                        onClick={() => setShowAllItems(!showAllItems)}
                        className="w-full text-center text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center space-x-2 transition-colors"
                      >
                        <span>
                          {showAllItems
                            ? "Show Less"
                            : `Show ${items.length - 5} More Items`}
                        </span>
                        {showAllItems ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Order Totals */}
                <div className="space-y-3 border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      {t("checkout.order.subtotal") || "Subtotal"}
                    </span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-3">
                    <span>{t("checkout.order.total") || "Total"}</span>
                    <span className="text-blue-600">${total.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    * Delivery fee will be calculated and added by the system
                  </p>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-6">
                  <Lock className="w-4 h-4" />
                  <span>Secure checkout</span>
                  <Shield className="w-4 h-4" />
                </div>

                {/* Privacy Notice */}
                <div className="text-xs text-gray-500 mb-6">
                  <p>
                    {t("checkout.order.privacyPolicy") ||
                      "Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our"}{" "}
                    <a
                      href="/privacy-policy"
                      className="text-blue-600 hover:underline"
                    >
                      {t("checkout.order.privacyPolicyLink") ||
                        "privacy policy"}
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Place Order Button - Only show on review step */}
              {activeStep === 3 && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isProcessing || uploading}
                    className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {t("checkout.order.processing") ||
                          "Processing Order..."}
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        {t("checkout.order.placeOrder") || "Place Order"}
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
