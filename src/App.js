import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
function App() {
  return (
    <>
<BrowserRouter>
<Header/>
<Pages/>
</BrowserRouter>
<Footer/>
    </>
  );
}

export default App;
