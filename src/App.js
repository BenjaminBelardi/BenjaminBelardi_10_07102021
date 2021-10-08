import { BrowserRouter} from "react-router-dom";
// import Router from './components/Router';
import Header from './components/Header';
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Dropdown from "./components/Dropdown";
import UserAccount from "./pages/UserAccount";
import './style/main.css'

const details ={
  type :"Electronic",
  category : "Food",
  note : "Notes"
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <UserAccount />
      {/* <Dropdown date="June 20th, 2020" description="Golden Sun Bakery" amount="$5.00" balance="$2082.79" transactionDetails={details} /> */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
