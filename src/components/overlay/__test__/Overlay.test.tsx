import ReactDOM from "react-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Overlay from "../Overlay";

it("Overlay renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Overlay />, div);
});