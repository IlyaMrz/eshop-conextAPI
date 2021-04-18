import React, { useRef, useContext } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartHidden, selectCartItems } from '../../redux/cart/cart.selectors';
import CartContext from '../../contexts/cart/cart.context';

import './cart-dropdown.styles.scss';
import useOutsideClick from '../outsideClickHandler/useOutsideClick';

const CartDropdown = ({ cartItems, history }) => {
  const { toggleHidden, hidden } = useContext(CartContext);
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

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  hidden: selectCartHidden
});


export default withRouter(connect(mapStateToProps)(CartDropdown));
