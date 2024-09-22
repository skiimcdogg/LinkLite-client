function UserEmailVerification() {
  return (
    <div>
      <h1>UserEmailVerification</h1>
    </div>
  );
};

export default UserEmailVerification;


// import React, { useEffect, useState } from 'react';
// import { useLocation, useHistory } from 'react-router-dom';
// import axios from 'axios';

// const EmailVerification: React.FC = () => {
//   const [status, setStatus] = useState<string>('Vérification en cours...');
//   const query = new URLSearchParams(useLocation().search);
//   const token = query.get('token');
//   const history = useHistory();

//   useEffect(() => {
//     const verifyEmail = async () => {
//       try {
//         const response = await axios.get(`/api/verify-email?token=${token}`);
//         setStatus(response.data.detail);
//         setTimeout(() => {
//           history.push('/login');  // Redirige vers la page de connexion après quelques secondes
//         }, 3000);
//       } catch (error) {
//         setStatus('Le lien de vérification est invalide ou a expiré.');
//       }
//     };

//     if (token) {
//       verifyEmail();
//     } else {
//       setStatus('Token de vérification manquant.');
//     }
//   }, [token, history]);

//   return (
//     <div>
//       <h1>Vérification de l'e-mail</h1>
//       <p>{status}</p>
//     </div>
//   );
// };

// export default EmailVerification;