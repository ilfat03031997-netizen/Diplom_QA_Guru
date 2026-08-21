import {
  AuthorizationPage,
  EditArticlePage,
  EditUserPage,
  LikeArticlePage,
  MainPage,
  newArticlePage,
  AllArticlePage,
  PostArticlePage,
  RegisterPage
} from './index';

//Фасад

export class App {
  constructor(page) {
    this.page = page,
    this.main = new MainPage(page);
    this.register = new RegisterPage(page);
    this.authorization = new AuthorizationPage(page);
    this.editUser = new EditUserPage(page);
    this.NewArticle = new newArticlePage(page);
    this.newPostArticle = new PostArticlePage(page);
    this.allArticle = new AllArticlePage(page);
    this.newLike = new LikeArticlePage(page);
    this.editArticle = new EditArticlePage(page);
  }
}
