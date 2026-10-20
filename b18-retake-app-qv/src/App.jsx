import "./App.css";

/*
  INSTRUCTION:
  - Import the Menu component from "./components/Menu"
*/

import Menu from "./components/Menu";
function App() {
  /*
    INSTRUCTION:
    - Add a header at the top of the page with the name of the app
      (Makan Trail) and a short description of it
    - Render the Menu component below the header
    - Refer to Figure 1 in the question paper for the expected layout
  */

  return (
    <div className="app">
      <Menu />
      {/* Your header and the Menu component go here */}
    </div>
  );
}

export default App;
