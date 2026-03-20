import React, { useState } from 'react';
import Card from "../Card/index"
import { Button } from 'react-bootstrap';

const itemsPerPage = 9; // Number of items to display per page

const PaginationComponent = ({ sortedProducts }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total pages
    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

    // Get current items
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

    // Change page function
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className="col-lg-9">
                <div className="row g-4 justify-content-center">
                    {currentItems.map(item => {
                        console.log("firstadadasdasd", item)

                        return (
                            <>
                                <div className="col-md-6 col-lg-6 col-xl-4">
                                    <Card item={item} />
                                </div>
                            </>
                        )
                    })}
                    <div className="col-12">
                        <div className="pagination d-flex justify-content-center mt-5">
                            <Button style={{ marginLeft: 3, marginRight: 3 }} onClick={() => handlePageChange(currentPage === 1 ? 1 : currentPage - 1)}>&laquo;</Button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <Button
                                    style={{ marginLeft: 3, marginRight: 3 }}
                                    key={i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                    disabled={currentPage === i + 1}>
                                    {i + 1}
                                </Button>
                            ))}
                            <Button style={{ marginLeft: 3, marginRight: 3 }} onClick={() => handlePageChange(currentPage === totalPages ? totalPages : currentPage + 1)}>&raquo;</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaginationComponent;
