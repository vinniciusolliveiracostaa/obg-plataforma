import React from 'react';
import { RegisterForm } from "./.components/ui/register-form"

const RegisterPage: React.FC = () => {
    return (
        <div className='h-full w-full flex justify-center items-center bg-muted'>
            <RegisterForm/>
        </div>
    );
};

export default RegisterPage;