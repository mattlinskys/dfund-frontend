import React from "react";
import config from "app/dappConfig";
import theme from "app/theme";
import { DAppProvider } from "@usedapp/core";
import { ChakraProvider } from "@chakra-ui/react";
import ProfileProvider from "providers/ProfileProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";
import messagesEn from "lang/en.json";
import { HOME_PATH, PROJECT_PATH } from "constants/routes";

import Home from "pages/Home";
import Project from "pages/Project";

import ProfileDialogProvider from "providers/ProfileDialogProvider";
import WalletDialogProvider from "providers/WalletDialogProvider";
import WrongChainDialogProvider from "providers/WrongChainDialogProvider";

const App = () => (
  <IntlProvider locale="en" messages={messagesEn}>
    <BrowserRouter>
      <DAppProvider config={config}>
        <ChakraProvider theme={theme}>
          <ProfileProvider>
            <Routes>
              <Route path={HOME_PATH} element={<Home />} />
              <Route path={PROJECT_PATH} element={<Project />} />
            </Routes>

            <WalletDialogProvider />
            <ProfileDialogProvider />
            <WrongChainDialogProvider />
          </ProfileProvider>
        </ChakraProvider>
      </DAppProvider>
    </BrowserRouter>
  </IntlProvider>
);

export default App;
