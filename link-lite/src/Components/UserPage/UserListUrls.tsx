import { UserUrl } from "../../type";

type UserListUrlsProps = {
  urls: UserUrl[];
  handleDeleteUrl: (shortUrl: string) => void;
};

function UserListUrls({ urls, handleDeleteUrl }: UserListUrlsProps) {
  const timeConverter = (date: number) => {
    let dateObject = new Date(date * 1000);
    return dateObject.toLocaleDateString();
  };


  return (
    <div className="px-3">
      <h1 className="underline decoration mb-5">Your Urls:</h1>
      <table className="min-w-full bg-gray-900 text-neonGreen">
        <thead>
          <tr className="odd:bg-gray-800 border-b border-retroBeige">
            <th className="py-2 px-4 text-left">Short URL</th>
            <th className="py-2 px-4 text-left">Original URL</th>
            <th className="py-2 px-4 text-left">Creation Date</th>
            <th className="py-2 px-4 text-left"></th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {urls.map((url: UserUrl) => (
            <tr key={url.id} className="border-b border-retroBeige">
              <td className="py-2 px-4 border border-retroBeige text-left">
                <a
                  href={`${process.env.REACT_APP_BACKEND_URL}/${url.short_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${process.env.REACT_APP_BACKEND_URL}/${url.short_url}`}
                </a>
              </td>
              <td className="py-2 px-4 border border-retroBeige text-left">{url.original_url}</td>
              <td className="py-2 px-4 border border-retroBeige text-left">{timeConverter(url.created_at)}</td>
              <td className="py-2 px-4 border border-retroBeige text-left">
                {" "}
                <button 
                onClick={() => handleDeleteUrl(url.short_url)}
                className="text-retroRed bg-transparent hover:text-red-300 border-none text-lg font-bold px-2"
                >
                  ✕
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserListUrls;
