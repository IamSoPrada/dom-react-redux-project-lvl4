const ru = {
  translation: {
    channels: {
      title: 'Каналы',
      buttons: {
        rename: 'Переименовать',
        delete: 'Удалить',
      },
    },

    chat: {
      messages_one: '{{ count }} сообщение',
      messages_few: '{{ count }} сообщения',
      messages_many: '{{ count }} сообщений',
      placeholder: 'Введите сообщение...',
    },

    forms: {
      login: {
        label: 'Ваш ник',
        placeholder: 'Логин',
      },
      username: {
        label: 'Имя пользователя',
        placeholder: 'Логин',
        validation: {
          minLength: 'От 3 до 20 символов',
          maxLength: 'Макс. длина никнейма 20!',
        },
      },
      password: {
        label: 'Пароль',
        placeholder: 'Пароль',
        validation: {
          minLength: 'Не менее 6 символов',
          maxLength: 'Макс. длина пароля 50!',
        },
      },
      passwordConfirmation: {
        label: 'Подтвердите пароль',
        placeholder: 'Подтвердите пароль',
        validation: {
          match: 'Пароли должны совпадать',
        },
      },
      channel: {
        label: 'Название',
        placeholder: 'Название',
      },
      message: {
        label: 'Текст сообщения',
        placeholder: 'Введите сообщение...',
      },
      validation: {
        required: 'Обязательное поле',
      },
      errors: {
        duplicateUser: 'Такой пользователь уже существует',
        login: 'Неверные имя пользователя или пароль',
      },
    },

    header: {
      logo: 'Hexlet Chat',
      button: 'Выйти',
    },

    login: {
      header: 'Войти',
      button: 'Войти',
      noAccount: 'Нет аккаунта?',
      signup: 'Регистрация',
    },

    signup: {
      header: 'Регистрация',
      login: 'Войти',
      gotAnAccount: 'Есть аккаунт?',
      button: 'Зарегистрироваться',
    },

    modals: {
      add: {
        header: 'Добавить канал',
      },
      rename: {
        header: 'Переименовать канал',
      },
      remove: {
        header: 'Удалить канал',
        confirm: 'Вы уверены?',
      },
      errors: {
        uniqueName: 'Название должно быть уникальным!',
      },
      validation: {
        minLength: 'Мин. длина названия 2!',
        maxLength: 'Макс. длина 18!',
        required: 'Придумайте название.',
      },
    },
    dropdown: {
      menu: 'Управление каналом',
    },
    toastify: {
      channels: {
        add: 'Канал создан',
        rename: 'Канал переименован',
        delete: 'Канал удален',
      },
    },
    404: {
      header: '404.',
      description: 'Такой страницы не существует',
      button: 'Вернуться',
    },

    common: {
      cancel: 'Отменить',
      send: 'Отправить',
      delete: 'Удалить',
      loading: 'Загрузка...',
      error: 'Что-то пошло не так :(',
      success: 'Успешно',
    },

    errors: {
      network: 'Ошибка сети. Попробуйте еще раз',
    },
  },
};
export default ru;
