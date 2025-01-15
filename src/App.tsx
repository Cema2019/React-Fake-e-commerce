import React, { useEffect, useState } from "react";
import "./styles.css";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const url = "https://fakestoreapi.com/products";

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setProducts(result); // Store the response data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [url]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Product List
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-1/2 h-48 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800">
                {product.title}
              </h2>
              <p className="text-gray-600 text-sm">{product.category}</p>
              <p className="text-green-600 font-bold mt-2">${product.price}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">Loading...</p>
        )}
      </section>
    </div>
  );
}
