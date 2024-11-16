import { FunctionComponent, useEffect, useState } from "react";
import { getAllProducts } from "../services/productServices";
import { Product } from "../interfaces/Product";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { all } from "axios";
import { User } from "../interfaces/User";

interface ProductsProps {
  userApp: User;
}

const Products: FunctionComponent<ProductsProps> = ({ userApp }) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  useEffect(() => {
    getAllProducts()
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1 className="text-center">Products</h1>
      <div className="container text-center">
        <div className="row">
          {allProducts.map((product) => (
            <div className="col mb-3">
              <div
                className="card h-100 "
                style={{
                  width: "18rem",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.category}</h5>
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  {/* <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a> */}
                  <div className="d-flex flex-row justify-content-center mt-auto">
                    <button type="button" className="btn btn-primary me-2">
                      <FontAwesomeIcon icon={faCartShopping} />
                      Add to Cart
                    </button>
                    {userApp.isAdmin ? (
                      <>
                        <button type="button" className="btn btn-warning me-2">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button type="button" className="btn btn-danger ">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* <div className="col">Column</div>
          <div className="col">Column</div> */}
        </div>
      </div>
    </>
  );
};

export default Products;
