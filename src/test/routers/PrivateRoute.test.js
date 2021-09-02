import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import PrivateRoute from "../../routers/PrivateRoute";

describe("Probando <PrivateRouter />", () => {
  const props = {
    location: {
      pathname: "/marvel",
    },
  };
  Storage.prototype.setItem = jest.fn();

  test("debe de mostrar el componente si está autenticado y mostrar el localStorage", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <span>Listo!</span>}
          {...props}
        />
      </MemoryRouter>
    );
    expect(wrapper.find("span").exists()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");
  });

  test("debe de bloquear el componente si no está autenticado", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <span>Listo!</span>}
          {...props}
        />
      </MemoryRouter>
    );
    expect(wrapper.find("span").exists()).toBe(false);
  });
});
