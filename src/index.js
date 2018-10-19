import React from 'react';
import { unstable_createRoot } from 'react-dom';
import Root from './Root';
import * as serviceWorker from './serviceWorker';

unstable_createRoot(document.getElementById('root')).render(<Root />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
