import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom"
import NotFound from "./Pages/NotFound";

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element= {<NotFound/>}/>
                    <Route path="/about"  element={<NotFound />} />
                    <Route path="/home" element= {<NotFound/>} />
                </Routes>
            </div>
        </>
    )
}

export default App

