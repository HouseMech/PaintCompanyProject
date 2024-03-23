import { createStore } from 'vuex'
import sessionManager from './modules/session_manager.js';

export default createStore({
  modules: { sessionManager },
})
