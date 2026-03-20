import { Container } from "react-bootstrap"
import { Footer } from "../../Componemt/Footer"
import { Header } from "../../Componemt/Header/header"
import Slide from "./Sliders"
import ListProduct from "./ListProducts"
export const HomePage = () => {
    return (
        <>
            <Header />
            <Slide />
            <Container style={{ marginTop: 300 }}>
                <ListProduct />
            </Container>
            <Footer />
        </>
    )
}