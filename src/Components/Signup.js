/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import { auth, fs } from '../Config/Config'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'


export const Signup = () => {

    const history = useHistory();

    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(true);

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        setValidMatch(password === confirmPassword);
    }, [password, confirmPassword])


    useEffect(() => {
        setMatchFocus(!validMatch);
    }, [validMatch, confirmPassword])


    const handleSignup = (e) => {
        e.preventDefault();
        // console.log(fullName, email, password);
        auth.createUserWithEmailAndPassword(email, password).then((credentials) => {
            console.log(credentials);
            fs.collection('users').doc(credentials.user.uid).set({
                FullName: fullName,
                Email: email,
                Password: password
            }).then(() => {
                setSuccessMsg('Signup Successfull. You will now automatically get redirected to Login');
                setFullname('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(() => {
                    setSuccessMsg('');
                    history.push('/login');
                }, 3000)
            }).catch(error => setErrorMsg(error.message));
        }).catch((error) => {
            setErrorMsg(error.message)
        })

    }





    return (
        <div className='container'>

            <div className='header'>
                <h1>Sign Up</h1>
            </div>

            <hr></hr>
            {successMsg && <>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form className='form-group' autoComplete="off" onSubmit={handleSignup}>
                <label>Full Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setFullname(e.target.value)} value={fullName} placeholder='Full Name'></input>
                <br></br>
                <label>Email</label>
                <input type="email" className='form-control' required
                    onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email Address'></input>
                <br></br>
                <label>Password</label>
                <input type="password" className='form-control' required
                    onChange={(e) => setPassword(e.target.value)} value={password}
                    onFocus={() => setMatchFocus(false)}
                    placeholder='Password'
                ></input>
                <br></br>
                <label>Confirm Password</label>
                <input
                    type="password"
                    className='form-control' required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    aria-invalid={passwordMatch ? 'false' : 'true'}
                    aria-describedby="password-error"
                    placeholder='Confirm Password'
                ></input>
                <p id="confirmnote" className={setMatchFocus} style={{ color: "red" }}>
                    {!matchFocus ? '' : 'Passwords do not match'}
                </p>
                <br></br>
                <div className='btn-box'>
                    <span>Already have an account Login
                        <Link to="login" className='link'> Here</Link></span>

                    <button
                        type="submit"
                        className='btn btn-success btn-md'
                        disabled={!validMatch}
                    >SIGN UP</button>


                </div>
            </form>

            {errorMsg && <>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>
            </>}
        </div>
    )
}
