import profileImg from '../../img/pochita.gif';
import '../../css/Profile.css';
import { useState } from 'react';

function Profile() {
  const [id, setId] = useState('Siyon');
  const [profileImg_, setProfileImg_] = useState({ profileImg });

  return (
    <>
      <div className="Login_Box">
        <div className="Profile_img_Box">
          <img
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              overflow: 'hidden',
              transition: 'opacity 1s ease',
            }}
            src={profileImg}
            alt=""
          />
        </div>
        <div
          style={{
            color: 'white',
            fontWeight: '400',
            fontSize: '15px',
            cursor: 'pointer',
          }}
        >
          {id}
        </div>
      </div>
    </>
  );
}

export default Profile;
