/*!

=========================================================
* AIDITTO App
=========================================================

*/
import "assets/scss/material-ui-react.scss?v=1.8.0";
import Topbar from "components/Topbars/Topbar";
import Footer from "components/Footer/Footer";
import { createBrowserHistory } from "history";
import React, { Suspense, useEffect } from "react";
import thunk from "redux-thunk";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./store/reducers/rootReducer";
import LandingPage from "layouts/home/LandingPage";
import ChannelPage from "layouts/channel/ChannelPage";
import DemandPage from "layouts/demand/DemandPage";
import FallbackPage from "layouts/FallbackPage";
import ErrorPage from "views/Pages/ErrorPage";
import NotificationContainer from "components/Notification/NotificationContainer";
import { LanguageProvider } from "./shared/contexts/language";
import "./i18n";
import * as actions from "store/actions/rootAction";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import "./style.css";

const hist = createBrowserHistory();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const App = () => {
  useEffect(() => {
    store.dispatch(actions.getSweCities());
  }, []);

  const fontFamily = '"Montserrat", "Arial", sans-serif';

  // TODO Move to separate file
  const theme = createMuiTheme({
    typography: {
      // Don't set this value; let the browser (user) decide, for better scaling/accessibility
      // https://material-ui.com/customization/typography/#font-size
      // htmlFontSize: 16, // browser default: 1rem = 16px

      fontFamily: fontFamily,

      // Material UI default
      // TODO Increase to 16? Would fuck all current em/rem values up, so they need to be decreased
      fontSize: 14,

      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 800,

      h1: {
        fontSize: "2.5em !important",
        fontWeight: 600,
        marginBottom: "0.5em"
      },
      h2: {
        fontSize: "1.0em !important",
        fontWeight: 600,
        marginBottom: "0.3em"
      },
      h3: {},
      h4: {},
      h5: {},
      h6: {},
      subtitle1: {},
      subtitle2: {},

      body1: {},
      body2: {},
      caption: {},

      button: {}
    },

    shape: {
      borderRadius: "1em"
    },

    overrides: {
      primary: "red"
    }
  });

  return (
    <Suspense fallback="loading">
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          <Provider store={store}>
            <Router history={hist}>
              <Topbar />
              <NotificationContainer />
              <Switch>
                <Route exact path="/:identifier/:identifier/:identifier" component={DemandPage} />
                <Route exact path="/:identifier/:identifier" component={ChannelPage} />
                <Route exact path="/:identifier" component={LandingPage} />
                <Route exact path="/" component={FallbackPage} />
                <Route component={ErrorPage} />
              </Switch>
              <Footer />
            </Router>
          </Provider>
        </LanguageProvider>
      </ThemeProvider>
    </Suspense>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
