import Logo from '/home/fakher/CODI/SHRC/front/src/images/SHRC_Logo_2colors.png'
import style from '../../App.module.css'
import SessionContext from '../../components/session/SessionContext';
import { useContext, useState } from 'react';
const Login = () => {


    const {
        actions: { login }
    } = useContext(SessionContext);

    const [state, setValue] = useState({
        username: '',
        password: ''
    });

    const { username, password } = state;

    function setState(nextState) {
        setValue(prevState => ({
            ...prevState,
            ...nextState
        }))
    }

    function handleChange(e) {
        let { name, value } = e.target;
        setState({ [name]: value });
    }

    async function handleSubmit(e) {
        e.nativeEvent.preventDefault();
        login(state);
    }


    return (

        
            <body>
                <header>
                    <center className={style.headerFA}>
                        <img className={style.logoFA} src={Logo} />
                    </center>
                </header>

<section className={style.backgroudFA} >
 <form className={style.formloginFA} onSubmit={handleSubmit}>

                    <h5 style={{ marginLeft:'14%', display: 'inline-block', color:'#4671A2' }}>Welcome to SHRC System</h5>

                    
                            <input className={style.inputFA} onChange={handleChange} name='username' value={username} type="text" placeholder=" username" required />
                        

                            <input className={style.inputFA}  onChange={handleChange} name='password' value={password} type="password" placeholder=" Password " required />

                      
                            <label name='msg'></label>
                       
                            <input className={style.btnFA} type="submit" value="Login" />
                       
                    </form>

                </section>
            </body>
    );
}

export default Login;