import * as React from "react";
import { render } from  "../utils/testUtils";
import Home from "./Home";

describe("<Home />", () => {
  it("should render a <Home />", () => {
    const wrapper = render(<Home />);
    expect(wrapper.container).toMatchSnapshot();
  });

});
