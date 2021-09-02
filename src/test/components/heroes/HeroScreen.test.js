import React from "react";
import { mount } from "enzyme";
import HeroScreen from "../../../components/heroes/HeroScreen";
import { MemoryRouter, Route } from "react-router-dom";

describe("Pruebas en <HeroScreen />", () => {
  const history = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  };

  test("debe mostrar el componente redirect si no hay argumento en el URL", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <HeroScreen history={history} />
      </MemoryRouter>
    );
    expect(wrapper.find("Redirect").exists()).toBe(true);
  });

  test("debe de mostrar un heroe  si el parametro existe", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route path="/hero/:heroId" component={HeroScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find(".row").exists()).toBe(true);
  });

  test("comprobar ruta en parametros", () => {
    const history = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route
          path="/hero/:heroId"
          component={(props) => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").prop("onClick")();

    expect(history.push).toHaveBeenCalledWith("/");
    expect(history.goBack).not.toHaveBeenCalled();
  });

  test("debe de regresar a la pantalla anterior GOBACK", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route
          path="/hero/:heroId"
          component={(props) => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").prop("onClick")();

    expect(history.goBack).toHaveBeenCalledTimes(1);
    expect(history.push).not.toHaveBeenCalled();
  });

  test("debe de llamar el Redirect si el heroe no existe", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-322323"]}>
        <Route
          path="/hero/:heroId"
          component={(props) => <HeroScreen history={history} />}
        />
      </MemoryRouter>
    );

    // console.log(wrapper);
    expect(wrapper).toMatchSnapshot();
    // expect(wrapper.find("Redirect").exists()).toBe(true);
    expect(wrapper.text()).toBe("");
  });
});
