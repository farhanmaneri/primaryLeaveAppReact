import Home from '../component/home/Home';
import { Counter } from '../features/counter/counter'
import { Routes as AppRoutes, Route } from "react-router-dom";

const Routes = ()=>{
    return(
       <AppRoutes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/counter' element={<Counter/>} ></Route>
       </AppRoutes> 
    )
}
export default Routes;


