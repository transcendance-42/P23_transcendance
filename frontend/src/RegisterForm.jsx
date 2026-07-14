import { useState } from 'react'
import './RegisterForm.css'

function RegisterForm(){
    const  [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        city: '',
        date_of_birth: ''
    });

    const [message, setMessage] = useState('');

    const isEmpty = Object.values(formData).some(value => value === '');

    async function handleSubmit(e){
        e.preventDefault()
        if (isEmpty){
            console.error('error formData vide');
            return;
        }
        const response = await fetch('http://localhost:3000/register',{
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(formData)
        })
        const data = await response.json();
        console.log(response.status, data);
        if (response.status === 400){
            setMessage('Payload invalide');
        } else if (response.status == 409){
            setMessage('email déja existant');
        } else if (response.ok){
            setMessage('compte créer avec succès');
        } else {
            setMessage('Error invalide');
        }
    }


    return (
        <div>
            <h1>page register</h1>
            <form onSubmit={handleSubmit} className='register-form'>
                <input
                    type="email"
                    placeholder='entrez mail'
                    value= {formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                />
                <input
                    type="text"
                    placeholder='entrez votre prenom'
                    value= {formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value})}
                />
                <input
                    type="text"
                    placeholder='entrez votre nom'
                    value= {formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value})}
                />
                <input
                    type="password"
                    placeholder='entrez votre mot de passe'
                    value= {formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value})}
                />
                <input
                    type="text"
                    placeholder='entrez votre ville'
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value})}
                />
                <input
                    type="date"
                    placeholder='entrez votre date de naissance'
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value})}
                />
                {message && <p>{message}</p>}
                <button>submit</button>
            </form>
        </div>
    );
}

export default RegisterForm