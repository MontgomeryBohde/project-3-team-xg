import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUtensils, FaDrumstickBite, FaCarrot, FaConciergeBell, FaGlassCheers, FaGift, FaTruck } from "react-icons/fa";
import './mealselection.css';

const MealSelectionPage = () => {
    // Define items for each category
    const entrees = [
        { name: "Beyond The Original Orange Chicken", image: "https://via.placeholder.com/150" },
        { name: "Orange Chicken", image: "https://via.placeholder.com/150" },
        { name: "Black Pepper Sirloin Steak", image: "https://via.placeholder.com/150" },
        { name: "Honey Walnut Shrimp", image: "https://via.placeholder.com/150" },
        { name: "Grilled Terriyaki Chicken", image: "https://via.placeholder.com/150" },
        { name: "Kung Pao Chicken", image: "https://via.placeholder.com/150" },
        { name: "Honey Seasame Chicken Breast", image: "https://via.placeholder.com/150" },
        { name: "Beijing Beef", image: "https://via.placeholder.com/150" },
        { name: "Mushroom Chicken", image: "https://via.placeholder.com/150" },
        { name: "SweetFire Chicekn Breast", image: "https://via.placeholder.com/150" },
        { name: "String Bean Chicken Breast", image: "https://via.placeholder.com/150" },
        { name: "Broccoli Beef", image: "https://via.placeholder.com/150" },
        { name: "Black Pepper Chicken", image: "https://via.placeholder.com/150" },
        { name: "Super Greens", image: "https://via.placeholder.com/150" }
    ];

    const sides = [
        { name: "White Steamed Rice", image: "https://via.placeholder.com/150" },
        { name: "Fried Rice", image: "https://via.placeholder.com/150" },
        { name: "Chow Mein", image: "https://via.placeholder.com/150" },
        { name: "Super Greens", image: "https://via.placeholder.com/150" }
    ];

    const appetizers = [
        { name: "Bruschetta", image: "https://via.placeholder.com/150" },
        { name: "Stuffed Mushrooms", image: "https://via.placeholder.com/150" },
        { name: "Mozzarella Sticks", image: "https://via.placeholder.com/150" }
    ];

    const drinks = [
        { name: "Coke", image: "https://via.placeholder.com/150" },
        { name: "Lemonade", image: "https://via.placeholder.com/150" },
        { name: "Iced Tea", image: "https://via.placeholder.com/150" }
    ];

    const deals = [
        { name: "Buy One Get One Free", image: "https://via.placeholder.com/150" },
        { name: "20% Off", image: "https://via.placeholder.com/150" },
        { name: "Free Drink with Meal", image: "https://via.placeholder.com/150" }
    ];

    const catering = [
        { name: "Party Platter", image: "https://via.placeholder.com/150" },
        { name: "Catering Package A", image: "https://via.placeholder.com/150" },
        { name: "Buffet Setup", image: "https://via.placeholder.com/150" }
    ];

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav className="col-md-2 d-none d-md-block bg-light sidebar" style={{ height: '100vh', fontSize: '1.5rem' }}>
                    <div className="position-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" href="#meals" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaUtensils className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Meals</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#aLaCarte" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaDrumstickBite className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>A La Carte</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#sides" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaCarrot className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Sides</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#appetizers" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaConciergeBell className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Appetizers</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#drinks" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaGlassCheers className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Drinks</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#deals" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaGift className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Deals/Rewards</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#catering" style={{ display: 'flex', alignItems: 'center', padding: '1.5rem' }}>
                                    <FaTruck className="me-2" style={{ fontSize: '2rem' }} />
                                    <span>Catering</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 overflow-auto" style={{ maxHeight: '100vh' }}>
                    <h2 id="meals">Meals</h2>
                    {/* Add content for "Meals" here */}
                    
                    <h3 id="aLaCarte">A La Carte</h3>
                    <div className="row">
                        {entrees.map((entree, index) => (
                            <div key={index} className="col-4 col-md-3 col-lg-2 mb-3">
                                <div className="card">
                                    <img src={entree.image} className="card-img-top" alt={`Entree${index + 1}`} />
                                    <div className="card-body text-center">
                                        <p className="card-text">{entree.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 id="sides">Sides</h3>
                    <div className="row">
                        {sides.map((side, index) => (
                            <div key={index} className="col-4 col-md-3 col-lg-2 mb-3">
                                <div className="card">
                                    <img src={side.image} className="card-img-top" alt={`Side${index + 1}`} />
                                    <div className="card-body text-center">
                                        <p className="card-text">{side.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 id="appetizers">Appetizers</h3>
                    <div className="row">
                        {appetizers.map((appetizer, index) => (
                            <div key={index} className="col-4 col-md-3 col-lg-2 mb-3">
                                <div className="card">
                                    <img src={appetizer.image} className="card-img-top" alt={`Appetizer${index + 1}`} />
                                    <div className="card-body text-center">
                                        <p className="card-text">{appetizer.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 id="drinks">Drinks</h3>
                    <div className="row">
                        {drinks.map((drink, index) => (
                            <div key={index} className="col-4 col-md-3 col-lg-2 mb-3">
                                <div className="card">
                                    <img src={drink.image} className="card-img-top" alt={`Drink${index + 1}`} />
                                    <div className="card-body text-center">
                                        <p className="card-text">{drink.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 id="deals">Deals</h3>
                    <div className="row">
                        {deals.map((deal, index) => (
                            <div key={index} className="col-4 col-md-3 col-lg-2 mb-3">
                                <div className="card">
                                    <img src={deal.image} className="card-img-top" alt={`Deal${index + 1}`} />
                                    <div className="card-body text-center">
                                        <p className="card-text">{deal.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 id="catering">Catering</h3>
                    <div className="row">
                        {catering.map((item, index) => (
                            <div key={index} className="col-4 col-md-3 col-lg-2 mb-3">
                                <div className="card">
                                    <img src={item.image} className="card-img-top" alt={`Catering${index + 1}`} />
                                    <div className="card-body text-center">
                                        <p className="card-text">{item.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MealSelectionPage;
