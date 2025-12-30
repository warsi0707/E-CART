import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import store from './redux/store/store.js'
import {Toaster} from 'react-hot-toast'
import OauthProvider from './utils/OauthProvider.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode> \
    <>
    <OauthProvider>
    <Provider store={store}>
      <Toaster position='bottom-right'/>
      <App />
    </Provider>
    </OauthProvider>
    </>
  //  </StrictMode>
)
