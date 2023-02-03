import styled from "styled-components";
import { useRef, useState } from "react";

const Form = styled.form`
  margin: 1rem 0;
  height: 19rem;
  overflow: auto;
`;

const Control = styled.div`
  margin-bottom: 0.5rem;
`;
const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.25rem;
  display: block;
  &.invalidLabel {
    color: #ca3e51;
  }
`;

const Input = styled.input`
  font: inherit;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 20rem;
  max-width: 100%;
  &.invalidInput {
    border-color: #aa0b20;
    background-color: #ffeff1;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Btn = styled.button`
  font: inherit;
  color: #5a1a01;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-radius: 25px;
  padding: 0.5rem 2rem;
  :hover {
    background-color: #ffe6dc;
  }
  :active {
    background-color: #ffe6dc;
  }
`;

const SubmitBtn = styled(Btn)`
  border: 1px solid #5a1a01;
  background-color: #5a1a01;
  color: white;
  :hover {
    background-color: #7a2706;
  }
  :active {
    background-color: #7a2706;
  }
`;

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });

    const formIsValid =
      enteredCityIsValid &&
      enteredPostalIsValid &&
      enteredNameIsValid &&
      enteredStreetIsValid;

    if (!formIsValid) {
      return;
    }
    //submit the cart data

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal,
    });
  };

  return (
    <Form onSubmit={confirmHandler}>
      <Control>
        <Label className={formInputsValidity.name ? null : "invalidLabel"}>
          Your Name
        </Label>
        <Input
          type="text"
          id="name"
          ref={nameInputRef}
          className={formInputsValidity.name ? null : "invalidInput"}
        />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </Control>
      <Control>
        <Label className={formInputsValidity.street ? null : "invalidLabel"}>
          Street
        </Label>
        <Input
          type="text"
          id="street"
          ref={streetInputRef}
          className={formInputsValidity.street ? null : "invalidInput"}
        />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </Control>
      <Control>
        <Label className={formInputsValidity.postal ? null : "invalidLabel"}>
          Postal Code
        </Label>
        <Input
          type="text"
          id="postal"
          ref={postalInputRef}
          className={formInputsValidity.postal ? null : "invalidInput"}
        />
        {!formInputsValidity.postal && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </Control>
      <Control>
        <Label className={formInputsValidity.city ? null : "invalidLabel"}>
          City
        </Label>
        <Input
          type="text"
          id="city"
          ref={cityInputRef}
          className={formInputsValidity.city ? null : "invalidInput"}
        />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </Control>
      <Actions>
        <Btn type="button" onClick={props.onCancel}>
          Cancel
        </Btn>
        <SubmitBtn>Confirm</SubmitBtn>
      </Actions>
    </Form>
  );
};

export default Checkout;
