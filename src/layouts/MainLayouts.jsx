import { Outlet } from "react-router-dom";
import Header from "../components/Navbars/Header";
import Footer from "../components/Navbars/Footer";

const MainLayouts = () => {
    return (
        <div>
            <Header />
                <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayouts;