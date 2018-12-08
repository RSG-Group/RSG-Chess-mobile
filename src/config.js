// RSG Chess mobile
// by RSG Group

export const colorPalettes = {
  default: {
    name: "RSG Chess standard",
    background: "rgb(240, 220, 180)",
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
    background: "rgb(255, 234, 248)",
    props: {
      whiteCells: "rgb(255, 215, 215)",
      blackCells: "rgb(230, 110, 110)",
      validBG: "rgb(70, 0, 165)",
      selectedBG: "rgb(185, 75, 0)",
      selectedColor: "rgb(135, 255, 235)"
    }
  },
  gray: {
    name: "Grayscale",
    background: "rgb(255, 255, 255)",
    props: {
      whiteCells: "rgb(255, 255, 255)",
      blackCells: "rgb(100, 100, 100)",
      validBG: "rgb(205, 205, 205)",
      selectedBG: "rgb(5, 5, 5)",
      selectedColor: "rgb(250, 250, 250)"
    }
  },
  cyan: {
    name: "Cyan",
    background: "rgb(235, 255, 255)",
    props: {
      whiteCells: "rgb(200, 225, 225)",
      blackCells: "rgb(8,164,167)",
      validBG: "rgb(250, 200, 200)",
      selectedBG: "rgb(80, 0, 40)",
      selectedColor: "rgb(135, 255, 210)"
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
    en: "Choose game mode",
    bg: "Изберете начин за игра",
    ru: "Выберите игровой режим"
  },
  playAgainstAI: {
    en: "Play versus AI",
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
    en: "Start singleplayer",
    bg: "Започнете singleplayer",
    ru: "Пуск singleplayer"
  },
  singleplayerDescription: {
    en: "Start singleplayer or game versus friend:",
    bg: "Започнете singleplayer или игра срещу приятел:",
    ru: "Пуск singleplayer:"
  },
  hardModeWarning: {
    en:
      'Warning: The AI may require longer time to make its turn on the "hard" level!',
    bg:
      "Внимание: AI алгоритъма може да се нуждае от повече време, за да направи ход, ако изберете най-трудното ниво!",
    ru:
      "Предупреждение: алгоритму AI может потребоваться больше времени, чтобы сделать ход, если вы выберете самый сложный уровень!"
  },
  placeOnTheSurface: {
    en: "Place your device horizontally on the surface and",
    bg: "Поставете устройството си на плоска повърхност и",
    ru: "Поместите устройство горизонтально на поверхность и"
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
    en:
      "Set your preferences which will be kept even after you restart the app",
    bg:
      "Задайте предпочитанията си, които ще се запаметят дори след рестартиране",
    ru:
      "Задайте настройки, которые будут сохранены даже после перезапуска приложения"
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
    en: "Rotate the black figures",
    bg: "Завъртете черните фигури",
    ru: "Поверните черные фигуры"
  },
  rotateBlackPiecesLabel: {
    en:
      "Rotate the pieces for better experience, especially if you're two players on the device.",
    bg:
      "Завъртете фигурите за по-добър ефект, особено ако двама играчи играете на това устройство!",
    ru:
      "Поверните шахматные фигуры для лучшего опыта, особенно если вы два игрока на устройстве."
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
    en:
      "Choose a language.\nAll game modals, dialogues and texts will be displayed on that language.",
    bg:
      "Изберете език.\nВсички надписи в играта ще бъдат показвани на този език.",
    ru: "Выберите язык.\nВсе титры в игре будут отображаться на этом языке."
  },
  invalidMove: {
    en: "Invalid move...",
    bg: "Невалиден ход...",
    ru: "Неверный ход ..."
  },
  AIPromoted: {
    en: "The AI promoted one of his pawns!",
    bg: "Противникът произведе една от пешките си!",
    ru: "Противник произвел одну из своих пешек!"
  },
  AIThinking: {
    en: "Plеase wait while our AI is thinking...",
    bg: "Моля изчакайте докато противника ви мисли...",
    ru: "Подождите, пока ваш оппонент не подумает..."
  },
  about: {
    initial: {
      en:
        "RSG Chess is an open-source chess game which is appropriate for any age. The app is verified by Google Play Protect, labeled as PEGI 3 and distributed under the Apache 2.0 License. \n\nThe game can be fun in many aspects. You can play versus friends on your own device or vs AI in two levels - Easy or Medium... and all this - offline! New AI levels, multy-player mode, leaderboards and more will be rolled out in future releases. RSG Chess also has extra features for better experience. One of them are the custom color palettes - way to customize the chessboard with the colors you prefer! Go to the settings and see them in action! Also if you're using bigger device you can place it on the surface, rotate the black pieces from the settings and fell like you're on real chess board.",
      ru:
        "RSG Chess - это игра с открытым исходным кодом, которая подходит для любого возраста. Приложение проверено в Google Play Protect, обозначенное как PEGI 3, и распространяется под лицензией Apache 2.0. \n\nИгра может быть интересной во многих аспектах. Вы можете играть против друзей на своем собственном устройстве или против AI на двух уровнях - Easy или Medium ... и все это - офлайн! В будущих выпусках будут развернуты новые уровни AI, многопользовательский режим, списки лидеров и многое другое. RSG Chess также имеет дополнительные возможности для лучшего опыта. Одна из них - пользовательские цветовые палитры - способ настройки шахматной доски с цветами, которые вы предпочитаете! Перейдите в настройки и увидите их в действии! Также, если вы используете большее устройство, вы можете разместить его на поверхности, повернуть черные фигуры из настроек и упасть, как на реальной шахматной доске.",
      bg:
        'RSG Chess е open-source шах игра, която е подходяща за всички възрастови групи. Проложението е проверено от Google Play Protect и лицензирано под Apache 2.0 лиценза. \n\nИграта е забавна по всяко време! Може да играете срещу вашите приятели на това устройство (single-player) или срещу нашия AI алгоритъм в две нива на трудност. RSG Chess също поддържа функция за завъртане на черните фигури за "преживяване като на истинска шах дъска". Всички тези начини за игра НЕ изискват връзка с интернет и могат да се използват офлайн. Цветовите палитри са нруга функция, която ви позволява да персонализирате шах дъската с цветовете, които харесвате. \n\nСъщо така повече AI нива, мултиплейър и др., може да очаквате в бъдещи версии.'
    },
    label: {
      en: "About",
      bg: "За нас",
      ru: "О нас"
    }
  },
  privacy: {
    en: "Privacy Policy",
    bg: "Поверителност",
    ru: "Конфиденциальность"
  },
  gameOptions: {
    en: "Game options",
    bg: "Опции за игра",
    ru: "Игровые настройки"
  },
  aboutRSGChess: {
    en: "About RSG Chess",
    bg: "За RSG Chess",
    ru: "Для RSG Chess"
  },
  sessionOnlyLabel: {
    en:
      "These settings are session-only. If you restart the app they won't be saved!",
    bg: "Тези настройки няма да бъдат запазени ако рестартирате приложението!",
    ru: "Если вы перезапустите приложение, эти настройки не будут сохранены!"
  },
  fastAction: {
    en: "fast actions",
    bg: "бързи действия",
    ru: "быстрые действия"
  },
  play: {
    en: "Play",
    bg: "Играй",
    ru: "Играть"
  },
  pieces: {
    rook: {
      en: "rook",
      bg: "топ",
      ru: "ладья"
    },
    queen: {
      en: "queen",
      bg: "царица",
      ru: "Ферзь"
    },
    knight: {
      en: "knight",
      bg: "кон",
      ru: "Конь"
    },
    bishop: {
      en: "bishop",
      bg: "офицер",
      ru: "слон"
    }
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
    },
    gray: {
      en: "grayscale",
      bg: "черно-бяло",
      ru: "серый"
    },
    cyan: {
      en: "cyan",
      bg: "синьо-зелен",
      ru: "циан"
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

export const globalStyles = {
  drawerItemLabel: {
    margin: 12,
    marginLeft: 20,
    fontSize: 19,
    fontWeight: "bold",
    color: "black"
  }
};

// The app is translated and written by Radi Cho
// RSG Chess - by RSG Group
