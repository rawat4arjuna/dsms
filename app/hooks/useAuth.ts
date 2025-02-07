import { setLocalStorage } from "@/utils/localStorage";
import { useSnackbar } from "../(Components)/SnackBar/SnackBar";
import { loginService } from "../services/auth.service"
import { useRouter } from "next/navigation";

const useAuth = () => {
    const {showSnackbar} = useSnackbar()
    const router = useRouter()
  async function handleLogin({ email, password }:any) {
        const res = await loginService({email, password});
    
        if(res.token)
        {
            showSnackbar("Login Successfully","success")
            setLocalStorage("token",res.token)
            router.push("/dashboard")
        }else{
            showSnackbar(res.error || "Failed to login","error")
        }
    }

    return {handleLogin}
} 
export default useAuth