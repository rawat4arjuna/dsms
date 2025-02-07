import { loginService } from "../services/auth.service"

const useAuth = () => {
    function handleLogin({ email, password }:any) {
        const res = loginService({email, password});
    }

    return {handleLogin}
} 
export default useAuth