import React from 'react';
import {LoginForm} from "./.components/ui/login-form";

const SignInPage: React.FC = () => {
    return (
        <div className='h-full w-full flex justify-center items-center bg-muted'>
            <LoginForm/>
        </div>
    );
};

export default SignInPage;