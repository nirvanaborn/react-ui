import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { message } from "antd";
import { Helmet } from "react-helmet";
import "./App.less";
import routes from "./routes";
import AppHOC from "./components/HOC/AppHOC";
import LayoutComponent from "./components/Layout";
import axios from "axios";
import { baseURL } from "./api";
const App = ({ history }) => {
  const [userInfo, setUserInfo] = useState({});
  const [refresh, setRefresh] = useState(false);
  const getUserInfo = (account) => {
    axios({
      baseURL,
      url: "/users/getOneInfo",
      method: "get",
      params: {
        account,
      },
    })
      .then((res) => {
        if (res.data.code !== 200) {
          message.error(res.data.msg);
        } else {
          setUserInfo(res.data.info);
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getUserInfo(localStorage.getItem("account"));
  }, [refresh]);
  useEffect(() => {
    if (!localStorage.getItem("account")) {
      history.push("/login");
    }
  }, []);

  const routeList = [];
  const parseRouteList = (list) => {
    list.forEach((routeItem, routeIdx) => {
      let _component = ({ history }) => {
        if (routeItem.isNeedLayout) {
          return (
            <LayoutComponent history={history} userInfo={userInfo}>
              <Helmet>
                <title>{routeItem.title}</title>
              </Helmet>
              <routeItem.component
                history={history}
                userInfo={userInfo}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </LayoutComponent>
          );
        }
        return (
          <>
            <Helmet>
              <title>{routeItem.title}</title>
            </Helmet>
            <routeItem.component history={history} />
          </>
        );
      };
      routeList.push(
        <Route
          key={`${routeItem.name}_${routeIdx}`}
          exact={routeItem.exact}
          path={routeItem.path}
          component={withRouter(_component)}
        />
      );
      if (routeItem.children && routeItem.children.length) {
        parseRouteList(routeItem.children);
      }
    });
    return routeList;
  };
  return (
    <div className="App">
      <Switch>
        {parseRouteList(routes)}
        <Redirect from="/*" to="/" />
      </Switch>
    </div>
  );
};

export default AppHOC(withRouter(App));
