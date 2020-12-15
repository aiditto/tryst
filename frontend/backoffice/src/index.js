/*!

=========================================================
* AIDITTO App
=========================================================

*/
import Navbar from "components/Navbars/Navbar";
import { createBrowserHistory } from "history";
import React, { Suspense } from "react";
import thunk from "redux-thunk";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./store/reducers/rootReducer";
import LandingPage from "layouts/home/LandingPage";
import AuthRoute from "components/AuthRoute";
import ErrorPage from "views/Pages/ErrorPage";
import NotificationContainer from "components/Notification/NotificationContainer";
import Sites from "layouts/sites/Sites";
import CreateSite from "layouts/createSite/CreateSitePage";
import { LanguageProvider } from "./shared/contexts/language";
import "./i18n";
import Interceptor from "layouts/Interceptor";
import "./style.css";
import SitePage from "layouts/sites/SitePage";
import DemandPage from "layouts/demands/DemandPage";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import UserInvite from "layouts/users/UserInvite";
import ChannelPage from "layouts/channels/ChannelPage";

const hist = createBrowserHistory({ basename: "/bo" });
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const App = () => {
  const theme = createMuiTheme({
    body: {
      fontFamily: '"Montserrat", "Arial", sans-serif',
      fontWeight: "300",
      lineHeight: "1.5em"
    },
    palette: {
      primary: {
        main: "#272F41"
      },
      secondary: {
        main: "#70CE95"
      },

      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2
    },
    typography: {
      fontFamily: '"Montserrat", "Arial", sans-serif',
      h1: {
        fontSize: "2em !important",
        fontWeight: 600
      },
      h2: {
        fontSize: "1.5em !important",
        fontWeight: 600,
        marginBottom: "0.3em",
        wordWrap: "break-word"
      },
      h3: {
        fontSize: "1.17em !important",
        fontWeight: 600
      },
      h4: {
        fontSize: "1em !important",
        fontWeight: 600
      },
      h5: {
        fontSize: "0.83em !important",
        fontWeight: 600
      },
      button: {
        fontSize: "1.1em !important",
        fontWeight: 600
      },
      body1: {
        fontSize: "1em !important",
        fontWeight: 600
      },
      body2: {
        fontSize: "1em !important",
        fontWeight: 600
      }
    }
  });

  return (
    <Suspense fallback="loading">
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          <Provider store={store}>
            <Router history={hist}>
              <Navbar />

              <div className="root-app">
                <NotificationContainer />

                <Switch>
                  <Route exact path="/" component={LandingPage} />
                  <Route exact path="/interceptor" component={Interceptor} />
                  <AuthRoute path="/sites/:identifier/update-site" component={CreateSite} />
                  <AuthRoute path="/sites/:identifier" component={SitePage} />
                  <AuthRoute path="/users" component={UserInvite} />
                  <AuthRoute path="/sites" component={Sites} />
                  <AuthRoute path="/create-site" component={CreateSite} />
                  <AuthRoute path="/channels/:identifier" component={ChannelPage} />
                  <AuthRoute path="/demands/:identifier" component={DemandPage} />
                  <Route component={ErrorPage} />
                </Switch>
              </div>
            </Router>
          </Provider>
        </LanguageProvider>
      </ThemeProvider>
    </Suspense>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
