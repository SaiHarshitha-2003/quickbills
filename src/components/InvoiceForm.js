import React, { useState, useEffect, useCallback } from "react";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import "./InvoiceForm.css"; 

const InvoiceForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("$");
  const [currentDate] = useState(new Date().toLocaleDateString());
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [billTo, setBillTo] = useState("");
  const [billToEmail, setBillToEmail] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [billFrom, setBillFrom] = useState("");
  const [billFromEmail, setBillFromEmail] = useState("");
  const [billFromAddress, setBillFromAddress] = useState("");
  const [notes, setNotes] = useState("Thank you for choosing us. Have a great day!");
  const [total, setTotal] = useState("0.00");
  const [subTotal, setSubTotal] = useState("0.00");
  const [taxRate, setTaxRate] = useState("");
  const [taxAmount, setTaxAmount] = useState("0.00");
  const [discountRate, setDiscountRate] = useState("");
  const [discountAmount, setDiscountAmount] = useState("0.00");

  const [items, setItems] = useState([
    {
      id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      name: "",
      description: "",
      price: "1.00",
      quantity: 1,
    },
  ]);

  const handleCalculateTotal = useCallback(() => {
    let newSubTotal = items
      .reduce((acc, item) => acc + parseFloat(item.price) * parseInt(item.quantity), 0)
      .toFixed(2);

    let newTaxAmount = (newSubTotal * (taxRate / 100)).toFixed(2);
    let newDiscountAmount = (newSubTotal * (discountRate / 100)).toFixed(2);
    let newTotal = (newSubTotal - newDiscountAmount + parseFloat(newTaxAmount)).toFixed(2);

    setSubTotal(newSubTotal);
    setTaxAmount(newTaxAmount);
    setDiscountAmount(newDiscountAmount);
    setTotal(newTotal);
  }, [items, taxRate, discountRate]);

  useEffect(() => {
    handleCalculateTotal();
  }, [handleCalculateTotal]);

  const handleRowDel = (item) => {
    const updatedItems = items.filter((i) => i.id !== item.id);
    setItems(updatedItems);
  };

  const handleAddEvent = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id,
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    setItems([...items, newItem]);
  };

  const onItemizedItemEdit = (evt) => {
    const { id, name, value } = evt.target;
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [name]: value } : item
    );
    setItems(updatedItems);
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
    handleCalculateTotal();
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <form onSubmit={openModal} className="invoice-form">
      <div className="invoice-header">
        <div className="date-invoice">
          <div>
            <strong>Current Date:&nbsp;</strong>
            <span>{currentDate}</span>
          </div>
          <label>
            <strong>Due Date:</strong>
            <input
              type="date"
              value={dateOfIssue}
              onChange={handleChange(setDateOfIssue)}
              required
            />
          </label>
        </div>
        <label>
          <strong>Invoice Number:</strong>
          <input
            type="number"
            value={invoiceNumber}
            onChange={handleChange(setInvoiceNumber)}
            min="1"
            required
          />
        </label>
      </div>

      <hr />

      <div className="billing-info">
        <div className="bill-from">
          <label>Bill From:</label>
          <input
            type="text"
            placeholder="Who is this invoice from?"
            value={billFrom}
            onChange={handleChange(setBillFrom)}
            required
          />
          <input
            type="email"
            placeholder="Email address"
            value={billFromEmail}
            onChange={handleChange(setBillFromEmail)}
            required
          />
          <input
            type="text"
            placeholder="Billing address"
            value={billFromAddress}
            onChange={handleChange(setBillFromAddress)}
            required
          />
        </div>

        <div className="bill-to">
          <label>Bill To:</label>
          <input
            type="text"
            placeholder="Who is this invoice to?"
            value={billTo}
            onChange={handleChange(setBillTo)}
            required
          />
          <input
            type="email"
            placeholder="Email address"
            value={billToEmail}
            onChange={handleChange(setBillToEmail)}
            required
          />
          <input
            type="text"
            placeholder="Billing address"
            value={billToAddress}
            onChange={handleChange(setBillToAddress)}
            required
          />
        </div>
      </div>

      <InvoiceItem
        onItemizedItemEdit={onItemizedItemEdit}
        onRowAdd={handleAddEvent}
        onRowDel={handleRowDel}
        currency={currency}
        items={items}
      />

      <div className="totals">
        <div className="subtotal">
          <span>Subtotal:</span>
          <span>{currency}{subTotal}</span>
        </div>
        <div className="discount">
          <span>Discount: ({discountRate || 0}%)</span>
          <span>{currency}{discountAmount || 0}</span>
        </div>
        <div className="tax">
          <span>Tax: ({taxRate || 0}%)</span>
          <span>{currency}{taxAmount || 0}</span>
        </div>
        <div className="total">
          <strong>Total:</strong>
          <strong>{currency}{total || 0}</strong>
        </div>
      </div>

      <label>
        Notes:
        <textarea
          placeholder="Thank you for choosing us."
          value={notes}
          onChange={handleChange(setNotes)}
        />
      </label>

      <hr />

      <InvoiceModal
        showModal={isOpen}
        closeModal={closeModal}
        info={{
          dateOfIssue,
          invoiceNumber,
          billTo,
          billToEmail,
          billToAddress,
          billFrom,
          billFromEmail,
          billFromAddress,
          notes,
        }}
        items={items}
        currency={currency}
        subTotal={subTotal}
        taxAmount={taxAmount}
        discountAmount={discountAmount}
        total={total}
      />
      <div className="currency-tax-discount">
      <label>
        Currency:
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="$">USD (United States Dollar)</option>
          <option value="£">GBP (British Pound Sterling)</option>
          <option value="₹">INR (Indian Rupee)</option>
          <option value="¥">JPY (Japanese Yen)</option>
          <option value="$">CAD (Canadian Dollar)</option>
        </select>
      </label>

      <label>
        Tax rate:
        <input
          type="number"
          value={taxRate}
          onChange={handleChange(setTaxRate)}
          min="0"
          max="100"
        />
      </label>

      <label>
        Discount rate:
        <input
          type="number"
          value={discountRate}
          onChange={handleChange(setDiscountRate)}
          min="0"
          max="100"
        />
      </label>
      </div>&nbsp;
      <div className="button-container">
      <button type="submit">Review Invoice</button>
      </div>
    </form>
  );
};

export default InvoiceForm;
