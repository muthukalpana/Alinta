import styled from "styled-components";
import { ScreenSize } from "../../enum/screenSize";

export const StyledCustomer = styled.div`
  box-sizing: border-box;
  @media (min-width: ${ ScreenSize.Mobile }) {
    flex: 0 0 90%;
  }
  @media (min-width: ${ ScreenSize.Tablet }) {
    flex: 0 0 46%;
  }
  @media (min-width: ${ ScreenSize.Laptop }) {
    flex: 0 0 30%;
  }
  @media (max-width > ${ ScreenSize.Desktop }) {
    flex: 0 0 20%;
  }
  border: 1px solid #ccc;
  margin: 1rem;
  padding: 1rem;
`;

export const StyledCustomerName = styled.h2`
  margin: 0 0 0.5rem;
  padding: 0;
`;

export const StyledCustomerInfo = styled.p`
  margin: 0 0 0.5rem;
  padding: 0;
`;

export const StyledCustomerDelete = styled.button`
  padding: 1rem;
  background-color: #dc1616;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
`;
