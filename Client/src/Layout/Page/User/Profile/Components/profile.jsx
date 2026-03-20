import React from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../../../redux/slices/user/logout"

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const use = useSelector(state => state.loginForReduxStore.userIsloginForRedux)
    const handleLogOut = async () => {
        // Đăng xuất người dùng (chờ hoàn tất)
        await dispatch(logoutUser());

        // Điều hướng tới trang login
        navigate("/login");

        // Làm mới trang sau khi điều hướng
        window.location.reload();
    }
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Image
                                src="https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg"
                                roundedCircle
                                alt="User Avatar"
                                width="150"
                                height="150"
                                className="mb-3"
                            />
                            <Card.Title>{use.User_Name}</Card.Title>
                            <Card.Text>{use.User_Email}</Card.Text>
                            <Card.Text>{use.User_Role}</Card.Text>
                            <Button style={{ marginRight: "1rem" }} onClick={handleLogOut}>Đăng Xuất</Button>
                            <Button style={{ marginRight: "1rem" }} onClick={() => { navigate(`/oder`) }}>Order</Button>
                            {use.User_Role !== "Client" && <Button style={{ marginRight: "1rem" }} onClick={() => { navigate(`/admin`) }}>Admin</Button>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;

