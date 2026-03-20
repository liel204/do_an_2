import { Container } from "react-bootstrap"
import { Footer } from "../../Componemt/Footer"
import { Header } from "../../Componemt/Header/header"
import Cart from "./Components/cart"

export const CartProduct = () => {
    return (
        <>
            <Header />
            <Container>
                <Cart />
            </Container>
            <Footer />
        </>
    )
}