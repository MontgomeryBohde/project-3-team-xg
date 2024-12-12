"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import CustomerHeader from '@/components/ui/customer/header/CustomerHeader';
import './cart.css'; // Add this CSS file for Trevor Mode styles

/**
 * Renders the CartPage component.
 * Overall manages the entire cart state, fetches product prices, calculates the subtotal, 
 * handles promo code application, updates item quantities, and also removes and clears  
 * Includes logic for handling logged-in users and guest users and the checkout from the cart at end.
 */
const CartPage = () => {
    const [cart, setCart] = useState(() => {
        const storedCart = sessionStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [isTrevorModeActive, setIsTrevorModeActive] = useState(false);
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [promoCode, setPromoCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [taxRate] = useState(0.08); 
    const [customerId, setCustomerId] = useState(null);
    const [guestName, setGuestName] = useState(null);
    const [orderId, setOrderId] = useState(null);

    // Load Trevor Mode state and cart on mount
    useEffect(() => {
        const trevorModeState = sessionStorage.getItem('trevorModeActive');
        if (trevorModeState === "true") {
            setIsTrevorModeActive(true);
            import ('./cart-trevor.css');
        }
    }, []);


    useEffect(() => {
        async function initializeCustomerId() {
            const loggedInCustomer = JSON.parse(localStorage.getItem('loggedInCustomer'));
            const loggedInCustomerName = localStorage.getItem('loggedInCustomerName');

            // Logged in customer
            if (loggedInCustomer && loggedInCustomer.id) {
                setCustomerId(loggedInCustomer.id);
            }
            // Guest
            else {
                // Set guest name from localStorage
                setGuestName(loggedInCustomerName);
                await fetchNextCustomerId();
              }
        }

        initializeCustomerId();
    }, []);
    /**
     * Fetches the next customer ID from the server.
     *
     * @async
     * @returns {Promise<void>}
     */
    const fetchNextCustomerId = async () => {
        try {
        const response = await fetch('/api/customers', {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            setCustomerId(data.next_id);
        } else {
            console.error('Failed to fetch next customer ID. Status:', response.status);
        }
        } catch (error) {
        console.error('Error fetching next customer ID:', error);
        }
    };
    useEffect(() => {
        if (guestName !== null) {
        console.log("Guest name: ", guestName);
        }
    }, [guestName]);


    const [currentTime, setCurrentTime] = useState('');
    useEffect(() => {
        const updateTime = () => {
          const now = new Date();
          const hours = now.getHours();
          const minutes = now.getMinutes();
          const ampm = hours >= 12 ? 'PM' : 'AM';
          const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;
          setCurrentTime(formattedTime);
        };
    }, []);

    //Catering prices (hardcoded)
    const specialDealPrices = {
        "Party Size Side": 16.00,
        "12-16 Person Party Bundle": 108.00,
        "18-22 Person Party Bundle": 154.00,
        "26-30 Person Party Bundle": 194.00
    };

   //50% off deal
   const isFiftyPercentOff = cart.some(item => item.name && item.name.toLowerCase().includes("50 percent off"));


    useEffect(() => {
        const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setCart(savedCart); // This will trigger a re-render after the cart is updated.
    }, []); // This only runs once when the component mounts.
    
      // This effect processes the cart items after the cart state has been updated.
    useEffect(() => {
        if (cart.length === 0) return; // Do nothing if the cart is empty.

            // Process the cart items and update their prices based on the existing price field.
        const foodNames = cart.map((item) => {
            if (item.mealItem) {
                // Use the price field directly from the mealItem object
                if (!item.price) {
                    item.price = item.mealItem.price || 0; // Default to 0 if price is undefined
                }

                // Return the mealItem name for further processing (if needed)
                return item.mealItem.name;
            }

            // For other types (non-mealCartItems), return the name (continue fetching prices as before)
            return item.name;
        }).flat(); // Flatten the array in case there are nested names (for entrees/sides)
        

        
    // Now, fetch prices for the non-mealCartItem items from the server
    /**
    * Fetches prices for non-meal items (a la carte, drinks, or appetizers) in the cart. This logic is handled seperately.
    * If there are non-meal items:
    *   - Sends a POST request to the '/api/getProducts?type=price' endpoint 
    *     with the list of non-meal item names in the request body.
    *   - Updates the `prices` state with the fetched price map.
    */
    const nonMealItems = cart.filter(item => !item.mealItem).map(item => item.name);
        if (nonMealItems.length > 0) {
        fetch('/api/getProducts?type=price', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ foodNames: nonMealItems }),
        })
        .then(response => response.json())
        .then(data => {
            const priceMap = data.reduce((acc, item) => {
                if (!acc[item.item_name]) {
                    acc[item.item_name] = {};  
                }
                acc[item.item_name][item.item_size] = parseFloat(item.price); 
                return acc;
            }, {});
        
            setPrices(priceMap);
            setLoading(false); 
        })
        

        .catch(error => {
            console.error('Error fetching prices:', error);
            setLoading(false); // Done loading even in case of error
        });
        } else {
        setLoading(false); // No need to fetch if no non-mealCartItems exist
        }
    }, [cart]); // This effect runs whenever the `cart` state changes.  

    /**
    * Calculates the subtotal of the items currently in the cart.
    * Iterates through each item in the cart and determines their price and sums them up.
    * Returns the calculated subtotal.
    */
    const calculateSubtotal = () => {
    return cart.reduce((total, item) => {
        let itemPrice;

      
        if (item.mealItem) {
            itemPrice = item.price || item.mealItem.price || 0; 
        } else {
            // For regular items, use the fetched prices or special deal prices
            itemPrice = prices[item.name]?.[item.size] || specialDealPrices[item.name] || 0;
        }

        return total + (itemPrice * item.quantity);
    }, 0);
};


    const subtotal = calculateSubtotal();

    /**
    * Applies the entered promo code to calculate the discount and checks if the entered code is the valid current promo code.
    * Updates the discount state with the calculated value.
    */
    const handleApplyPromoCode = () => {
        if (promoCode === "SAVE10") {
            setDiscount(subtotal * 0.1); 
        } else {
            alert("Invalid promo code");
            setDiscount(0);
        }
    };

    const automaticDiscount = isFiftyPercentOff ? subtotal * 0.5 : 0;

    //taxes and total calculation
    const tax = subtotal * taxRate;
    const total = subtotal - discount - automaticDiscount + tax;

   
    /**
     * Can update the quantity of an item in the cart.
    * Creates a new cart array that has the updated item.
    * Updates the `cart` state with the new cart array.
    * Updates the cart in sessionStorage.
    *
    * @param {number} index - The index num of the item in the cart.
    * @param {number} change - The amount to change the quantity by.
    */
    const updateQuantity = (index, change) => {
        const updatedCart = cart.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    quantity: Math.max(1, item.quantity + change), // ensure quantity is at least 1
                };
            }
            return item;
        });
        setCart(updatedCart);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    /**
    * Removes item from cart.
    * Creates a new cart array by filtering out  item at the specified index.
    * and updates the cart in sessionStorage with the new cart array.

    * @param {number} index - The index of the item to remove.
    */
    const removeItemFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index); // Remove item by index
        setCart(updatedCart);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    //clear cart button
    const handleClearCart = () => {
        setCart([]);
        sessionStorage.removeItem("cart");
    };

    // check out button
    const router = useRouter();
    /**
     * Handles the checkout process from cart. 
     * 
     * Prepares order data, then sends a POST request to create the order, 
     * then handles the response, updates customer data, and clears the cart.
     */
    const handleCheckout = async () => {
        const cashierId = 0; // kiosk order --> 0
        const paymentMethod = "Credit Card"; // TODO: replace later according to pop-up
        const orderTotal = total; // using the already calculated total

        const itemSizeIds = [];
        const mealItemIds = [];
        for(const item of cart)
        {
            for(let i = 0; i < item.quantity; i++)
            {
                let entreeIds = [];
                let sideId = null;

                // if mealItem
                if(item.mealItem)
                {
                    // process entrees
                    for(const entree of item.entrees)
                    {
                    try {
                            // Fetch the entree ID using the entree's name
                            const menuItemResponse = await fetch(`/api/getMenuItemId?name=${encodeURIComponent(entree)}`);
                            const menuItemData = await menuItemResponse.json();

                            entreeIds.push(menuItemData.id);
                        } catch (error) {
                            console.error("Error fetching entree ID:", error);
                        }
                    }
                    // get side ID
                    if (item.sides && item.sides.length > 0) {
                        const side = item.sides[0]; // Assuming first side is chosen
                        try {
                            // Fetch the side ID using the side's name
                            const menuItemResponse = await fetch(`/api/getMenuItemId?name=${encodeURIComponent(side)}`);
                            const menuItemData = await menuItemResponse.json();

                            if (menuItemData && menuItemData.id) {
                                sideId = menuItemData.id;
                            }
                        } catch (error) {
                            console.error("Error fetching side ID:", error);
                        }

                        // after pushing into db, add that order to mealItemIds array
                        try {
                            const mealItemResponse = await fetch('/api/meal_items', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    meal_type: item.mealItem,
                                    side_id: sideId,
                                    entree_ids: entreeIds,
                                    price: item.price,
                                }),
                            });
            
                            const mealItemData = await mealItemResponse.json();
            
                            if (mealItemData && mealItemData.id) {
                                mealItemIds.push(mealItemData.id);
                            } else {
                                console.error("Failed to add meal item to the database");
                            }
                        } catch (error) {
                            console.error("Error creating meal item:", error);
                        }
                    }
                }
                else {
                    try {
                        // fetch the menu item ID using the item name
                        const menuItemResponse = await fetch(`/api/getMenuItemId?name=${encodeURIComponent(item.name)}`);
                        const menuItemData = await menuItemResponse.json();
                
                        if (menuItemData && menuItemData.id) {
                            const menuItemId = menuItemData.id;
                
                            // fetch the item size ID using the menu item ID and size
                            const itemSizeResponse = await fetch(`/api/item_sizes?item_id=${menuItemId}&size=${encodeURIComponent(item.size)}`);
                            const itemSizeData = await itemSizeResponse.json();

                            for(const sizeItems of itemSizeData)
                            {
                                if(sizeItems.item_size == item.size)
                                {
                                    itemSizeIds.push(sizeItems.id);
                                    break;
                                }
                            }
                        }
                    } catch (error) {
                        console.error("Error fetching item size ID:", error);
                    }
                }
            }
        }
    
        // Prepare the data to send to the backend
        const requestBody = {
            itemSizeIds,
            mealItemIds,
            customerId,
            cashierId,
            paymentMethod,
            price: orderTotal,
        };

        console.log(requestBody);

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                // Save the orderId to localStorage
                localStorage.setItem('orderId', data.orderId);

                // Navigate to the confirmation page
                router.push('/customer/kiosk/confirmation');
            } else {
                alert(`Failed to create order: ${data.error}`);
            }
            setOrderId(response);
        } catch (error) {
            console.error("Error during checkout:", error);
            alert("An error occurred while processing your order. Please try again.");
        }

        // update customer db with data
        handleCustomerData();

        // clear cart
        handleClearCart();
    };
    
    // +10 this customer's points
    /**
     * Updates or creates the customer data based on the login status.
    * If the user is logged in:
    *   - It will update the customer data in the database.
    * If the user is a guest:
    *   - It will create a new customer record in the database.
    */
    const handleCustomerData = async () => {
        const loggedInCustomer = JSON.parse(localStorage.getItem('loggedInCustomer'));

        // Logged in customer
        if (loggedInCustomer && loggedInCustomer.id) {
            try {
                const response = await fetch('/api/customers', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ customer_id: loggedInCustomer.id }),
                });

                if (response.ok) {
                    const updatedCustomer = await response.json();
                    console.log('Customer updated successfully:', updatedCustomer);
                } else {
                    console.error('Failed to update customer. Status:', response.status);
                }
            } catch (error) {
                console.error('Error updating customer:', error);
            }
        }
        // Guest
        else {
            // put in a brand new customer into the db, firstname is guestName from localStorage, order id is stored in orderId
            try {
                const response = await fetch('/api/customers', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ firstName: guestName }),
                });
            
                const data = await response.json();
            
                if (response.ok) {
                  // Handle the successful creation of a guest customer
                  console.log('New Guest Customer Created:', data.customerId);
                  // Navigate or update state as needed
                } else {
                  alert(`Failed to create guest customer: ${data.error}`);
                }
              } catch (error) {
                console.error('Error creating guest customer:', error);
                alert('An error occurred while creating the guest customer.');
              }
        }
    }
    
    return (
        <div className={isTrevorModeActive ? "trevor-mode" : ""}>
            <CustomerHeader></CustomerHeader>
            <div className="container">
                <h1 className="text-center my-4">Your Cart</h1>

                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul className="list-group">
                        {cart.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                {/* Check if this is a mealCartItem or a regular item */}
                                {item.mealItem ? (
                                // This is a mealCartItem
                                <>
                                    <strong>{item.mealItem}</strong><br />
                                    <span>Entrees: {item.entrees.join(", ") || "N/A"}</span><br />
                                    <span>Sides: {item.sides.join(", ") || "N/A"}</span><br />
                                    <span>Quantity: {item.quantity}</span><br />
                                    {loading ? (
                                    <span>Price: Loading...</span>
                                    ) : (
                                    <span>Price: ${(item.price * item.quantity).toFixed(2)}</span>
                                    )}
                                </>
                                ) : (
                                // This is a regular item
                                <>
                                    <strong>{item.name}</strong><br />
                                    Quantity: {item.quantity}<br />
                                    {loading ? (
                                    <span>Price: Loading...</span>
                                    ) : (
                                    <span>Price: ${specialDealPrices[item.name]
                                        ? (specialDealPrices[item.name] * item.quantity).toFixed(2)
                                        : (Number(prices[item.name]?.[item.size] || 0) * item.quantity).toFixed(2)
                                    }</span>
                                    )}
                                    <br />
                                    <span>Size: {item.size || "N/A"}</span>
                                </>
                                )}
                            </div>

                            <div className="quantity-controls">
                                <button onClick={() => updateQuantity(index, 1)} className="btn btn-sm btn-outline-primary">+</button>
                                <button onClick={() => updateQuantity(index, -1)} className="btn btn-sm btn-outline-secondary">-</button>
                                <button onClick={() => removeItemFromCart(index)} className="btn btn-sm btn-danger ml-2">Remove</button>
                            </div>
                            </li>
                        ))}
                    </ul>

                )}

                <div className="summary mt-4">
                    <div className="d-flex justify-content-between">
                        <p>Subtotal:</p>
                        <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="mb-0">Promo Code:</p>
                        <input 
                            type="text" 
                            value={promoCode} 
                            onChange={(e) => setPromoCode(e.target.value)} 
                            placeholder="Enter code" 
                            className="promo-input"
                        />
                        <button onClick={handleApplyPromoCode} className="btn btn-secondary ml-2">Apply</button>
                    </div>
                    <div className="mt-3 d-flex justify-content-between">
                        <p>Discount:</p>
                        <p>-${discount.toFixed(2)}</p>
                    </div>
                    {isFiftyPercentOff && (
                        <div className="d-flex justify-content-between">
                            <p>Automatic 50% Off:</p>
                            <p>-${automaticDiscount.toFixed(2)}</p>
                        </div>
                    )}
                    <div className="d-flex justify-content-between">
                        <p>Tax:</p>
                        <p>${tax.toFixed(2)}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <h4>Total:</h4>
                        <h4>${total.toFixed(2)}</h4>
                    </div>
                </div>
                
                <div className="d-flex justify-content-between">
                    <Link href="/customer/kiosk/menu-selection" className="btn btn-primary m-3">Back to Menu</Link>
                    <button onClick={handleClearCart} className="btn btn-danger m-3">Clear Order</button>
                    <button onClick={handleCheckout} className="btn btn-success m-3">Check Out</button>
                </div>
            </div>
            
        </div>
    );
};

export default CartPage;
