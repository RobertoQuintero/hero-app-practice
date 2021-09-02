import React from "react";
import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import AppRouter from "../../routers/AppRouter";

describe("Pruebas en <AppRouter />", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: { logged: false },
  };

  test("debe de mostrar login si no está autenticado", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    console.log(wrapper.html());
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de mostrar marvel si está autenticado", () => {
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        logged: true,
        name: "Roberto",
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper.find(".navbar").exists()).toBe(true);
  });
});
