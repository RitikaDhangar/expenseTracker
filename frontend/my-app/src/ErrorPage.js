import Button from "react-bootstrap/esm/Button"
import { useNavigate } from "react-router-dom"

const ErrorPage = () => {
    const navigate = useNavigate();
    const backPageHandler = () => {
        navigate('/');
    }
    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',alignContent:'center',height:'70dvh'}}>
            <h2 >This page does not exist</h2>
            <Button style={{marginTop:'40px'}} onClick={backPageHandler} >Home page</Button>
        </div>
    )
}
export default ErrorPage