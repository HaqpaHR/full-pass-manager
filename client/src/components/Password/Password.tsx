import React, {useState} from 'react';
import {isVisible} from "@testing-library/user-event/dist/utils";

const Password = (pass: { password: string }) => {
    const [showPassword, setShowPassword] = useState(false);
    const {password} = pass


    return (
        <div onClick={() => setShowPassword((showPassword) => !showPassword)}>
            {!showPassword ? "****" : `${password}`}
        </div>
    );
};

export default Password;