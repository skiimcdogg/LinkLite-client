import React from 'react';
import { UserUrl } from '../../type';
import apiHandler from '../../services/apiHandler';

type UserListUrlsProps = {
    urls: UserUrl[],
    handleDeleteUrl: (shortUrl: string) => void
};

function UserListUrls({ urls, handleDeleteUrl }: UserListUrlsProps) {

  const timeConverter = (date: number) => {
    let dateObject = new Date(date * 1000)
    return dateObject.toLocaleDateString()
  }

  // const handleDeleteUrl = async(shortUrl: string) => {
  //   try {
  //     await apiHandler.deleteUrl(shortUrl);
  //   } catch(err) {
  //     console.error("error during deleting url", err)
  //   };
  // }
    
  return (
    <div>
      <h1>Your Urls</h1>
      <table>
        <thead>
            <tr>
                <th>Short URL</th>
                <th>Original URL</th>
                <th>Creation Date</th>
            </tr>
        </thead>
        <tbody>
            {
                urls.map((url: UserUrl) => (
                    <tr key={url.id}>
                        <td>
                            <a href={`${process.env.REACT_APP_BACKEND_URL}/${url.short_url}`} target="_blank" rel="noopener noreferrer">
                            {`${process.env.REACT_APP_BACKEND_URL}/${url.short_url}`}
                            </a>
                        </td>
                        <td>{ url.original_url }</td>
                        <td>{ timeConverter(url.created_at) }</td>
                        <td> <button onClick={() => handleDeleteUrl(url.short_url)}>Delete</button> </td>
                    </tr>
                ))
            }
        </tbody>
      </table>
    </div>
  );
};

export default UserListUrls;