import axios from 'axios';
import { useState } from 'react';

const ATTACKERS_PASSWORD = "you_have_been_fooled";

export default function SqlInjection() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(null);
  const [isVulnerable, setIsVulnerable] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const sendingPassowrd = isVulnerable ? ATTACKERS_PASSWORD : password
    const response = await axios.post("/api/csrf", { username, password: sendingPassowrd, isVulnerable })
    setResponse(response.data.message);
  };

  return (
    <div className='flex flex-col items-center gap-10 pt-40'>
      <div className='flex flex-col items-start w-1/3'>
        <h1 className='font-extrabold text-xl'>Upute</h1>
        <div>
          Jednostavan primjer CSRF napada u kojem korisnik mijenja lozinku za sustav te dobiva poruku o uspješnosti.
        </div>
        <div>
          Ako je ranjivost omogućena, pri slanju zahtjeva šalje se napadačeva lozinka umjesto korisnikove. 
        </div>
      </div>
      <div className='bg-blue-500 text-white p-4 rounded-md w-96 font-thin'>
      <h1 className=' font-extrabold text-xl mb-4'>Promijeni lozinku</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col mb-1'>
          <label htmlFor="username">Korisničko ime</label>
          <input
            id="username"
            type="text"
            className='rounded-md p-1 text-blue-700'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setResponse(null);
            }}
            required
          />
        </div>
        <div className='flex flex-col mb-1'>
          <label htmlFor="password">Nova lozinka</label>
          <input
            id="password"
            className='rounded-md p-1 text-blue-700'
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setResponse(null);
            }}
            required
          />
        </div>
        <div>
          <label className='flex items-center gap-1'>
            Omogući CSRF:
            <input
              type="checkbox"
              checked={isVulnerable}
              onChange={(e) => {
                setIsVulnerable(e.target.checked);
                setResponse(null);
              }}
            />
          </label>
        </div>
        <div className='mt-4 flex justify-center'>
          <button
          type="submit" className='bg-white text-blue-500 w-full p-1 rounded-md font-semibold hover:bg-blue-300 hover:text-white'>Promijeni</button>
        </div>
      </form>
      </div>
        {response && 
        <div className='bg-blue-200 text-black p-3 rounded-md mt-10'>
          {response}
        </div>
      }
      
    </div>
  );
}
