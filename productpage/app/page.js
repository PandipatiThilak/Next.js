"use client";

import React, { useState, useEffect } from "react";

function Page() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  async function fetchProductDetails(id) {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    setSelectedProduct(data);
  }

  function closeModal() {
    setSelectedProduct(null);
  }

  if (!products.length)
    return <span className="loading loading-ring loading-lg"></span>;

  return (
    <div className="container mx-auto p-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="box-content p-4 border-4 rounded-lg shadow-lg cursor-pointer hover:bg-sky-500 hover:ring-sky-500"
            onClick={() => fetchProductDetails(product.id)}
          >
            <li className="text-base font-semibold mb-2">{product.title}</li>
            <img
              className="h-40 w-full object-contain"
              src={product.image}
              alt={product.title}
            />
          </div>
        ))}
      </ul>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-lg font-bold">{selectedProduct.title}</h2>
            <img
              className="h-40 w-full object-contain mt-4"
              src={selectedProduct.image}
              alt={selectedProduct.title}
            />
            <p className="mt-2">{selectedProduct.description}</p>
            <p className="mt-2 font-bold">Price: ${selectedProduct.price}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
