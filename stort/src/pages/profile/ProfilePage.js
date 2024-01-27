import './ProfilePage.css';
import { useEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = window.location.origin;

const ProfilePage = memo(({user}) =>  {

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals  
    if (confirm('Throw to 404 or no')) {
        window.location.href = `${BASE_URL}/404`;
    } else {
        return;
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Static</h1>
      </header>
    </div>
  );
});

export default ProfilePage;
