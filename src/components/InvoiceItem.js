import React from "react";
import EditableField from "./EditableField";
import "./InvoiceItem.css"; // Import custom CSS for styling

const InvoiceItem = ({ items, onItemizedItemEdit, currency, onRowDel, onRowAdd }) => {
  return (
    <div>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ItemRow
              key={item.id}
              item={item}
              onItemizedItemEdit={onItemizedItemEdit}
              onDelEvent={onRowDel}
              currency={currency}
            />
          ))}
        </tbody>
      </table>
      <div className="add-item-info">
      <button onClick={onRowAdd}>
        Add Item
      </button>
      </div>
    </div>
  );
};

const ItemRow = ({ item, onItemizedItemEdit, onDelEvent, currency }) => {
  const handleDelete = () => {
    onDelEvent(item);
  };

  return (
    <tr>
      <td style={{ width: "100%" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: item.name,
            id: item.id,
          }}
        />
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            value: item.description,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: item.quantity,
            id: item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "130px" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            leading: currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            precision: 2,
            textAlign: "text-end",
            value: item.price,
            id: item.id,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default InvoiceItem;
