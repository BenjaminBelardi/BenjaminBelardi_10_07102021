//**import router section */
import { BrowserRouter} from "react-router-dom";
// import Router from './components/Router';

//import Redux section
import { Provider } from "react-redux";
import store from "./utils/store";

//import react component section
import Header from './components/Header';
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Dropdown from "./components/Dropdown";
import UserAccount from "./pages/UserAccount";

//import style section
import './style/main.css'

// mocked data to be removed in production
const details ={
  type :"Electronic",
  category : "Food",
  note : "Notes"
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <SignIn />
        {/* <UserAccount /> */}
        {/* <Dropdown date="June 20th, 2020" description="Golden Sun Bakery" amount="$5.00" balance="$2082.79" transactionDetails={details} /> */}
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
