"use client";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUtensils, FaShoppingCart, FaDrumstickBite, FaCarrot, FaConciergeBell, FaGlassCheers, FaGift, FaTruck } from "react-icons/fa";
import Link from "next/link";
import './menuselection.css';

const MealSelectionPage = () => {

    const entrees = [
        { name: "Hot Ones Blazing Bourbon Chicken", image: " https://olo-images-live.imgix.net/50/503be498564c415eb59e4e37120117b0.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=91acd3adc699123bb269b094fb843769" },
        { name: "The Original Orange Chicken", image: " https://olo-images-live.imgix.net/78/783b6c093c4c44428516139005a621f1.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=e8191ba402e81280158b4793829b83e0" },
        { name: "Black Pepper Sirloin Steak", image: " https://olo-images-live.imgix.net/fd/fd7ab3840a8f476db096435bfef01322.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=db6bb16a3f93d09d28b09f7e3df02679" },
        { name: "Honey Walnut Shrimp", image: " https://olo-images-live.imgix.net/e0/e065708712fb4fa2b43d3b6a34e7993d.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=a195a7d0bfcdab2002821f262b3fb624" },
        { name: "Grilled Teriyaki Chicken", image: "https://olo-images-live.imgix.net/fc/fc752b893d2e4c669ff8bf62db2c3f92.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=28a9b1c35bfd1818bbf28b2370af3f59" },
        { name: "Kung Pao Chicken", image: "https://olo-images-live.imgix.net/c6/c6bab5caab634b19ae91642a63fcec4e.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=023e0344c42bb51a61efa94b20b74d45" },
        { name: "Honey Sesame Chicken Breast", image: "https://olo-images-live.imgix.net/c2/c23ffd19030e4ac69087df2184fbd23b.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=7e4ca8a9338dae1e52174487f3abb181" },
        { name: "Mushroom Chicken", image: " https://olo-images-live.imgix.net/23/23bb4f38e2b541709bc50ac2c3eb3652.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=0fa142e417bfef7acf816051229363e8" },
        { name: "SweetFire Chicken Breast", image: "https://olo-images-live.imgix.net/0b/0b0ea08793c24116a44894d0f28a30a6.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=be101e1b67cff8266946721f95e1920f" },
        { name: "String Bean Chicken Breast", image: "https://olo-images-live.imgix.net/74/7451e5b6d3c14b6582c2cca8e01c1f71.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=7adf55b5ffba687a6e92f635682432c2" },
        { name: "Broccoli Beef", image: "https://olo-images-live.imgix.net/9f/9f78f560d6b84292834b292e7f860aa3.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=ada605f1c6124bf38a69997f880b1548" },
    ];

    const sides = [
        { name: "White Steamed Rice", image: "https://olo-images-live.imgix.net/1e/1eecd6a480134a45b88198ec2a57a83e.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=05d420b31613cf44fd57d09c352ad2e6", sizeType: "side" },
        { name: "Fried Rice", image: "https://olo-images-live.imgix.net/ff/ff1cd394782b46298ddfc8086896444b.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=f4bd9545f88c7cd671ec849d0c75a4ed", sizeType: "side" },
        { name: "Chow Mein", image: "https://olo-images-live.imgix.net/77/77c49b6405af4f0cac296293e1d559ea.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=05ee72f3039f6e56d181aeb441f848ff", sizeType: "side" },
        { name: "Super Greens", image: "https://olo-images-live.imgix.net/4f/4f61599dba714395b526fad311f09ecf.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=929eccce4846f47c41170e7aefed0382", sizeType: "side" }
    ];

    const appetizers = [
        { name: "Chicken Egg Roll", image: "https://olo-images-live.imgix.net/52/524bbb9023e2409b8d3fceae944a808f.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=4f4cc30df356786bbe3968181f8c5160", sizeType: "app" },
        { name: "Apple Pie Roll", image: "https://olo-images-live.imgix.net/ab/ab4e688dea2b4b56b79fa2ff42a31f24.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=4b9d93576ba69591523a4c60034d54d3" },
        { name: "Veggie Spring Roll", image: "https://olo-images-live.imgix.net/18/183834b8a35a4737a73a28421f68b4f0.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=0d4be7c417ec1998251da41d5bfe13fb", sizeType: "app" },
        { name: "Cream Cheese Rangoon", image: "https://olo-images-live.imgix.net/fe/fef7db209d7d41e6ae065af16afa1577.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=f14d518edf4e7ee0fd22b4d3cddc59b8", sizeType: "app" }
    ];

    const drinks = [
        { name: "Dr Pepper", image: "https://olo-images-live.imgix.net/30/30391bd46a144cedb219c0471be498fe.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=e821e1c6b612c6a431714fef0d0bb172" },
        { name: "Sweet Tea", image: "https://olo-images-live.imgix.net/5f/5f490aede80f4d1a99ae402bf4b76c33.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=0ae5ed7d2c52bedfbe887592b09ebc9c" },
        { name: "Diet Pepsi", image: "https://olo-images-live.imgix.net/07/07eec18462d34cd28a20e764a7c9a3f5.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=4dabda64016c0558aa782d5ffacef48a" },
        { name: "Pepsi", image: "https://olo-images-live.imgix.net/2a/2a10ad1b282741839242b728d48fae1c.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=94a12b75b2e805caa712a84259aab899" },
        { name: "Mountain Dew", image: "https://olo-images-live.imgix.net/08/08fa5bd920b24cef821b992c39dc66d6.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=5fee84f8d0a73a623d4b1540f715dc44" },
        { name: "Lipton Brisk Raspberry Iced Tea", image: " https://olo-images-live.imgix.net/9f/9f95a6ded6ee426d99ce700b48f2bc14.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=dc4ec80e3034a7bd132dc2990149603a" },
        { name: "Sierra Mist", image: "https://olo-images-live.imgix.net/e5/e5aa259f1e0a41fc8fbbec970b523190.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=5a937bd6dbe226fbda87b3489827ec16" },
        { name: "Tropicana Lemonade", image: "https://olo-images-live.imgix.net/25/25422dfbe7b340f8884288c075692b2f.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=9cbb80d268521946e202b5a34dd791f9" },
        { name: "Aquafina", image: "https://olo-images-live.imgix.net/02/02c37c0783f44e95bb99e3df9d8a33dc.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=b45bf71487256a41c2b36b012a33cd4a", sizeType: "mediumOnly" },
        { name: "Gatorade Lemon Lime", image: "https://olo-images-live.imgix.net/57/5717db5694df4f66801ae23057a4f238.png?auto=format%2Ccompress&q=60&cs=tinysrgb&w=810&h=540&fit=crop&fm=png32&s=1596b46ff8a0c14560eb8b52345b58b6", sizeType: "mediumOnly" }
    ];

    const deals = [
        { name: "50 percent off", image: "/images/50per.jpg", sizeType: "special" }
    ];

    const catering = [
        { name: "Party Size Side", image: "/images/party_size_side.jpg", sizeType: "special" },
        { name: "12-16 Person Party Bundle", image: "/images/12_16_person_party_bundle.jpg", sizeType: "special" },
        { name: "18-22 Person Party Bundle", image: "/images/12_16_person_party_bundle.jpg", sizeType: "special" },
        { name: "26-30 Person Party Bundle", image: "/images/12_16_person_party_bundle.jpg", sizeType: "special" }
    ];

    const [cart, setCart] = useState([]);
    const [selectedSize, setSelectedSize] = useState({});

    useEffect(() => {
        const savedCart = JSON.parse(sessionStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const handleSizeChange = (mealName, size, isSide) => {
        if (isSide) {
            //meidium and large only
            setSelectedSize(prevSize => ({ ...prevSize, [mealName]: size }));
        } else {
            //all sizes (regular)
            setSelectedSize(prevSize => ({ ...prevSize, [mealName]: size }));
        }
    };

    const handleAddToCart = (mealName, items) => {

        const item = items.find((item) => item.name === mealName);
        const defaultSize = item?.sizeType === "special" ? null : item?.sizeType === "mediumOnly"
            ? "Medium"
            : item?.sizeType === "side"
                ? "Medium"
                : "Small"; //for regular items the default is small


        const size = selectedSize[mealName] || defaultSize;
        const existingItem = cart.find(item => item.name === mealName && item.size === size);

        let updatedCart;
        if (existingItem) {
            //if item already exists in the cart, increase the quantity
            updatedCart = cart.map(item =>
                item.name === mealName && item.size === size
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            //else just add new item
            updatedCart = [...cart, { name: mealName, size: size, quantity: 1 }];
        }

        //update cart and save to sessionStorage
        setCart(updatedCart);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const setMealType = (mealType) => {
        // Store the selected meal type in localStorage
        localStorage.setItem('selectedMeal', mealType);
    };

    const renderItems = (items) => (
        items.map((item, index) => (
            <div key={index} className="col-4 col-md-3 col-lg-2 mb-3">
                <div className="card">
                    <img
                        src={item.image}
                        className="card-img-top img-fluid"
                        alt={item.name}
                        style={{ objectFit: 'cover', maxHeight: '200px' }}
                    />
                    <div className="card-body text-center">
                        <p className="card-text">{item.name}</p>

                        {item.sizeType !== "special" && (
                            <select
                                className="form-select mb-2"
                                onChange={(e) => handleSizeChange(item.name, e.target.value)}
                            >
                                {item.sizeType === "mediumOnly" ? (

                                    <option value="Medium">Medium</option>
                                ) : item.sizeType === "side" ? (

                                    <>
                                        <option value="Medium">Medium</option>
                                        <option value="Large">Large</option>
                                    </>
                                )
                                    : item.sizeType === "app" ? (
                                        <>
                                            <option value="Small">Small</option>
                                            <option value="Large">Large</option>
                                        </>
                                    ) : (
                                        <>
                                            <option value="Small">Small</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Large">Large</option>
                                        </>
                                    )}
                            </select>
                        )}

                        <button
                            className="btn btn-danger"
                            onClick={() => handleAddToCart(item.name, items)}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        ))
    );



    const handleScrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar" style={{ height: '100vh', fontSize: '1.5rem' }}>
                    <div className="position-fixed">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" onClick={() => handleScrollToSection('meals')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaUtensils className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Meals</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => handleScrollToSection('A La Carte')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaDrumstickBite className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>A La Carte</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => handleScrollToSection('sides')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaCarrot className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Sides</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => handleScrollToSection('appetizers')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaConciergeBell className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Appetizers</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => handleScrollToSection('drinks')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaGlassCheers className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Drinks</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => handleScrollToSection('deals')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaGift className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Deals</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={() => handleScrollToSection('catering')} style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaTruck className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Catering</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link href="/customer/kiosk/cart">
                                    <span style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                        <FaShoppingCart className="me-2" style={{ fontSize: '2rem', color: 'red' }} />
                                        <span style={{ color: 'red' }}>View Cart {cart.length > 0 && `(${cart.length})`}</span>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main className="col-md-10 ms-sm-auto col-lg-10 px-md-4">
                    <div className="py-3" id="meals">
                        <h2>Meals</h2>
                        <h3>Choose Your Meal</h3>
                        <div className="row mb-4">
                            <div className="col-4">
                                <Link href="meal">
                                    <button className="btn btn-outline-dark  w-100" style={{ height: '100px', borderRadius: '5px' }}
                                        onClick={() => setMealType('Bowl')}
                                    >
                                        Bowl
                                    </button>
                                </Link>
                            </div>
                            <div className="col-4">
                                <Link href="meal">
                                    <button className="btn btn-outline-dark  w-100" style={{ height: '100px', borderRadius: '5px' }}
                                        onClick={() => setMealType('Plate')}
                                    >
                                        Plate
                                    </button>
                                </Link>
                            </div>
                            <div className="col-4">
                                <Link href="meal">
                                    <button className="btn btn-outline-dark  w-100" style={{ height: '100px', borderRadius: '5px' }}
                                        onClick={() => setMealType('Bigger Plate')}
                                    >
                                        Bigger Plate
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="py-3" id="A La Carte">
                        <h2>A La Carte</h2>
                        <div className="row">
                            {renderItems(entrees)}
                        </div>
                    </div>
                    <div className="py-3" id="sides">
                        <h2>Sides</h2>
                        <div className="row">
                            {renderItems(sides, "side")} {/*Send true that this is a side so it only shows med and large */}
                        </div>
                    </div>
                    <div className="py-3" id="appetizers">
                        <h2>Appetizers</h2>
                        <div className="row">
                            {renderItems(appetizers, "side")} {/*Send true that this is an app so it only shows small and large */}
                        </div>
                    </div>
                    <div className="py-3" id="drinks">
                        <h2>Drinks</h2>
                        <div className="row">
                            {renderItems(drinks)}
                        </div>
                    </div>
                    <div className="py-3" id="deals">
                        <h2>Deals</h2>
                        <div className="row">
                            {renderItems(deals)}
                        </div>
                    </div>
                    <div className="py-3" id="catering">
                        <h2>Catering</h2>
                        <div className="row">
                            {renderItems(catering)}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MealSelectionPage;