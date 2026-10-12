const API_URL = import.meta.env.VITE_API_BASE_URL;


const Login=()=>{
    const login=(e:)=>{
    }

return(
    <div>
<label htmlFor="email">מייל</label>
<input type="email"   />
<label htmlFor="password">סיסמה</label>
<input type="password"  />
<button onSubmit={login}>שליחה</button>
    </div>
)
}
export default Login