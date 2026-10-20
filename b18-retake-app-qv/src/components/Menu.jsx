/*
  INSTRUCTION:
  - Import useState and useEffect from "react"
  - Import the fetchMenu function from "../utils/api"
*/

import { useState, useEffect } from "react";
import { fetchMenu, fetchState } from "../utils/api";

function Menu() {
  /*
    INSTRUCTION:
    - Use useState to store the list of menu items returned by the API
    - Use useState to store the search term, the selected state and the
      selected course
    - Use useState to store the selected sort option, the current page number
      and the number of items per page
    - Use useState to store the total number of items and the total number of
      pages returned by the API
    - Use useState to store a loading flag and an error message

    - Use useEffect to fetch the menu from the back-end. The effect must run
      again whenever the search term, the selected state, the selected course,
      the sort option, the page number or the number of items per page changes.

    - Remember: this endpoint returns an object. The items are in the `data`
      property, the number of matching items is in the `total` property and
      the number of pages is in the `totalPages` property.

    - When the search term, a filter, the sort option or the number of items
      per page changes, go back to page 1.
  */

  const [menu, setMenu] = useState([]);
  const [search, setSearch] = useState("");
  const [states, setStates] = useState([]);
  const [state, setState] = useState([]);
  const [course, setCourse] = useState([]);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const menuItems = await fetchMenu({ search, state, course, sort });
        const stateItems = await fetchState();
        console.log(stateItems);
        console.log(menuItems);
        setMenu(menuItems.data);
        setStates(stateItems);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [search, state, course, sort, page, total]);

  return (
    <div className="menu">
      {/*
        INSTRUCTION:
        - Add these controls above the table:
            - a search box that lets the user search the menu. The search must
              be sent to the BACK-END, which matches the search term against
              the item name and the main ingredient.
            - a dropdown to filter by state, with an option for every state
              (Penang, Kuala Lumpur, Melaka, Perak, Kelantan, Sarawak) plus an
              "All states" option that clears the filter
            - a dropdown to filter by course, with an option for every course
              (Main, Dessert, Drink) plus an "All courses" option that clears
              the filter
            - a dropdown to sort the items, with three options:
                "None" (the default — no sorting is applied),
                "Name (A-Z)" which sends sort=name,
                "Price (cheapest first)" which sends sort=price
            - a dropdown that lets the user choose how many items are shown
              per page (5, 10 or 20). The default is 10.

        - Both filters must be able to be applied at the same time. Searching,
          filtering and sorting must all be performed by the BACK-END, not in
          the browser.

        - Display the items in a table. Each row must show:
            the name, the course, the state, the main ingredient,
            the calories and the price

        - Add pagination controls below the table so the user can move between
          pages. The page that is currently being viewed should be highlighted,
          and the controls must ask the BACK-END for each page.

        - Show a loading message while the data is being fetched
        - Show an error message if the API call fails
        - If no items are returned, display the message "No items found"

        - Refer to Figures 1 to 10 in the question paper
      */}
      <div className="page">
        <h1>Menu</h1>

        <div className="filters">
          <label>
            Search
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search menu "
            />
          </label>
          <label>
            State
            <select value={state} onChange={(e) => setState(e.target.value)}>
              <option value="">All Menu</option>
              {/* {
                console.log(menu)
              } */}
              {states.map((state, id) => (
                <option key={id} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
          <label>
            Course
            <select value={course} onChange={(e) => setCourse(e.target.value)}>
              <option value="">All Menu</option>
              {/* {
                console.log(menu)
              } */}
              {course.map((l) => (
                <option key={l.id} value={l.name}>
                  {l.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Sort By
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">None</option>
              {/* {
                console.log(menu)
              } */}
              <option value="">A-Z</option>
              <option value="">Z-A</option>
            </select>
          </label>
          <label>
            Per Pages
            <select
              value={totalPages}
              onChange={(e) => setTotalPages(e.target.value)}
            >
              <option value="">All Menu</option>
              {/* {
                console.log(menu)
              } */}
              {state.map((l) => (
                <option key={l.id} value={l.name}>
                  {l.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {loading && <p>Loading…</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && menu.length === 0 && <p>No menu found</p>}

        <table>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>State</th>
            <th>Main Ingredient</th>
            <th>Calories</th>
            <th>Price</th>
          </tr>
          {menu.map((i) => (
            <tr>
              <td>{i.name}</td>
              <td>{i.course}</td>
              <td>{i.state}</td>
              <td>{i.mainIngredient}</td>
              <td>{i.calories}</td>
              <td>{i.price}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Menu;
