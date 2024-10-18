import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import { UserUrl } from '../../type';
import apiHandler from '../../services/apiHandler';
import UserListUrls from './UserListUrls';
import { ReactComponent as LoadingIcon } from '../../images/green-spinner.svg';

type UserUrlsListState = {
  urls: UserUrl[]
}

function UserPage() {
  const [userUrls, setuserUrls] = useState<UserUrlsListState>({
    urls: []
  });
  const [urlsLoading, setUrlsLoading] = useState<boolean>(true);
  const { user, loading } = useUser();

  useEffect( () => {    
    const fetchUrls = async() => {
    try {
      const response = await apiHandler.getUrlsList();
      setuserUrls(response);
      setUrlsLoading(false);
    } catch(err) {
      console.error('Problem during fetching urls.', err)
    } finally {
      setUrlsLoading(false)
    }
  };
  fetchUrls();
  }, []);

  const handleDeleteUrl = async(shortUrl: string) => {
    try {
      await apiHandler.deleteUrl(shortUrl);
      setuserUrls((prevState) => ({
       urls: prevState.urls.filter((url: UserUrl) => url.short_url !== shortUrl)}
      ))
    } catch(err) {
      console.error("error during deleting url", err)
    };
  }
  if(loading || urlsLoading) {
    return (
     <div className="flex items-center justify-center">
      <LoadingIcon />
     </div>
    )
  }

  if (!user) {
    return <p>please connect to see your page.</p>;
  };

  return (
    <div>
      <h1 className='mt-7'>Welcome, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h1>
      <p className='mb-7'>{user.email}</p>
      {
        userUrls?.urls?.length === 0 ? <p>No Urls yet to display</p> :
        <UserListUrls urls={userUrls?.urls || []} handleDeleteUrl={handleDeleteUrl} />
      }
    </div>
  );
};

export default UserPage;

