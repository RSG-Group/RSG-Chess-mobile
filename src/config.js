// RSG Chess mobile
// by RSG Group

export const colorPalettes = {
  default: {
    name: "RSG Chess standard",
    background: "rgb(240, 220, 180)",
    bar: "rgb(255, 120, 45)",
    props: {
      whiteCells: "rgb(255, 205, 160)",
      blackCells: "rgb(210, 140, 70)",
      validBG: "red",
      selectedBG: "brown",
      selectedColor: "lightblue"
    }
  },
  blue: {
    name: "Light blue ocean",
    background: "rgb(220, 255, 245)",
    bar: "rgb(110, 130, 180)",
    props: {
      whiteCells: "rgb(225, 225, 225)",
      blackCells: "rgb(110, 130, 180)",
      validBG: "rgb(255, 100, 45)",
      selectedBG: "rgb(155, 0, 0)",
      selectedColor: "lightgreen"
    }
  },
  green: {
    name: "Chess.com green",
    background: "rgb(235, 255, 205)",
    bar: "rgb(120, 150, 85)",
    props: {
      whiteCells: "rgb(240, 240, 210)",
      blackCells: "rgb(120, 150, 85)",
      validBG: "rgb(255, 253, 158)",
      selectedBG: "rgb(70, 0, 165)",
      selectedColor: "rgb(255, 255, 155)"
    }
  },
  sweet: {
    name: "Sweety",
    background: "rgb(255, 245, 225)",
    bar: "rgb(230, 110, 110)",
    props: {
      whiteCells: "rgb(255, 215, 215)",
      blackCells: "rgb(230, 110, 110)",
      validBG: "rgb(70, 0, 165)",
      selectedBG: "rgb(185, 75, 0)",
      selectedColor: "rgb(135, 255, 235)"
    }
  }
};

export const possiblePalettes = () => {
  const palettesArray = [];
  let key;
  for (key in colorPalettes) {
    palettesArray.push({ label: colorPalettes[key].name, value: key });
  }

  return palettesArray;
};

