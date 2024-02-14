document.addEventListener("DOMContentLoaded", () => {
    const itemList = document.getElementById("item-container"); // Cambiamos a 'item-container'
    const template = document.getElementById("list-template");

    document.querySelector(".btn.btn-primary").addEventListener("click", event => {
        fetch("https://rickandmortyapi.com/api/character/")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(response => {
                response.results.forEach((element, index) => {
                    const clone = template.content.cloneNode(true);
                    clone.querySelector("[data-id='number']").textContent = `${index + 1}`;
                    clone.querySelector("[data-id='title']").textContent = element.name;
                    clone.querySelector("[data-id='especie']").textContent = element.species;
                    clone.querySelector("[data-id='image']").src = element.image;
                    clone.querySelector("[data-id='gender']").textContent = element.gender;
                    clone.querySelector("[data-id='status']").textContent = element.status;

                    itemList.appendChild(clone);
                });
            })
            .catch(error => {
                console.error('Error fetching characters:', error);
            });
    });

    document.querySelector(".btn.btn-light").addEventListener("click", event => {
        itemList.innerHTML = ""; // Vaciamos el contenido del contenedor
    });
});