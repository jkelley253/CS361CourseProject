// cs361courseproject/ frontend/ src/ components/ Checkbox.js
import React from 'react';

function Checkbox({ label, isSelected, onCheckboxChange }) {
    return (
        <div className="checkbox-container">
            <label>
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={onCheckboxChange}
                />
                {label}
            </label>
        </div>
    );
}

export default Checkbox;
