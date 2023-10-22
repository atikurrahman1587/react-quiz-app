import Nav from "./Nav.jsx";
import classes from '../styles/Layout.module.css';
// eslint-disable-next-line react/prop-types
export default function Layout({children}) {
    return(
     <>
        <Nav/>
         <main className={classes.main}>
            <div className={classes.container}>
                {children}
            </div>
         </main>
     </>
    );
}