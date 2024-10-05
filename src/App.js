import React from "react";
import "./App.css"; 
import InvoiceForm from "./components/InvoiceForm";

const App = () => {
  return (
    <div className="App">
      <div className="form-container">
        <h1>Create Invoice</h1>
        <InvoiceForm />
      </div>
    </div>
  );
};

export default App;
