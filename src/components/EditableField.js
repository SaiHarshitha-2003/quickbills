import React from "react";
import "./EditableField.css"; // Import custom CSS for styling

const EditableField = ({ cellData, onItemizedItemEdit }) => {
  return (
    <div className="input-group my-1">
      {cellData.leading != null && (
        <span className="input-leading">
          <span className="input-leading-icon">{cellData.leading}</span>
        </span>
      )}
      <input
        className={`form-control ${cellData.textAlign}`}
        type={cellData.type}
        placeholder={cellData.placeholder}
        min={cellData.min}
        name={cellData.name}
        id={cellData.id}
        value={cellData.value}
        step={cellData.step}
        precision={cellData.precision}
        aria-label={cellData.name}
        onChange={onItemizedItemEdit}
        required
      />
    </div>
  );
};

export default EditableField;
