import { Container } from "react-bootstrap"
import { Footer } from "../../../Componemt/Footer"
import { Header } from "../../../Componemt/Header/header"
import Detail from "./Components/profile"

export const Profile = () => {
    return (
        <>
            <Header />
            <Container>
                <Detail />
            </Container>
            <Footer />
        </>
    )
}