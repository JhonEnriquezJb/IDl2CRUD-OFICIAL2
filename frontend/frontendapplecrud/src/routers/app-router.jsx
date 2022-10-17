import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
  } from 'react-router-dom';
  
  import { Form } from '../components/form';
  import { Clients } from '../components/clients';
  
  export const AppRouter = () => {
  
    return (
      <>
        <Router>
          <Routes>
  
            <Route
              path="/"
              element={
                <Clients />
              }
            />
            <Route
              path="/form"
              element={
                <Form />
              }
            />
  
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
  
          </Routes>
        </Router>
      </>
    )
  }
  

  