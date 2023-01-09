import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import type { ConfigureStoreOptions } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import type { AppStore } from "../redux/store";
import { setupStore } from "../redux/store";

import { PropsWithChildren } from "react";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: ConfigureStoreOptions["preloadedState"];
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
