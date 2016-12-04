import { renderComponent , expect } from '../test_helper';
import Header from '../../src/components/header';

describe('Header' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(Header);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });
  it("has same class as component", () => {
    expect(component).to.have.class('Header');
  })
  it("has Authorize Button Rendered", () => {
    expect(component.find(".authButton")).to.exist;
  })
});
