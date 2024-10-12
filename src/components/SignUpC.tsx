import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axiosConfig';

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f7f7f7;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    color: #333;
`;

const Input = styled.input`
    width: 300px;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
`;

const Button = styled.button`
    width: 300px;
    padding: 10px;
    margin: 10px 0;
    background-color: #FF5733;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #e04e2a;
    }
`;

const Message = styled.p<{ isSuccess: boolean }>`
    color: ${({ isSuccess }) => (isSuccess ? 'green' : 'red')};
    margin-bottom: 10px;
`;

const LoginLink = styled(Link)`
    margin-top: 10px;
    color: #FF5733;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const API_URL = process.env.REACT_APP_API_URL;

const SignUpC: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [storeName, setStoreName] = useState<string>('');
    const [storeLocation, setStoreLocation] = useState<string>('');
    const [kioskNumber, setKioskNumber] = useState<string>('');
    const [role, setRole] = useState<string>('');  // New role state

    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSignUp = async () => {
        try {
            await axios.post(`${API_URL}/api/kk/kiosk/sign_up2`, {
                name: username,
                password,
                email,
                storeName,
                storeLocation,
                kioskNumber,
                role,
            });
            setMessage('Sign up successful');
            navigate('/login');
        } catch (err) {
            if (err instanceof Error) {
                console.error('Error details:', err.message);
                setMessage('Sign up failed');
            } else {
                console.error('Unexpected error:', err);
                setMessage('Sign up failed');
            }
        }
    };

    return (
        <SignUpContainer>
            <Title>회원가입</Title>
            {message && <Message isSuccess={message === 'Sign up successful'}>{message}</Message>}

            <Input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="text"
                placeholder="스토어 이름"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
            />
            <Input
                type="text"
                placeholder="스토어 위치"
                value={storeLocation}
                onChange={(e) => setStoreLocation(e.target.value)}
            />
            <Input
                type="text"
                placeholder="키오스크 번호"
                value={kioskNumber}
                onChange={(e) => setKioskNumber(e.target.value)}
            />
            <Input
                type="text"
                placeholder="역할 (admin - 0 /customer - 1)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            />

            <Button onClick={handleSignUp}>회원가입</Button>
            <LoginLink to="/login">로그인 페이지로 돌아가기</LoginLink>
        </SignUpContainer>
    );
};

export default SignUpC;
