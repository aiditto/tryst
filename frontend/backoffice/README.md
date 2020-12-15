# AIDITTO Backoffice Client Application

Backoffice Client application for AIDITTO is built with React.

## Installation

* Install NodeJS [NodeJS](https://nodejs.org/en/)
* Install git [Git](https://git-scm.com/downloads)
* git clone [https://github.com/aiditto/core](https://github.com/aiditto/core)
* Navigate to storefront directory `cd frontend/backoffice`
* `npm install`
* `npm start`

Application will be started at [http://localhost:3000](http://localhost:3000)


## Setup .env file
* In order to test the SSO locally, it is recommended to run the [loopback](https://github.com/aiditto/core/tree/master/backend/loopback) application locally.
* Create .env file in the root directory of backoffice folder.
* Add all the variables given inside [.env-tempalate](https://github.com/aiditto/core/blob/master/frontend/backoffice/.env-template) inside .env file with proper values.
* If you want to test client application with server backend then don't use localhost path inside the .env file as mentioned inside [.env-tempalate](https://github.com/aiditto/core/blob/master/frontend/backoffice/.env-template). 

**But it is recommended to run backend locally and test with client application running locally, otherwise you won't be able to test your client changes locally. Because after login with SSO you will be redirected to page with https://serverUrl/page and you wont be able to see your local changes.**

## Internationalisation

System texts support internationalisation through [react-i18next](https://react.i18next.com). It uses your browser’s locale settings, with English as the default fallback. Configure at `src/i18n.js`. Translations are added under `public/locales/`.

This integrates well with [Locize](https://locize.com/), but no integration is set up at the moment.

Usage example with the [useTranslation](https://react.i18next.com/latest/usetranslation-hook) hook:

```javascript
    import React from 'react';
    import { useTranslation } from 'react-i18next';

    export function MyComponent() {
      const { t, i18n } = useTranslation();
      // or const [t, i18n] = useTranslation();

      return <p>{t('contextScope.translationKey')}</p>
    }
```

If you need inline-linking in your translation values, this can be achieved by [the Trans component](https://react.i18next.com/latest/trans-component#using-with-react-components)

```javascript
    import React from 'react';
    import { Trans } from 'react-i18next';

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
