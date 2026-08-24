import { Link } from 'react-router'

export default function login ()
{
    console.log("okay on est connecté à la page de login")
    return (
        <div> 
            <h1> Get Started </h1>
            <p> By taping login or continue you agree to our terms </p>
            <Link to="/login/email" className="classe-bouton">
                📧 Log in with email
            </Link>
            <button type="submit"> Continue with Google </button>
        </div>
    );
}


