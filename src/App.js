//**import router section */
import {BrowserRouter} from "react-router-dom";
import Router from "./components/Router";

//import Redux section
import { Provider } from "react-redux";
import store from "./utils/store";

//import react component section
import Header from './components/Header';
import Footer from "./components/Footer";

//import style section
import './style/main.css'

// mocked data to be removed in production
// const details ={
//   type :"Electronic",
//   category : "Food",
//   note : "Notes"
// }

function App() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Router />
          <Footer />
        </BrowserRouter>
      </Provider>
    );
  }
  
  export default App;
