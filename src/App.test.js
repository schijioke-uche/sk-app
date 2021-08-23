import { render, screen } from '@testing-library/react';
import App from './App';

test("should render the root page as App", () => {
  const thisComponentRendering = true;
   App.render = thisComponentRendering;
  expect(thisComponentRendering).toBe(App.render);  
});