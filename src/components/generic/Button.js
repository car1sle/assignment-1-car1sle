const Button = ({ value, disabledValue, inputTime, onClick }) => {

    return (
        <button disabled={inputTime ? disabledValue : true} onClick={e => onClick(value)}>
            {value}
        </button>
    );
  };
  
  export default Button;