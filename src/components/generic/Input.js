const Input = ({ value, disabledValue, onChange }) => {

    return (
        <input type="number" min="0" value={value} disabled={disabledValue} onChange={onChange} />
    );
  };
  
  export default Input;