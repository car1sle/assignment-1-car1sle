const Input = ({state, inputIsDisabled, onChange}) => {
    return (
        <input type="number" min="0" value={state} disabled={inputIsDisabled} onChange={onChange} />
    );
  };
  
  export default Input;