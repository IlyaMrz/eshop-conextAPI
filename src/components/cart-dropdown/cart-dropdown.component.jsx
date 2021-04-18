import React, { useRef, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../providers/cart/cart.provider';

import './cart-dropdown.styles.scss';
import useOutsideClick from '../outsideClickHandler/useOutsideClick';

const CartDropdown = ({ history }) => {
  const { toggleHidden, hidden, cartItems } = useContext(CartContext);
  const ref = useRef();
  useOutsideClick(ref, () => {
    !hidden && toggleHidden()
  });
return (
  <div className='cart-dropdown' ref={ref}>
    <div className='cart-items'>
      {cartItems.length ? (
        cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push('/checkout');
        toggleHidden();
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
)};




export default withRouter(CartDropdown);
