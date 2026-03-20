import { Button } from "react-bootstrap";
import Card from "../../../Componemt/Card";
import { useSelector } from "react-redux";
import SliderProduct from "./Slider";

const ListProduct = () => {
    const listProduct = useSelector((state) => state.allProductStore.listproducts);
    const listCategory = useSelector((state) => state.allCategoryStore.listcategory);

    return (
        <>
            <div className="container-fluid fruit py-5">
                <div className="container py-5">
                    <div className="tab-class text-center">
                        <div className="row g-4">
                            <div className="col-lg-4 text-start">
                                <h1 style={{ fontWeight: 600, color: "#1A1A1A" }}>New Products</h1>
                            </div>
                            <div className="col-lg-8 text-end">
                                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                    {listCategory.map(item => {
                                        return (
                                            <li key={item.id} className="nav-item" style={{ marginLeft: 10 }}>
                                                <Button>
                                                    <span style={{ width: "130px" }}>
                                                        {item.Category_Name}
                                                    </span>
                                                </Button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="tab-content">
                            <div className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            <SliderProduct />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-lg-4 text-start">
                            <h1 style={{ fontWeight: 600, color: "#1A1A1A" }}>All Products</h1>
                        </div>
                        <div className="tab-content">
                            <div className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    <div className="col-lg-12">
                                        <div className="row g-4">
                                            {listProduct.map(item => {
                                                return (
                                                    <div key={item.id} className="col-md-6 col-lg-4 col-xl-3">
                                                        <Card item={item} />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListProduct;
