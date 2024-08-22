import { searchForm, searchInput } from "./vars.js";
import { fetchVideos } from "./function.js";

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = searchInput.value;
  if (query) {
    fetchVideos(query);
  }
});
