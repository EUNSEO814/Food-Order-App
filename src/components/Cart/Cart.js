import styled from "styled-components";
import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 20rem;
  overflow: scroll;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1rem 0;
`;
const Actions = styled.div`
  text-align: right;
  > button {
    font: inherit;
    cursor: pointer;
    /* background-color: transparent; */
    border: 1px solid #8a2b06;
    padding: 0.5rem 2rem;
    border-radius: 25px;
    margin-left: 1rem;
  }
  & > :hover {
    background-color: #5a1a01;
    border-color: #5a1a01;
    color: white;
  }
  & > :active {
    background-color: #5a1a01;
    border-color: #5a1a01;
    color: white;
  }
`;

const AltBtn = styled.button`
  color: #8a2b06;
`;

const ActionsBtn = styled.button`
  background-color: #8a2b06;
  color: white;
`;

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <UL>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </UL>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <Total>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </Total>
      <Actions>
        <AltBtn onClick={props.onClose}>Close</AltBtn>
        {hasItems && <ActionsBtn>Order</ActionsBtn>}
      </Actions>
    </Modal>
  );
};

export default Cart;
