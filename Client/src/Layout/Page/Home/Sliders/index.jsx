import SildeComponent from "./SildeComponent"

function DarkVariantExample() {
    return (
        <>
            <div className="container-fluid py-5 mb-5 hero-header"
                style={{
                    position: "absolute",
                    top: 0,
                    zIndex: 5,
                    height: 500
                }}
            >
                <SildeComponent />
            </div>
        </>
    );
}

export default DarkVariantExample;