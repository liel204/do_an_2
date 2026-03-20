import { Container } from "react-bootstrap"
import { Footer } from "../../Componemt/Footer"
import { Header } from "../../Componemt/Header/header"
import Oder from "./Components/oder"

export const OderProduct = () => {
    return (
        <>
            <Header />
            <Container>
                <Oder />
            </Container>
            <Footer />
        </>
    )
}