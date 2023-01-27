import styled from "styled-components";

const List = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #8a2b06;
  padding: 1rem 0;
  margin: 1rem 0;
`;
const H2 = styled.h2`
  margin: 0 0 0.5rem 0;
  color: #363636;
`;

const Summary = styled.div`
  width: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.span`
  font-weight: bold;
  color: #8a2b06;
`;

const Amount = styled.span`
  font-weight: bold;
  border: 1px solid #ccc;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  color: #363636;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const CartBtn = styled.button`
  font: inherit;
  font-weight: bold;
  font-size: 1.25rem;
  color: #8a2b06;
  border: 1px solid #8a2b06;
  width: 3rem;
  text-align: center;
  border-radius: 6px;
  background-color: transparent;
  cursor: pointer;
  margin-left: 1rem;
  margin: 0.25rem;
  :hover {
    background-color: #8a2b06;
    color: white;
  }
  :active {
    background-color: #8a2b06;
    color: white;
  }
`;
const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <List>
      <div>
        <H2>{props.name}</H2>
        <Summary>
          <Price>{price}</Price>
          <Amount>x {props.amount}</Amount>
        </Summary>
      </div>
      <Actions>
        <CartBtn onClick={props.onRemove}>−</CartBtn>
        <CartBtn onClick={props.onAdd}>+</CartBtn>
      </Actions>
    </List>
  );
};

export default CartItem;
