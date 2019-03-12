import React from 'react';
import { Provider } from 'react-redux';
import AppNavbar from './components/AppNavBar';
import ShoppingList from './components/ShoppingList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import store from './store';

const App = () => (
         <Provider store={store}>
            <div className="App">
               <AppNavbar />
               <ShoppingList />
            </div>
         </Provider>
      );

export default App;
