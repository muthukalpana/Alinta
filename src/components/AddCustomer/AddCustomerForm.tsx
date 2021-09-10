import { Field, Formik, FormikHelpers } from "formik";
import * as React from "react";
import { ICustomer, Customer } from "../../types/types";
import {
  StyledForm,
  StyledInput,
  StyledLabel,
  StyledAddButton,
  ErrorLabel,
} from "./StyledAddCustomerForm";

type Props = {
  customers: readonly ICustomer[];
  saveCustomer: (customer: ICustomer | any) => void;
};

export const AddCustomerForm: React.FC<Props> = ({ customers, saveCustomer }) => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "",
      }}
      onSubmit={(
        values: Customer,
        { setSubmitting }: FormikHelpers<Customer>
      ) => {
        saveCustomer(values);
        setSubmitting(false);
      }}
    validate={values => {
        const errors = {
          firstName: '',
          phoneNumber: '',
        }
        const nameFilter = customers.find(customer => customer.firstName.toLowerCase().trim() === values.firstName.toLowerCase().trim() &&
        customer.lastName.toLowerCase().trim() === values.lastName.toLowerCase().trim())
        const phoneFilter = customers.find(customer => customer.phoneNumber.trim() === values.phoneNumber.trim())
        if (nameFilter) {
          errors.firstName = `Customer Name (${nameFilter.firstName} ${nameFilter.lastName}) already exists!`
        }
        if (values.phoneNumber !== '') {
          if (phoneFilter) {
            errors.phoneNumber = 'Phone number already exists'
          } else {
            const regex = new RegExp(/^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9])?( ?-?[0-9]){7,9}$/)
            const isValid = regex.test(values.phoneNumber)
            errors.phoneNumber = isValid ? '' : 'Please enter valid phone number';
          }
        }
        return errors.phoneNumber === '' && errors.firstName === '' ? {} : errors;
      }}
    >
      {
        (props) => (
          <StyledForm onSubmit={props.handleSubmit}>
            <StyledLabel htmlFor="firstName">First Name</StyledLabel>
            <Field
              as={StyledInput}
              id="firstName"
              name="firstName"
              placeholder="John"
            />

            <StyledLabel htmlFor="lastName">Last Name</StyledLabel>
            <Field
              as={StyledInput}
              id="lastName"
              name="lastName"
              placeholder="Doe"
            />
            { props.errors.firstName !== '' && <ErrorLabel>{ props.errors.firstName }</ErrorLabel>}
            <StyledLabel htmlFor="phoneNumber">Phone Number</StyledLabel>
            <Field
              as={StyledInput}
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter number"
              type="tel"
            />
            { props.errors.phoneNumber !== '' && <ErrorLabel>{ props.errors.phoneNumber }</ErrorLabel>}
            <StyledAddButton
              type="submit"
              disabled={props.values.firstName === '' || props.values.lastName === '' || 
                props.values.phoneNumber === '' || (props.errors.phoneNumber !== undefined && props.errors.phoneNumber !== '')
                || (props.errors.firstName !== undefined && props.errors.firstName !== '')}
            >
              Add Customer
            </StyledAddButton>
          </StyledForm>
        )
      }
      </Formik>
  );
};
