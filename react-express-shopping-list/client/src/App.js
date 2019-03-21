import React from 'react';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';
import AppNavbar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import store from './store';

const App = () => (
         <Provider store={store}>
            <div className="App">
               <AppNavbar />
               <Container>
                  <ItemModal />
                  <ShoppingList />
               </Container>
            </div>
         </Provider>
      );

export default App;
