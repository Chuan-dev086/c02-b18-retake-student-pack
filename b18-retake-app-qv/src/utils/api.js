/*
  INSTRUCTION:
  - Create a constant API_URL that holds the base URL of the back-end.
    The Express server in the b18-retake-api folder runs on http://localhost:5123

  - Create a function fetchMenu that calls GET /menu.
    It must be able to send an optional `search`, an optional `state`, an
    optional `course` and an optional `sort` parameter ("name" or "price"),
    together with a `page` parameter and a `limit` parameter. Any of them can
    be sent at the same time.
    Remember: this endpoint returns an OBJECT, not an array. The items are in
    the `data` property, and `totalPages` tells you how many pages there are.

  - Export the function so the Menu component can import it.

  Use the native fetch() function. Refer to the README.md file inside the
  b18-retake-api folder for the full API documentation.
*/

const BASE_URL = "http://localhost:5123";

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  // console.log(await res.json());
  return res.json();
}

export function fetchMenu({ search, state, course, sort, page, limit } = {}) {
  const params = new URLSearchParams();
  if (sort) params.append("sort", sort);
  if (search) params.append("search", search);
  if (course) params.append("course", course);
  if (state) params.append("state", state);
  if (page) params.append("page", page);
  if (limit) params.append("limit", limit);
  const qs = params.toString();
  return request(`/menu${qs ? `?${qs}` : ""}`);
}

export function fetchState() {
  return request("/states");
}
