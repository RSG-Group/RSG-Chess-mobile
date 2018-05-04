export const colorPalettes = [
  {
    id: 1,
    name: 'RSG Chess standard',
    background: 'rgb(240, 220, 180)',
    props: {
      whiteCells: 'rgb(255, 205, 160)',
      blackCells: 'rgb(210, 140, 70)',
      validBG: 'red',
      selectedBG: 'brown',
      selectedColor: 'lightblue'
    }
  },
  {
    id: 2,
    name: 'Light blue ocean',
    background: 'rgb(220, 255, 245)',
    props: {
      whiteCells: 'rgb(225, 225, 225)',
      blackCells: 'rgb(110, 130, 180)',
      validBG: 'rgb(255, 100, 45)',
      selectedBG: 'rgb(155, 0, 0)',
      selectedColor: 'lightgreen'
    }
  },
  {
    id: 3,
    name: 'Chess.com green',
    background: 'rgb(235, 255, 205)',
    props: {
      whiteCells: 'rgb(240, 240, 210)',
      blackCells: 'rgb(120, 150, 85)',
      validBG: 'rgb(255, 253, 158)',
      selectedBG: 'rgb(70, 0, 165)',
      selectedColor: 'rgb(255, 255, 155)'
    }
  },
  {
    id: 4,
    name: 'Sweety',
    background: 'rgb(255, 245, 225)',
    props: {
      whiteCells: 'rgb(255, 215, 215)',
      blackCells: 'rgb(230, 110, 110)',
      validBG: 'rgb(70, 0, 165)',
      selectedBG: 'rgb(185, 75, 0)',
      selectedColor: 'rgb(135, 255, 235)'
    }
  }
]

export const strings = {
  welcomeTitle: {
    en: 'Welcome',
    bg: 'Добре дошли',
    ru: 'Добро пожаловать!'
  },
  selectMode: {
    en: 'Select game mode:',
    bg: 'Изберете начин за игра:',
    ru: 'Выберите игровой режим:'
  },
  playAgainstAI: {
    en: 'Play versus AI computer',
    bg: 'Игра срещу AI',
    ru: 'Игра против AI'
  },
  easy: {
    en: 'Easy',
    bg: 'Лесно',
    ru: 'Легко'
  },
  medium: {
    en: 'Medium',
    bg: 'Средно',
    ru: 'Средний'
  },
  hard: {
    en: 'Hard',
    bg: 'Трудно',
    ru: 'Жесткий'
  },
  or: {
    en: 'or',
    bg: 'или',
    ru: 'или'
  },
  singleplayer: {
    en: 'start singleplayer',
    bg: 'започнете singleplayer',
    ru: 'пуск singleplayer'
  },
  placeOnTheSurface: {
    en: 'Place your device horizontally on the surface and',
    bg: 'Поставете устройството си на плоска повърхност и',
    ru: 'Поместите устройство горизонтально на поверхность и'
  },
  clickToRotate: {
    en: 'click here to rotate',
    bg: 'цъкнете тук за да завъртите',
    ru: 'нажмите здесь, чтобы повернуть'
  },
  back: {
    en: 'back',
    bg: 'обратно',
    ru: 'обратно'
  },
  realBoardExperience: {
    en: 'the black figures - for real board experience',
    bg: 'черните фигури - за преживяване, като на истинска шах дъска',
    ru: 'черные фигуры - за преживяване, като на истинска шах дъска'
  },
  letStart: {
    en: 'Let\'s start singleplayer!',
    bg: 'Нека започнем със singleplayer',
    ru: 'Давайте начнем singleplayer!'
  },
  settings: {
    en: 'Settings',
    bg: 'Настройки',
    ru: 'Настройки'
  },
  newGame: {
    en: 'New Game',
    bg: 'Нова игра',
    ru: 'Новая игра'
  },
  startGameAndSelectMode: {
    en: '(Start a new game first and then select game mode)',
    bg: '(Започнете нова игра, а после изберете начин за игра от "welcome меню"-то)',
    ru: '(Сначала запустите новую игру, затем выберите игровой режим)'
  },
  showValidMoves: {
    en: 'Show the valid moves on the board',
    bg: 'Показване на валидните ходове върху дъската',
    ru: 'Показать действительные ходы на доске'
  },
  selectPalette: {
    en: 'Choose a color palette:',
    bg: 'Изберете цветова палитра:',
    ru: 'Выберите цветовую палитру:'
  },
  checkOutPalettes: {
    en: 'Check out all color palettes to select the best one for you on our website!',
    bg: 'Разгледайте всички цветови палитри от RSG Chess на нашия уебсайт!',
    ru: 'Посмотрите все цветовые палитры, чтобы выбрать лучший для вас на нашем сайте!'
  },
  selectLang: {
    en: 'Select a language: ',
    bg: 'Изберете език: ',
    ru: 'Выберите язык: '
  },
  rotateBlackPiecesSetting: {
    en: 'Rotate the black figures (or restore the rotation) for real board experience.',
    bg: 'Завъртете черните фигури (или ги върнете обратно) - за "преживяване като на истинска шах дъска"!',
    ru: 'Поверните черные фигуры (или восстановите вращение).'
  },
  sourceCode: {
    en: 'Source code',
    ru: 'Source код',
    bg: 'Source код'
  },
  license: {
    en: 'License',
    bg: 'Лиценз',
    ru: 'Лицензия'
  },
  contactUs: {
    en: 'or contact us: ',
    bg: 'или се свържете с нас: ',
    ru: 'или свяжитесь с нами: '
  },
  reportProblem: {
    en: 'Report a problem ',
    bg: 'Съобщете за проблем ',
    ru: 'Сообщить о проблеме '
  },
  learnToPlay: {
    en: 'Learn how to play chess here',
    bg: 'Научете как да играете шах',
    ru: 'Узнайте, как играть в шахматы здесь'
  },
  promotePawn: {
    en: 'Select a piece to promote to: ',
    bg: 'Изберете фигура, в която да превърнете пешката',
    ru: 'Выберите форму, чтобы превратить пешку'
  },
  languages: {
    en: {
      en: 'English',
      bg: 'Bulgarian',
      ru: 'Russian'
    },
    bg: {
      en: 'Английски',
      bg: 'Български',
      ru: 'Руски'
    },
    ru: {
      en: 'Aнглийский',
      bg: 'Болгарский',
      ru: 'Русский'
    }
  }
}
