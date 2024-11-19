import { FunctionComponent, useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../services/productServices";
import { Product } from "../interfaces/Product";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../interfaces/User";
import { errorMsg, successMsg } from "../services/feedbackService";
import ModalUpdtaeAdd from "./ModalUpdtaeAdd";


interface ProductsProps {
  userApp: User;
  cart:Product[] ; 
  setCart:React.Dispatch<React.SetStateAction<Product[]>> ;
}

const Products: FunctionComponent<ProductsProps> = ({ userApp, cart, setCart }) => {
  // const navigate: NavigateFunction = useNavigate();
  // const location = useLocation();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    category: "",
    description: "",
    image: "",
  });
  const [isProductChange, setIsProductChange] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("default");
  const [modalShow, setModalShow] = useState(false);
  const [modalAction, setModalAction] = useState("add");

  useEffect(() => {
    getAllProducts()
      .then((res) => setAllProducts(res.data))
      .catch((err) => console.log(err));
  }, [isProductChange]);

  const handleDelete = async (id: string = "") => {
    try {
      if (!id) {
        throw new Error("Product ID is missing");
      }

      const response = await deleteProduct(id);

      if (response.data) {
        setIsProductChange(!isProductChange);
        successMsg("Product deleted successfully");
        // navigate("/products");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      errorMsg("Failed to delete product");
    }
  };

  function addCart(product:Product) {

    const myCart=cart
    myCart.push(product)
    setCart(myCart)

  }

  // ------------------------------------------------------------------

  // change from components to react bootstrap modal use

  function addProduct() {
    // navigate("addproduct");
    // console.log(selectedProduct)
    let selected: Product = {
      id: "",
      name: "",
      price: 0,
      category: "",
      description: "",
      image: "",
    };
    setModalAction("add");
    setSelectedProduct(selected);
    setModalShow(true);
  }
  function handleUpdate(id: string = "") {
    const selected = allProducts.find((prod) => prod.id === id);
    if (selected) {
      setSelectedProduct(selected);
      setModalAction("update");
      setModalShow(true);
    }
    // navigate("updateproduct");
  }

  // const isSubRoute =
  //   location.pathname.includes("/addproduct") ||
  //   location.pathname.includes("/updateproduct");

  // ------------------------------------------------------------------

  return (
    <>
      {/* {isSubRoute ? (
        // Render only the Outlet for sub-routes
        <Outlet
          context={{ isProductChange, setIsProductChange, selectedProduct }}
        />
      ) : ( */}
      <>
        <h1 className="text-center">Products</h1>
        <div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option className="item-center" value="default">
              Default sort
            </option>
            <option className="item-center" value="name">
              Sort by name
            </option>
            <option className="item-center" value="categort">
              Sort by category
            </option>
            <option className="item-center" value="price">
              Sort by price
            </option>
          </select>
        </div>
        {userApp.isAdmin ? (
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={() => addProduct()}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Product
          </button>
        ) : (
          <></>
        )}
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

                    <p className="card-text">Price -${product.price}</p>
                    <div className="d-flex flex-row justify-content-center mt-auto">
                      <button
                        type="button"
                        className="btn btn-primary me-2"
                        onClick={() => addCart(product)}
                      >
                        <FontAwesomeIcon icon={faCartShopping} />
                        Add to Cart
                      </button>
                      {userApp.isAdmin ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-warning me-2"
                            onClick={() => handleUpdate(product.id)}
                          >
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger "
                            onClick={() => handleDelete(product.id)}
                          >
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
        {/* <Outlet context={{ isProductChange, setIsProductChange }} />{" "} */}
        <ModalUpdtaeAdd
          show={modalShow}
          // setModalShow={setModalShow}
          onHide={() => setModalShow(false)}
          modalAction={modalAction}
          selectedProduct={selectedProduct}
          isProductChange={isProductChange} 
          setIsProductChange={setIsProductChange}
        />
      </>
      {/* )} */}
    </>
  );
};

export default Products;