export const strings = {
  welcomeTitle: {
    en: "Welcome",
    bg: "Добре дошли",
    ru: "Добро пожаловать!"
  },
  selectMode: {
    en: "Select game mode:",
    bg: "Изберете начин за игра:",
    ru: "Выберите игровой режим:"
  },
  playAgainstAI: {
    en: "Play versus AI computer",
    bg: "Игра срещу AI",
    ru: "Игра против AI"
  },
  easy: {
    en: "Easy",
    bg: "Лесно",
    ru: "Легко"
  },
  medium: {
    en: "Medium",
    bg: "Средно",
    ru: "Средний"
  },
  hard: {
    en: "Hard",
    bg: "Трудно",
    ru: "Жесткий"
  },
  or: {
    en: "or",
    bg: "или",
    ru: "или"
  },
  singleplayer: {
    en: "start singleplayer",
    bg: "започнете singleplayer",
    ru: "пуск singleplayer"
  },
  placeOnTheSurface: {
    en: "Place your device horizontally on the surface and",
    bg: "Поставете устройството си на плоска повърхност и",
    ru: "Поместите устройство горизонтально на поверхность и"
  },
  clickToRotate: {
    en: "click here to rotate",
    bg: "цъкнете тук за да завъртите",
    ru: "нажмите здесь, чтобы повернуть"
  },
  back: {
    en: "back",
    bg: "обратно",
    ru: "обратно"
  },
  realBoardExperience: {
    en: "the black figures - for real board experience",
    bg: "черните фигури - за преживяване, като на истинска шах дъска",
    ru: "черные фигуры - за преживяване, като на истинска шах дъска"
  },
  letStart: {
    en: "Let's start singleplayer!",
    bg: "Нека започнем със singleplayer",
    ru: "Давайте начнем singleplayer!"
  },
  settings: {
    en: "Settings",
    bg: "Настройки",
    ru: "Настройки"
  },
  newGame: {
    en: "New Game",
    bg: "Нова игра",
    ru: "Новая игра"
  },
  startGameAndSelectMode: {
    en: "(Start a new game first and then select game mode)",
    bg:
      '(Започнете нова игра, а после изберете начин за игра от "welcome меню"-то)',
    ru: "(Сначала запустите новую игру, затем выберите игровой режим)"
  },
  showValidMoves: {
    en: "Show the valid moves on the board",
    bg: "Показване на валидните ходове върху дъската",
    ru: "Показать действительные ходы на доске"
  },
  selectPalette: {
    en: "Choose one of our chessboard color palettes",
    bg: "Изберете цветова палитра за шах дъската",
    ru: "Выберите цветовую палитру:"
  },
  colorPalettes: {
    en: "Color palettes",
    bg: "Цветови палитри",
    ru: "Цветовую палитру"
  },
  personalize: {
    en: "personalize",
    bg: "персонализиране",
    ru: "предпочтения"
  },
  personalizeSettingsLabel: {
    en: "Set your preferences which will be kept even after you restart the app",
    bg: "Задайте предпочитанията си, които ще се запаметят дори след рестартиране",
    ru: "Задайте настройки, которые будут сохранены даже после перезапуска приложения"
  },
  checkOutPalettes: {
    en:
      "Check out all color palettes to select the best one for you on our website!",
    bg: "Разгледайте всички цветови палитри от RSG Chess на нашия уебсайт!",
    ru:
      "Посмотрите все цветовые палитры, чтобы выбрать лучший для вас на нашем сайте!"
  },
  lang: {
    en: "Language",
    bg: "Език",
    ru: "Язык"
  },
  okaySettings: {
    en: "Okay",
    bg: "Готово",
    ru: "Готовый"
  },
  okayNative: {
    en: "Okay",
    bg: "Добре",
    ru: "Хорошо"
  },
  cancel: {
    en: "Cancel",
    bg: "Отказ",
    ru: "Отмена"
  },
  rotateBlackPiecesSetting: {
    en:
      "Rotate the black figures (or restore the rotation) for real board experience.",
    bg:
      'Завъртете черните фигури (или ги върнете обратно) - за "преживяване като на истинска шах дъска"!',
    ru: "Поверните черные фигуры (или восстановите вращение)."
  },
  gameOver: {
    en: "The game is over",
    bg: "Играта свърши",
    ru: "Игра окончена"
  },
  takeLook: {
    en: "TAKE A LOOK",
    bg: "ПОКАЖИ",
    ru: "ПОКАЖИТЕ МЭ"
  },
  sourceCode: {
    en: "Source code",
    ru: "Source код",
    bg: "Source код"
  },
  license: {
    en: "License",
    bg: "Лиценз",
    ru: "Лицензия"
  },
  contactUs: {
    en: "or contact us: ",
    bg: "или се свържете с нас: ",
    ru: "или свяжитесь с нами: "
  },
  reportProblem: {
    en: "Report a problem ",
    bg: "Съобщете за проблем ",
    ru: "Сообщить о проблеме "
  },
  learnToPlay: {
    en: "Learn how to play chess here",
    bg: "Научете как да играете шах",
    ru: "Узнайте, как играть в шахматы здесь"
  },
  promotePawn: {
    en: "Select a piece to promote to: ",
    bg: "Изберете фигура, в която да превърнете пешката",
    ru: "Выберите форму, чтобы превратить пешку"
  },
  close: {
    en: "Close",
    bg: "Затвори",
    ru: "Закрыть"
  },
  hideThis: {
    en: "Hide this",
    bg: "Скрий това",
    ru: "Скрыть это"
  },
  checkmate: {
    en: "Checkmate!",
    bg: "Шах и мат!",
    ru: "Шах и мат!"
  },
  stalemate: {
    en: "Stalemate",
    bg: "Пат",
    ru: "Пат"
  },
  draw: {
    en: "Draw",
    bg: "Равенство",
    ru: "Безвыходное положение"
  },
  whiteWon: {
    en: "The white player won!",
    bg: "Белият играч победи!",
    ru: "Победил белый игрок!"
  },
  blackWon: {
    en: "The black player won!",
    bg: "Черният играч победи!",
    ru: "Победил черный игрок!"
  },
  chooseLang: {
    en: "Choose a language.\nAll game modals, dialogues and texts will be displayed on that language.",
    bg: "Изберете език.\nВсички надписи в играта ще бъдат показвани на този език.",
    ru: "Выберите язык.\nВсе титры в игре будут отображаться на этом языке."
  },
  palettes: {
    default: {
      en: "default",
      bg: "основен",
      ru: "умолчанию"
    },
    blue: {
      en: "blue",
      bg: "синьо",
      ru: "синий"
    },
    green: {
      en: "green",
      bg: "зелено",
      ru: "зеленый"
    },
    sweet: {
      en: "sweety",
      bg: "сладко",
      ru: "сладкий розовый"
    }
  },
  languages: {
    en: {
      en: "English",
      bg: "Bulgarian",
      ru: "Russian"
    },
    bg: {
      en: "Английски",
      bg: "Български",
      ru: "Руски"
    },
    ru: {
      en: "Aнглийский",
      bg: "Болгарский",
      ru: "Русский"
    },
    native: {
      en: "English",
      bg: "Български",
      ru: "Руский"
    }
  }
};

// The app is translated and written by Radi Cho
// RSG Chess - by RSG Group
