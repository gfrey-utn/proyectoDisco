const favoriteRecords = ["A Night at the Opera", "Greatest Hits", "Greatest Hits II"];

function addFavorites(favorites) {
  const albums = document.querySelectorAll(".album");

  albums.forEach((album) => {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-star");
    icon.classList.add("absolute");
    icon.classList.add("bg-green-500");
    icon.classList.add("top-0");
    icon.classList.add("left-0");
    icon.classList.add("p-2");
    icon.classList.add("z-10");
    album.parentNode.appendChild(icon);
    album.parentElement.classList.add("favorite");
    album.parentElement.classList.add("relative");
    if (favorites.includes(album.alt)) {
        icon.style.color = "gold";
      //icon.classList.add("text-yellow-500");
    }
  });
}

addFavorites(favoriteRecords);

let iconos = document.querySelectorAll("a i")
for (let i = 0; i < iconos.length; i++) {
    iconos[i].addEventListener("click", function(event) {
        event.stopPropagation();
        event.preventDefault();
        let albumName = this.parentElement.querySelector("img").alt;
        if (this.style.color === "gold") {

            // Si está marcado, lo despinto y lo saco de favoritos
            this.style.color = "black";
            let index = favoriteRecords.indexOf(albumName);
            if (index > -1) {
                favoriteRecords.splice(index, 1);
            }
        } else {

            // Si no está marcado, lo pinto y lo guardo en favoritos
            this.style.color = "gold";
            favoriteRecords.push(albumName);
        }
        console.log(favoriteRecords);
    });
}