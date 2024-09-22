function UserSignUp() {
  return (
    <div>
      <h1>UserSignUp</h1>
    </div>
  );
};

export default UserSignUp;

// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';

// const Signup: React.FC = () => {
//   const history = useHistory();
  
//   const handleSignup = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const formData = new FormData(event.target as HTMLFormElement);

//     try {
//       await axios.post('/api/register/', formData);
//       history.push('/check-your-email');  // Redirige vers la page de confirmation d'e-mail
//     } catch (error) {
//       console.error('Erreur lors de l\'inscription', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSignup}>
//       {/* Champs du formulaire d'inscription */}
//       <button type="submit">S'inscrire</button>
//     </form>
//   );
// };

// export default Signup;
