const Button = ({ value, disabledValue, onClick, setIsRunning, setIsPaused }) => {
    return (
        <button disabled={disabledValue} onClick={e => onClick(e, setIsRunning, setIsPaused)}>
            {value}
        </button>
    );
  };
  
  export default Button;