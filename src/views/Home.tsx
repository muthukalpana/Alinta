import * as React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Customer } from "../components/Customer/Customer";
import { AddCustomerForm } from "../components/AddCustomer/AddCustomerForm";
import { Dispatch } from "redux";
import { CustomerState, ICustomer } from "../types/types";
import { addCustomer, removeCustomer } from "../redux/actions/customerActions";
import { FiChevronUp, FiChevronDown} from "react-icons/fi"
import {
  StyledHome,
  AccordionRow,
  AccordionLabel,
} from "./StyledHome";
import { useState } from "react";

interface State {
  showAddCustomer: boolean;
  showCustomers: boolean;
}

const Home: React.FC = () => {
  const customers: readonly ICustomer[] = useSelector(
    (state: CustomerState) => state.customers,
    shallowEqual
  );

  const [state, setState] = useState<State>({
    showAddCustomer: false,
    showCustomers: false,
  })

  const {
    showAddCustomer,
    showCustomers,
  } = state

  const dispatch: Dispatch<any> = useDispatch();

  const saveCustomer = React.useCallback(
    (customer: ICustomer) => dispatch(addCustomer(customer)),
    [dispatch]
  );

  return (
    <>
      <AccordionRow onClick={() => setState({
        ...state,
        showAddCustomer: !showAddCustomer,
      })}>
        <AccordionLabel> Add Customer </AccordionLabel>
        { showAddCustomer ? <FiChevronUp /> : <FiChevronDown /> }
      </AccordionRow>
      {showAddCustomer &&
        <AddCustomerForm
          customers={customers}
          saveCustomer={saveCustomer}
        />
      }
      <AccordionRow onClick={() => setState({
        ...state,
        showCustomers: !showCustomers,
      })}>
        <AccordionLabel> Customers </AccordionLabel>
        { showCustomers ? <FiChevronUp /> : <FiChevronDown /> }
      </AccordionRow>
      { showCustomers &&
        <StyledHome>
          {customers.map((customer: ICustomer) => (
            
              <Customer
                key={customer.id}
                customer={customer}
                removeCustomer={removeCustomer}
              />
          ))}
        </StyledHome>
      }
    </>
  );
};

export default Home;
