import React from "react";
import "./InvoiceModal.css"; // Import the custom CSS file

const InvoiceModal = ({
  showModal,
  closeModal,
  info,
  currency,
  total,
  items,
  taxAmount,
  discountAmount,
  subTotal,
}) => {
  return (
    <div className={`modal ${showModal ? "show" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div id="invoiceCapture">
          <div className="invoice-header">
            <div className="invoice-title">
              <h4>{info.billFrom || "John Uberbacher"}</h4>
              <h6>Invoice Number: {info.invoiceNumber || ""}</h6>
            </div>
            <div className="invoice-amount">
              <h6>Amount Due:</h6>
              <h5>
                {currency} {total}
              </h5>
            </div>
          </div>
          <div className="invoice-body">
            <div className="invoice-section">
              <div className="invoice-col">
                <strong>Billed From:</strong>
                <p>{info.billFrom || ""}</p>
                <p>{info.billFromAddress || ""}</p>
                <p>{info.billFromEmail || ""}</p>
              </div>
              <div className="invoice-col">
                <strong>Billed to:</strong>
                <p>{info.billTo || ""}</p>
                <p>{info.billToAddress || ""}</p>
                <p>{info.billToEmail || ""}</p>
              </div>
              <div className="invoice-col">
                <strong>Date Of Issue:</strong>
                <p>{info.dateOfIssue || ""}</p>
              </div>
            </div>
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>QTY</th>
                  <th>DESCRIPTION</th>
                  <th className="text-end">PRICE</th>
                  <th className="text-end">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.quantity}</td>
                    <td>{item.name} - {item.description}</td>
                    <td className="text-end">{currency} {item.price}</td>
                    <td className="text-end">{currency} {item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="invoice-summary">
              <tbody>
                <tr>
                  <td className="text-end">SUBTOTAL</td>
                  <td className="text-end">{currency} {subTotal}</td>
                </tr>
                {taxAmount !== 0.0 && (
                  <tr>
                    <td className="text-end">TAX</td>
                    <td className="text-end">{currency} {taxAmount}</td>
                  </tr>
                )}
                {discountAmount !== 0.0 && (
                  <tr>
                    <td className="text-end">DISCOUNT</td>
                    <td className="text-end">{currency} {discountAmount}</td>
                  </tr>
                )}
                <tr>
                  <td className="text-end">TOTAL</td>
                  <td className="text-end">{currency} {total}</td>
                </tr>
              </tbody>
            </table>
            {info.notes && <div className="invoice-notes">{info.notes}</div>}
          </div>
        </div>
        <div className="invoice-footer">
          <button className="btn-close" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
