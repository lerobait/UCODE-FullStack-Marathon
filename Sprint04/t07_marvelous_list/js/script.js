document.addEventListener("DOMContentLoaded", (event) => {
  const films = {
    "Black Panther (2018)": {
      title: "Black Panther",
      date: "February 14, 2018",
      actors: [
        "Chadwick Boseman",
        "Letitia Wright",
        "Michael B. Jordan",
        "Danai Gurira",
      ],
      info: `The leaders of the kingdom of Wakanda - 
            Shuri, Queen Ramonda, M'Baku and others - 
            are doing their best to protect their land. 
            After the sudden death of King T'Challa, 
            almost the whole world decided to intervene in the internal 
            affairs of Wakanda. Wakandans want to write a new page in 
            the history of their country on their own.`,
      image: "assets/images/Black-panther.jpg",
    },
    "Spider-Man: Across the Spider-Verse": {
      title: "Spider-Man: Across the Spider-Verse",
      date: "June 2, 2023",
      actors: [
        "Shameik Moore",
        "Hailee Steinfeld",
        "Brian Tyree Henry",
        "Luna Lauren Velez",
      ],
      info: `Miles Morales catapults across the multiverse, 
            where he encounters a team of Spider-People charged 
            with protecting its very existence. When the heroes clash 
            on how to handle a new threat, Miles must redefine what it means to be a hero.`,
      image: "assets/images/Spider-man.jpg",
    },
    "Guardians of the Galaxy Vol. 3": {
      title: "Guardians of the Galaxy Vol. 3",
      date: "May 5, 2023",
      actors: ["Chris Pratt", "Chukwudi Iwuji", "Vin Diesel", "Dave Bautista"],
      info: `Still reeling from the loss of Gamora, Peter Quill rallies his team 
            to defend the universe and one of their own - a mission that 
            could mean the end of the Guardians if not successful.`,
      image: "assets/images/Guardians-of-the-galaxy.jpg",
    },
  };

  const updateFilmInfo = (filmName) => {
    const film = films[filmName];
    if (!film) return;

    const titleElement = document.querySelector(".film .title h1");
    const dateElement = document.querySelector(".film .title span");
    const actorsElement = document.querySelector(".film .actors");
    const infoElement = document.querySelector(".film .info span");
    const imageElement = document.querySelector(".film .film-image img");

    titleElement.textContent = film.title;
    dateElement.textContent = film.date;
    actorsElement.innerHTML = film.actors
      .map((actor) => `<span>${actor}</span>`)
      .join("");
    infoElement.textContent = film.info;
    imageElement.src = film.image;
  };

  const buttons = document.querySelectorAll(".left-section button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => updateFilmInfo(button.textContent));
  });
});
