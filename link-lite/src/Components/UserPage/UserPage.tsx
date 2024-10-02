import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { UserUrl } from '../../type';
import apiHandler from '../../services/apiHandler';
import UserListUrls from './UserListUrls';


type UserUrlsListState = {
  urls: UserUrl[]
}

function UserPage() {
  const [userUrls, setuserUrls] = useState<UserUrlsListState>({
    urls: []
  });
  const { user, loading } = useUser();

  useEffect( () => {    
    const fetchUrls = async() => {
    try {
      const response = await apiHandler.getUrlsList();
      setuserUrls(response)
    } catch(err) {
      console.error('Problem during fetching urls.', err)
    };
  };
  fetchUrls();
  }, []);

  if(loading) {
    return <p>Chargement en cours ...</p>
  }

  if (!user) {
    return <p>Veuillez vous connecter pour voir vos informations.</p>;
  };

  return (
    <div>
      <h1>Bienvenue, {user.username}</h1>
      <p>Email: {user.email}</p>
      {
        userUrls?.urls?.length === 0 ? <p>No Urls yet to display</p> :
        <UserListUrls urls={userUrls?.urls || []} />
      }
    </div>
  );
};

export default UserPage;

