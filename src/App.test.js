import App from "./App";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => shallow(<App />);

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

test("counter display starts at 0", () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test("clicking button increments counter display", () => {
  const wrapper = setup();
  //find the button
  const button = findByTestAttr(wrapper, "increment-button");
  //click the button
  button.simulate("click");
  //find the display, and test that the number has been incremented
  const count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});

test("Decrement Button", () => {
  const wrapper = setup();
  findByTestAttr(wrapper, "increment-button").simulate("click");
  findByTestAttr(wrapper, "increment-button").simulate("click");
  let count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("2");
  const DecButton = findByTestAttr(wrapper, "decrement-button");
  DecButton.simulate("click");
  count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("1");
});

test("Don't count below zero", () => {
  const wrapper = setup();
  findByTestAttr(wrapper, "decrement-button").simulate("click");
  let count = findByTestAttr(wrapper, "count").text();
  expect(count).toBe("0");
});

test("Error not showed by default", () => {
  const wrapper = setup();
  let errorMessage = findByTestAttr(wrapper, "error-display");
  expect(errorMessage.exists()).toBe(false);
});

test("Error displayed when try to get below 0", () => {
  const wrapper = setup();
  //counter is 0 and click decrement button to force error
  findByTestAttr(wrapper, "decrement-button").simulate("click");
  let errorMessage = findByTestAttr(wrapper, "error-display");
  expect(errorMessage.exists()).toBe(true);
});

test("Error message dissapear when push increment button",() => {
  const wrapper = setup();
  findByTestAttr(wrapper, "decrement-button").simulate("click");
  findByTestAttr(wrapper, "increment-button").simulate("click");
  let errorMessage = findByTestAttr(wrapper, "error-display");
  expect(errorMessage.exists()).toBe(false);
})