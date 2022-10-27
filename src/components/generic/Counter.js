import styled from 'styled-components';

const StyledCounter = styled.div`
    font-family: 'Roboto Mono', monospace;
    font-size: 35px;
    margin: 10px 0;
    display: inline-block;
    width: 200px;
`;

const Counter = ({ value }) => {

    return (
        <StyledCounter>{value}</StyledCounter>
    );
  };
  
  export default Counter;