import NotFound from "./components/pages/NotFound";

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/pricing" element={<NotFound/>} />
                    <Route path="/about" element={<NotFound />} />
                    <Route path="/signup" element={<NotFound/>} />
                </Routes>
            </div>
        </>
    )
}

export default App;

