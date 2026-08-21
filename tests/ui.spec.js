import { test } from '../src/helpers/fixtures/index';
import { expect } from '@playwright/test';
import {UserBuilder,EditArticleBuilder,ArticleBuilder,EditUserBuilder} from '../src/helpers/builders';

test.describe('Авторизация', () => {
  let testUser;
  let testArticle;
  let EditArt;
  let testEditUser;

  // Предусловие
  test.beforeEach(async ({ app }) => {
    //создаем объект юзера
    testUser = new UserBuilder().withEmail().withPassword().withUsername().build();
    //генерируем поля для статьи
    testArticle = new ArticleBuilder().ArTitle().ArticleAbout().YourArticle().Entertags().build();

    //генерируем поле для редактирования статьи
    EditArt = new EditArticleBuilder().EdArticle().build();
    //генерируем поле для редактирования пользователя
    testEditUser = new EditUserBuilder().EdUser().build();

    //  Переходим на сайт и регистрируемся
    await app.main.goto();
    await app.main.gotoRegister();
    await app.register.signup(testUser);
  });

    // тест 1 - Создание новой статьи

    test('Авторизованный пользователь может создать статью', async ({ app }) => {
    //1.Создание статьи
    await app.NewArticle.clickNewArticle();
    await app.NewArticle.newArticlewrite(testArticle);

    // Ожидаемый результат
    await expect(app.newPostArticle.getTitleArt()).toContainText(testArticle.title);
    await expect(app.newPostArticle.getArticleBody()).toContainText(testArticle.body);
    await expect(app.newPostArticle.getArticleTag()).toContainText(testArticle.tags);

    await app.newComment.myAllArticle();
    await expect(app.newPostArticle.getPreviewAbout()).toContainText(testArticle.about);
    });

     //тест 2 - Поставить лайк новой статье
    test('Авторизованный пользователь может поставить лайк к созданным статьям', async ({app}) => {


    //1.Создание статьи
    await app.NewArticle.clickNewArticle();
    await app.NewArticle.newArticlewrite(testArticle);
    await expect(app.newPostArticle.getTitleArt()).toContainText(testArticle.title);
    await expect(app.newPostArticle.getArticleBody()).toContainText(testArticle.body);
    await expect(app.newPostArticle.getArticleTag()).toContainText(testArticle.tags);

    //2.Перейти ко всем статьям
    await app.newComment.myAllArticle();
    //3.Поставить лайк статье
    await app.newLike.addLike();

    // Ожидаемый результат
    await expect(app.newLike.GetLike()).not.toContainText('0');
    });

    //тест 3 - редактирование статьи
    test('Авторизованный пользователь может редактировать статью', async ({app}) => {

    //1.Создание статьи
    await app.NewArticle.clickNewArticle();
    await app.NewArticle.newArticlewrite(testArticle);
    await expect(app.newPostArticle.getTitleArt()).toContainText(testArticle.title);
    await expect(app.newPostArticle.getArticleBody()).toContainText(testArticle.body);
    await expect(app.newPostArticle.getArticleTag()).toContainText(testArticle.tags);

    //2.Редактирование статьи
    await app.newComment.myAllArticle();
    await app.editArticle.EditArticle(EditArt);

    // Ожидаемый результат
    await expect(app.editArticle.GetArticleE(EditArt.EditArticle)).toContainText(EditArt.EditArticle);
    });

    // тест 4 - Автоизованный пользователь может редактировать свои данные
    test('Пользователь может редактировать свои данные ', async ({ app }) => {

      //1.редактирование карточки пользователя
      await app.editUser.EditSettings(testEditUser.EditUser);

      // Ожидаемый результат
      await expect(app.editUser.GetBio()).toContainText(testEditUser.EditUser);
    });

    // тест 5 - Получение ошибки при регистрации с существующим email
    test('Получение ошибки при регистрации с существующим email', async ({app}) => {
    // 1.Выход пользователя
    await app.main.gotologout();

    // 2.Регистрация пользователя
    await app.main.gotoRegister();
    await app.register.signup(testUser);

    // Ожидаемый результат
    await expect(app.main.getError()).toContainText('Email already exists.. try logging in');
    });

    // тест 6 - Получение ошибки при авторизации с неверным паролем
    test('Получение ошибки при авторизации с неверным паролем', async ({app}) => {
    const newPas = new UserBuilder().withPassword().build();
    // 1.Выход пользователя
    await app.main.gotologout();

    // 2.Авторизация пользователя
    await app.main.gotoAuthorization();
    await app.authorization.login({email: testUser.email, password: newPas.password});

    // Ожидаемый результат
    await expect(app.main.getError()).toContainText('Wrong email/password combination');
    });
});
