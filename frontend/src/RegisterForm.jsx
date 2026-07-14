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

    const isEmpty = Object.values(formData).some(value => value === '');

    function handleSubmit(e){
        e.preventDefault()
        if (isEmpty){
            console.error('error formData vide');
            return;
        }
        console.log(formData)
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
                <button>submit</button>
            </form>
        </div>
    );
}

export default RegisterForm