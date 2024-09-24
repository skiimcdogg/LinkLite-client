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
        <tbody>
            {
                urls.map((url: UserUrl) => (
                    <tr key={url.id}>
                        <td>
                            <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                                {url.shortUrl}
                            </a>
                        </td>
                        <td>{ url.originalUrl }</td>
                        <td>{ url.createdAt }</td>
                    </tr>
                ))
            }
        </tbody>
        </thead>
      </table>
    </div>
  );
};

export default UserListUrls;