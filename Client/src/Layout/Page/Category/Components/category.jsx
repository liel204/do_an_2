import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProductsCaterogyID } from "../../../../redux/slices/product/allProductWithCaterogyID";
import { getAllCategory } from "../../../../redux/slices/category/allCaterogy";
import { useNavigate, useParams } from "react-router-dom";
import { setSort } from "../../../../redux/slices/product/allProductWithCaterogyID";
import PaginationComponent from "../../../Componemt/Pagination/Pagination";
import { Dropdown } from "react-bootstrap";

const Category = () => {
    const { listproductsCaterogyID, sort } = useSelector((state) => state.allProductCaterogyIDStore);
    const listCate = useSelector(state => state.allCategoryStore.listcategory);
    const dispatch = useDispatch();

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllCategory());
        dispatch(getAllProductsCaterogyID(id));
    }, [dispatch, useParams()]);

    const sortedProducts = [...listproductsCaterogyID].sort((a, b) => {
        if (sort === 'priceAscending') {
            return a.lowest_option_price - b.lowest_option_price;
        }
        if (sort === 'priceDescending') {
            return b.lowest_option_price - a.lowest_option_price;
        }
        if (sort === 'oldest') {
            return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const handleSortChange = (e) => {
        dispatch(setSort(e.target.value));
    };

    const [heightImage, setHeightImage] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) {
                setHeightImage(false);
            } else if (window.innerWidth <= 768) {
                setHeightImage(false);
            } else {
                setHeightImage(true);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className="container-fluid category py-5">
                <div className="container pb-5">
                    <div className="row g-4">
                        <div className="col-lg-12">
                            <div className="row g-4">
                                <div className="col-9"></div>
                                <div className="col-xl-3">
                                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                                        <label htmlFor="sort">Default Sorting:</label>
                                        <select
                                            style={{ fontWeight: 500 }}
                                            onChange={handleSortChange}
                                            className="border-0 form-select-sm bg-light me-3"
                                            value={sort}
                                        >
                                            <option value="newest">Newest</option>
                                            <option value="oldest">Oldest</option>
                                            <option value="priceAscending">Cheapest</option>
                                            <option value="priceDescending">Most Expensive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-lg-3">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="mb-3">
                                                {heightImage ?
                                                    <>
                                                        <h4>Categories</h4>
                                                        <ul className="list-unstyled category-list">
                                                            {listCate.map(item => {
                                                                return (
                                                                    <li key={item.id}>
                                                                        <div className="d-flex justify-content-between category-name">
                                                                            <button className="btn" style={{ marginBottom: 1, fontWeight: 550 }} onClick={() => navigate(`/category/${item.id}`)}>
                                                                                <i className="fas fa-apple-alt me-2"></i>{item.Category_Name}
                                                                            </button>
                                                                            <span>({item.product_count})</span>
                                                                        </div>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </> :
                                                    <Dropdown>
                                                        <Dropdown.Toggle variant="success" id="dropdown-category">
                                                            Select Category
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            {listCate.map(item => (
                                                                <Dropdown.Item
                                                                    key={item.id}
                                                                    as="button"
                                                                    onClick={() => navigate(`/category/${item.id}`)}
                                                                >
                                                                    <i className="fas fa-apple-alt me-2"></i>
                                                                    {item.Category_Name} <span>({item.product_count})</span>
                                                                </Dropdown.Item>
                                                            ))}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <PaginationComponent sortedProducts={sortedProducts} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;
