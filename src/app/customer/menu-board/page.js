// src/app/customer/menu-board/page.js
"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const MenuBoardPage = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const images = [
        { src: "/meals.svg", title: "Meals", alt: "Meals" },
        { src: "/entrees.svg", title: "Entrees", alt: "Entrees" },
        { src: "/sides.svg", title: "Sides", alt: "Sides" },
        { src: "/more.svg", title: "More", alt: "More" },
    ];

    const openModal = (index) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImageIndex(null);
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePreviousImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const navigateBack = () => {
        router.push("/customer"); // Navigate back to the customer page
    };

    return (
        <div className="menu-board-container d-flex align-items-center justify-content-center vh-100 position-relative">
            <div className="menu-gallery text-center">
                <h1 className="display-4 text-light mb-5">Our Menu</h1>
                <div className="container">
                    <div className="row g-4">
                        {/* Menu Items */}
                        {images.map((image, index) => (
                            <div key={index} className="col-md-6 col-lg-3">
                                <div className="menu-item hover-zoom card h-100" role="button" onClick={() => openModal(index)}>
                                    <Image src={image.src} alt={image.alt} width={300} height={300} className="menu-image card-img-top" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="btn btn-outline-light btn-lg mt-5" onClick={navigateBack}>
                    Back to Customer Page
                </button>
            </div>

            {/* Full-Screen Modal for Image */}
            {isModalOpen && (
                <div className="modal show d-block" tabIndex="-1" role="dialog" aria-labelledby="imageModal" aria-hidden="true" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
                    <div className="modal-dialog modal-fullscreen" role="document">
                        <div className="modal-content bg-dark text-white">
                            <div className="modal-header border-0">
                                <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body d-flex align-items-center justify-content-center">
                                <Image
                                    src={images[selectedImageIndex].src}
                                    alt={images[selectedImageIndex].alt}
                                    width={1920}
                                    height={1024}
                                    className="img-fluid"
                                />
                            </div>
                            <div className="modal-footer border-0 justify-content-between">
                                <button type="button" className="btn btn-light" onClick={handlePreviousImage}>
                                    Previous
                                </button>
                                <button type="button" className="btn btn-light" onClick={handleNextImage}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuBoardPage;