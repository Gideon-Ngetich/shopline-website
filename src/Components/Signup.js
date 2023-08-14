import React,{useState} from 'react'
import {auth,fs} from '../Config/Config'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'


export const Signup = () => {

    const history = useHistory();

    const [fullName, setFullname]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMatch, setPasswordMatch] = useState(true);

    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    

   

    const handleSignup=(e)=>{
        e.preventDefault();
        // console.log(fullName, email, password);
        auth.createUserWithEmailAndPassword(email,password).then((credentials)=>{
            console.log(credentials);
            fs.collection('users').doc(credentials.user.uid).set({
                FullName: fullName,
                Email: email,
                Password: password
            }).then(()=>{
                setSuccessMsg('Signup Successfull. You will now automatically get redirected to Login');
                setFullname('');
                setEmail('');
                setPassword('');
                setErrorMsg('');
                setTimeout(()=>{
                    setSuccessMsg('');
                    history.push('/login');
                },3000)
            }).catch(error=>setErrorMsg(error.message));
        }).catch((error)=>{
            setErrorMsg(error.message)
        })

        if (password === confirmPassword) {
            // Passwords match, you can proceed with further actions here
            console.log('Passwords match');
            setPasswordMatch(true);
          } else {
            // Passwords do not match
            console.log('Passwords do not match');
            setPasswordMatch(false);
          }
    }
    
    return (
        <div className='container'>
            
            <div className='header'>
            <h1>Sign Up</h1>
            </div>
            
            <hr></hr>
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form className='form-group' autoComplete="off" onSubmit={handleSignup}>
                <label>Full Name</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setFullname(e.target.value)} value={fullName}></input>
                <br></br>
                <label>Email</label>
                <input type="email" className='form-control' required
                 onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                <br></br>
                <label>Password</label>
                <input type="password" className='form-control' required
                 onChange={(e)=>setPassword(e.target.value)} value={password}
                 style={{ outline: passwordMatch ? 'none' : '2px solid red' }}
                 ></input>
                 <br></br>
                <label>Confirm Password</label>
                <input type="password" className='form-control' required
                 onChange={(e)=> setConfirmPassword(e.target.value)} value={confirmPassword}
                 style={{ outline: passwordMatch ? 'none' : '2px solid red' }}
                 ></input>
                <br></br>
                <div className='btn-box'>
                    <span>Already have an account Login
                    <Link to="login" className='link'> Here</Link></span>
                    <button type="submit" className='btn btn-success btn-md'>SIGN UP</button>
                </div>
            </form>
            {passwordMatch ? null : (
          <p style={{ color: 'red' }}>Passwords do not match!</p>
        )}
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
            </>}
        </div>
    )
}
