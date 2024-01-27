import './DefaultPage.css';
import { useEffect, memo } from 'react';
import { useLocation } from 'react-router-dom';

const DefaultPage = memo(({user}) =>  {
  let location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Profile not found</h1>
      </header>
    </div>
  );
});

export default DefaultPage;
