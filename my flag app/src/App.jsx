import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage, { allCountryLoader } from './HomePage';
import CountryPage, { countryDetailLoader } from './CountryPage';
import { ThemeProvider } from './ThemeContext'; // Import ThemeProvider from ThemeContext.jsx
import RootElement from './RootElement';

const myRoutes = createRoutesFromElements(
  <Route path="/" element={<RootElement />}>
    <Route index element={<HomePage />} loader={allCountryLoader} />
    <Route path="country/:countryCode" element={<CountryPage />} loader={countryDetailLoader} />
  </Route>
);

const router = createBrowserRouter(myRoutes);

const App = () => (
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);

export default App;
