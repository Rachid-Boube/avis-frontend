import React, {useState} from 'react'
import {motion} from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import {Lock, Mail, User,Loader} from 'lucide-react'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useAuthStore } from '../store/authStore';


const PageInscription = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const {inscription,error,isLoading} = useAuthStore();

  const handleInscription = async (e) => {
		e.preventDefault();
		try {
			await inscription(name, email, password);
			navigate('/verification-email'); // Redirect to login page after successful registration
        } catch (error) {
			console.error(error);
		}
	};

  return (
    <motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
			overflow-hidden'
		>
			<div className='p-8'>
				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
					Creation de Compte
				</h2>

        <form onSubmit={handleInscription}>
        <Input
						icon={User}
						type='text'
						placeholder='Nom Complet'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
           <Input
						icon={Mail}
						type='email'
						placeholder='Adresse Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
          <Input
						icon={Lock}
						type='password'
						placeholder='Mot de Passe'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error && (
                        <p className='text-red-500 font-semibold mt-2'>Erreur : {error}</p>
                    )}
					<PasswordStrengthMeter password={password} />

          <motion.button className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
						font-bold rounded-lg shadow-lg hover:from-green-600
						hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
						 focus:ring-offset-gray-900 transition duration-200'
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type='submit'
						disabled={isLoading}>
             {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "S'inscrire"}
          </motion.button>
  
        </form>
        
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Already have an account?{" "}
					<Link to={"/connexion"} className='text-green-400 hover:underline'>
						Se connecter
					</Link>
				</p>
			</div>

   </motion.div>
  );
}

export default PageInscription