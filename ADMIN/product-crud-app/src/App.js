import React from 'react';
import ReactDOM from 'react-dom';
import ProductCrud from './ProductCrud';

function App() {
    return (
        <div className="App">
            <ProductCrud />
        </div>
    );
}

export default App;

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
