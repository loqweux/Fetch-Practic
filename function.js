import { API_KEY, player, container } from "./vars.js";

export const fetchVideos = (query) => {
  fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${query}&type=video`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length > 0) {
        const videoId = data.items[0].id.videoId;
        updatePlayer(videoId);
        updatePictures(data.items);
      } else {
        console.log("Видео не найдено.");
      }
    })
    .catch((error) => console.error("Ошибка при выполнении запроса: ", error));
};

export const updatePlayer = (videoId) => {
  player.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
};

export const updatePictures = (items) => {
  container.innerHTML = "";
  items.forEach((item) => {
    const pic = document.createElement("img");
    pic.src = item.snippet.thumbnails.default.url;
    pic.alt = item.snippet.title;
    pic.classList.add("pic");
    pic.addEventListener("click", () => updatePlayer(item.id.videoId));
    container.append(pic);
  });
};
