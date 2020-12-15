# AIDITTO tryst Client Application

Tryst client application for AIDITTO is built with React. The AIDITTO tryst component was formerly known as the public storefront.

## Installation

- Install NodeJS [NodeJS](https://nodejs.org/en/)
- Install git [Git](https://git-scm.com/downloads)
- git clone [https://github.com/aiditto/core](https://github.com/aiditto/core)
- Navigate to storefront directory `cd frontend/storefront`
- `npm install`
- `npm start`
  if you want to run the project with another port than 3000, you can set it using set port=4000(for windows) in package.json under script start

Application will be started at [http://localhost:3000](http://localhost:3000)

## Internationalisation

System texts support internationalisation through [react-i18next](https://react.i18next.com). It uses your browser’s locale settings, with English as the default fallback. Configure at `src/i18n.js`. Translations are added under `public/locales/`.

This integrates well with [Locize](https://locize.com/), but no integration is set up at the moment.

Usage example with the [useTranslation](https://react.i18next.com/latest/usetranslation-hook) hook:

```javascript
import React from "react";
import { useTranslation } from "react-i18next";

export function MyComponent() {
  const { t, i18n } = useTranslation();
  // or const [t, i18n] = useTranslation();

  return <p>{t("contextScope.translationKey")}</p>;
}
```

If you need inline-linking in your translation values, this can be achieved by [the Trans component](https://react.i18next.com/latest/trans-component#using-with-react-components)

```javascript
import React from "react";
import { Trans } from "react-i18next";

export function MyComponent() {
  return (
    <Trans i18nKey="acceptTerms">
      <a href="#terms"></a>
    </Trans>
  );
}

// in your translation json:
// "acceptTerms": "I agree to <0>the terms and conditions</0>"
```
