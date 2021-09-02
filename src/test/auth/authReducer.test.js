import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

const user = {
  name: "Roberto",
  logged: false,
};
const actionLogin = {
  type: types.login,
  payload: { name: "Roberto" },
};

const actionLogout = {
  type: types.logout,
};

describe("Pruebas en authReducer", () => {
  test("debe de retornar el estado por defecto", () => {
    const state = authReducer(user, {});
    expect(state).toEqual(user);
  });

  test("debe de autenticar y colocar el name del usuario", () => {
    const state = authReducer(user, actionLogin);
    expect(state.name).toBe(actionLogin.payload.name);
    expect(state.logged).toBe(true);
  });

  test("debe de borrar el name del usuario y logged en false", () => {
    const state = authReducer(user, actionLogout);
    expect(state).toEqual({ logged: false });
  });
});
