import { provideStoreDevtools } from "@ngrx/store-devtools";

export const environment = {
  production: false,
  API_Base: 'https://reqres.in',
  imports: [provideStoreDevtools({ maxAge: 25 })],
};
