import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/SignUp';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/users/login" element={<Login />} />
                <Route path="/sign_up" element={<SignUp />} />
                <Route path="/home" element={<PrivateRoute component={<Home />} />} />
                <Route path="*" element={<Navigate to="/users/login" />} />
            </Routes>
        </AuthProvider>
    );
};

const PrivateRoute: React.FC<{ component: JSX.Element }> = ({ component }) => {
    const authContext = useContext(AuthContext);
    return authContext?.isAuthenticated ? component : <Navigate to="/users/login" />;
};

export default App;
