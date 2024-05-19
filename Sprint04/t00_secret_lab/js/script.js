const transformation = () => {
  const lab = document.getElementById("lab");
  const hero = document.getElementById("hero");

  if (hero.innerText === "Bruce Banner") {
    lab.style.background = "#70964b";
    hero.innerText = "Hulk";
    hero.style.fontSize = "130px";
    hero.style.letterSpacing = "6px";
  } else {
    lab.style.background = "#ffb300";
    hero.innerText = "Bruce Banner";
    hero.style.fontSize = "60px";
    hero.style.letterSpacing = "2px";
  }
};
