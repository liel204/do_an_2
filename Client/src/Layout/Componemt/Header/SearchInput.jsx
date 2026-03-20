// components/SearchInput.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredData,
  setSearchTerm,
} from "../../../redux/slices/product/searchProduct";
import { Button, Col, Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Space } from 'antd';

const SearchInput = () => {
  const dispatch = useDispatch();
  const filteredData = useSelector(selectFilteredData);

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const [show, setShow] = useState(false);

  const handleClose = () => { setShow(false); dispatch(setSearchTerm("")) }
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [rightPosition, setRightPosition] = useState('6rem');
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setRightPosition('2rem');
      } else {
        setRightPosition('6rem');
      }
    };

    handleResize(); // Gọi một lần để set giá trị ban đầu
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Col style={{ marginTop: "1rem", position: "relative" }} xs={7}>
        <Space direction="vertical">
        </Space>
        <InputGroup className="mb-3" style={{ border: "none", }}>
          <Form.Control
            onClick={handleShow}
            placeholder="Search Product ?"
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            onChange={handleSearch}
            style={{ position: "relative" }}
          />
          {show && (
            <Button
              style={{
                background: "none",
                color: "#000",
                border: "none",
                position: "absolute",
                right: rightPosition,
                zIndex: 999,
              }}
              onClick={handleClose}
            >
              <FontAwesomeIcon icon={faX} />
            </Button>
          )}
          <Button variant="outline-secondary">
            <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
            <span className="d-none d-md-inline" style={{ fontWeight: "bold" }}>Search</span>
          </Button>
        </InputGroup>
        {show && (
          <div
            style={{ position: "absolute", background: "#fff", width: "80%", borderRadius: 5, border: "1px solid #d1d1d1" }}
          >
            {filteredData.map(
              (item, index) =>
                index < 6 && (
                  <li
                    style={{
                      borderRadius: 5,
                      listStyle: "none",
                      paddingLeft: 22,
                      fontWeight: 550,
                      backgroundColor: hoveredIndex === index ? '#d1d1d1' : 'white',
                      cursor: 'pointer',
                      margin: "5px 0"
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => {
                      navigate(`/detail/${item.id}`);
                    }}
                    key={item.id}
                  >
                    {item.Product_Name}
                  </li>
                )
            )}
          </div>
        )}
      </Col >
    </>
  );
};

export default SearchInput;
