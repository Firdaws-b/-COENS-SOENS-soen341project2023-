const FormRow = ({ type, name, value, handleChange, labelText, disabled, ...otherProps }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labelText || name}
            </label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                className="form-input"
                disabled={disabled}
                {...otherProps}
            />
        </div>
    );
};

export default FormRow;
