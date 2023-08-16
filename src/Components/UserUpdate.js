import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const UserUpdate = () => {
    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const user = firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION || firebase.auth.Auth.Persistence.LOCAL || firebase.auth.Auth.Persistence.NONE );
        if (user) {
            setFullname(user.displayName || '');
            setEmail(user.email || '');
        }
    }, []);

    const handleUpdateProfile = async () => {
        try {
            const user = firebase.auth().currentUser;
            if (user) {
                await user.updateProfile({
                    displayName: fullName
                });
                await user.updateEmail(email);
                await user.updatePassword(password);

                setSuccessMsg('User profile updated successfully');

                console.log('User profile updated successfully');
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
        }

        const userRef = firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid);

        try {
            await userRef.update({
                FullName: fullName,
                Email: email,
                Password: password,
            });
            setSuccessMsg('User profile updated successfully');
            console.log('User profile updated successfully');
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    }

    return (
        <div className="container container-update">
            <div className='header'>
                <h1>Update Profile</h1>
            </div>
            <hr></hr>
            {errorMsg && <p className='errorMsg' 
            style={{
                color: 'red',
                fontSize: '20px',
                fontWeight: 'bold',
                marginTop: '50px',
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: '#f0d0d3',
                textAlign: 'center',
                width: '50%'
                
            }}
            >{errorMsg}</p>}
            {successMsg && <p className='successMsg'
            style={{
                color: 'green',
                fontSize: '20px',
                fontWeight: 'bold',
                marginTop: '50px',
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: 'lightgreen',
                textAlign: 'center',
                width: '50%'
            }}
            >{successMsg}</p>}
            <form className='form-group'>
                <label htmlFor='fullName'>Full Name</label>
                <input
                    className='form-control'
                    type='text'
                    name='fullName'
                    value={fullName}
                    placeholder='Enter your full name'
                    onChange={(e) => setFullname(e.target.value)}
                />
                <br></br>
                <label htmlFor='email'>Email</label>
                <input
                    className='form-control'
                    type='email'
                    name='email'
                    value={email}
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br></br>
                <label htmlFor='password'>Password</label>
                <input
                    className='form-control'
                    type='password'
                    name='password'
                    value={password}
                    placeholder='Enter your password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br></br>
                <div className='btn-box' style={{marginBottom: '30px'}}>
                    <button className='btn btn-success btn-md' type='button' onClick={handleUpdateProfile}>
                        Update Profile
                    </button>
                </div>
                
            </form>
            <div><Link className='navlink' to="/" style={{
                    color: 'black',
                    textDecoration: 'none',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    marginTop: '50px',
                    marginBottom: '20px',
                    paddingnTop: '20px'

                }} >Back</Link></div>
        </div>
    )
}          