import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import MessageBoardPage from "./pages/MessageBoard";
import APage from "./pages/A";
import BPage from "./pages/B";
import CPage from "./pages/C";
//eslint-disable-next-line
export default [
  {
    name: "home",
    title: "首页",
    path: "/",
    exact: true,
    isNeedLayout: true,
    component: HomePage,
  },
  {
    name: "login",
    title: "登录",
    path: "/login",
    exact: true,
    isNeedLayout: false,
    component: LoginPage,
  },
  {
    name: "register",
    title: "注册",
    path: "/register",
    exact: true,
    isNeedLayout: false,
    component: RegisterPage,
  },
  {
    name: "messageBoard",
    title: "留言板",
    path: "/messageBoard",
    exact: true,
    isNeedLayout: true,
    component: MessageBoardPage,
  },
  {
    name: "a",
    title: "A页面",
    path: "/a",
    exact: true,
    isNeedLayout: true,
    component: APage,
  },
  {
    name: "b",
    title: "B页面",
    path: "/b",
    exact: true,
    isNeedLayout: true,
    component: BPage,
  },
  {
    name: "c",
    title: "C页面",
    path: "/c",
    exact: true,
    isNeedLayout: true,
    component: CPage,
  },
];
