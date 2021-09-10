import * as React from "react";
import { render } from "../../utils/testUtils";
import { AddCustomerForm } from "./AddCustomerForm";

const customers = [{
  id: 1,
  firstName: "Test",
  lastName: "Tester",
  phoneNumber: "00000000",
}];

describe("<AddCustomerForm />", () => {
  it("should render a <AddCustomerForm />", () => {
    const wrapper = render(<AddCustomerForm customers={customers} saveCustomer={() => {}} />);
    expect(wrapper.container).toMatchSnapshot();
  });

  //@TODO Add tests for entering data and clicking submit
});
