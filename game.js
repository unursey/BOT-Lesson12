"use strict";

(() => {
  const FIGURES_ENG = ["rock", "scissors", "paper"];
  const FIGURES_RUS = ["камень", "ножницы", "бумага"];

  const TEXT_EN = {
    youWin: "You win",
    compWin: "Computer win",
    you: "You",
    comp: "Computer",
    gameOver: "Game Over",
    choose: "Сhoose",
    times: "times",
    draw: "Draw",
    again: "Again",
  };
  const TEXT_RU = {
    youWin: "Вы победили",
    compWin: "Компьютер победил",
    you: "Вы",
    comp: "Компьютер",
    gameOver: "Игра закончена",
    choose: "Выберите",
    times: "раз",
    draw: "Ничья",
    again: "Еще",
  };

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // const getFigure = (lang) => { зачем эта функция?
  // };

  const game = (language) => {
    const result = {
      player: 0,
      computer: 0,
    };

    const lang =
      language === "EN" || language === "ENG" ? FIGURES_ENG : FIGURES_RUS;
    const dict = language === "EN" || language === "ENG" ? TEXT_EN : TEXT_RU;

    const findAnswer = (arr, n) => {
      for (let i = 0; i < arr.length; ++i) {
        if (arr[i].indexOf(n) == 0) {
          return arr[i];
        }
      }
      return false;
    };

    const gameResult = () => {
      alert(`${dict.youWin}: ${result.player} ${dict.times}.
${dict.compWin}: ${result.computer} ${dict.times}.`);
    };

    return function start() {
      const computerChoise = lang[getRandomIntInclusive(0, 2)];
      console.log(`${dict.comp}:`, computerChoise);

      const answer = prompt(`${dict.choose}: "${lang.join('", "')}" ?`);

      if (answer === null) {
        if (confirm(`${dict.gameOver}.`)) {
          gameResult();
          return;
        }
      }

      const userChoise = findAnswer(lang, answer.toLowerCase());
      if (answer && userChoise) {
        console.log(`${dict.you}:`, userChoise);
        if (userChoise === computerChoise) {
          alert(`${dict.comp}: ${computerChoise}
${dict.you}: ${userChoise}

${dict.draw}!`);
        } else if (
          (computerChoise === lang[0] && userChoise === lang[2]) ||
          (computerChoise === lang[1] && userChoise === lang[0]) ||
          (computerChoise === lang[2] && userChoise === lang[1])
        ) {
          result.player++;
          alert(`${dict.comp}: ${computerChoise}.
${dict.you}: ${userChoise}.

${dict.youWin}!`);
          console.log(result.player);
        } else if (
          (computerChoise === lang[0] && userChoise === lang[1]) ||
          (computerChoise === lang[1] && userChoise === lang[2]) ||
          (computerChoise === lang[2] && userChoise === lang[0])
        ) {
          result.computer++;
          alert(`${dict.comp}: ${computerChoise}.
${dict.you}: ${userChoise}.

${dict.compWin}!`);
        } else {
          return;
        }

        if (!confirm(`${dict.again}?`)) {
          gameResult();
          return;
        }
      }
      return start();
    };
  };

  window.RPS = game;
})();
