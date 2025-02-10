import { createBrowserRouter } from 'react-router-dom';
import MainLayouts from '../layouts/MainLayouts';
import Error from '../pages/ErrorPage/Error';
import Home from '../pages/Home/Home';
import CrimeFeed from '../pages/CrimeFeed/CrimeFeed';
import ReportCrime from '../pages/ReportCrime/ReportCrime';
import CrimeDetail from '../pages/CrimeDetail/CrimeDetail';
import UserProfile from '../pages/Profile/UserProfile';
import Login from '../pages/Auth/Login';
import SignUP from '../pages/Auth/SignUP';

export const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayouts />,
        errorElement: <Error />,
        children:[
            {
                path:'/',
                element:<Home />,
            },{
                path:'/crime-feed',
                element: <CrimeFeed />
            },{
                path: '/report-a-crime',
                element: <ReportCrime />,
            },{
                path:'/crime-detail',
                element: <CrimeDetail />,
            },{
                path: '/user-profile',
                element: <UserProfile />
            },{
                path: '/login',
                element: <Login />
            },{
                path: '/signup',
                element: <SignUP />
            }
        ]
    }
])

