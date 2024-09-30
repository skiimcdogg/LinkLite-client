import React from 'react';
import { UserUrl } from '../../type';

type UserListUrlsProps = {
    urls: UserUrl[]
};

function UserListUrls({ urls }: UserListUrlsProps) {

    
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
                            <a href={`${process.env.REACT_APP_BACKEND_URL}${url.short_url}`} target="_blank" rel="noopener noreferrer">
                            {`${process.env.REACT_APP_BACKEND_URL}${url.short_url}`}
                            </a>
                        </td>
                        <td>{ url.original_url }</td>
                        <td>{ url.created_at }</td>
                    </tr>
                ))
            }
        </tbody>
      </table>
    </div>
  );
};

export default UserListUrls;