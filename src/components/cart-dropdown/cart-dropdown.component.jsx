import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartHidden, selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';

import './cart-dropdown.styles.scss';
import useOutsideClick from '../outsideClickHandler/useOutsideClick';

const CartDropdown = ({ cartItems, history, hidden, toggleCartHidden }) => {
  const ref = useRef();
  useOutsideClick(ref, () => {
    !hidden && toggleCartHidden()
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
        toggleCartHidden();
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
)};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDropdown));
