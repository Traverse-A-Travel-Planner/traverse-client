import { useEffect, useState } from 'react';
import appwriteClient from '../../utils/appwriteClient';
import { Avatar } from '@arco-design/web-react';
import { Avatars } from 'appwrite';

const avatars = new Avatars(appwriteClient);

const UserAvatar = ({ initials, size }) => {
  const [avatarUrl, setAvatarUrl] = useState('');

  // default initials avatar
  const getInitials = (name) => {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0));
    return initials.join('');
  }

  useEffect(() => {
    const getAvatar = async () => {
      try {
        const response = avatars.getInitials(initials);
        setAvatarUrl(response);
      } catch (error) {
        console.error('Error fetching avatar:', error);
      }
    };

    getAvatar();
  }, [initials]);

  return (
    <>
        {
          avatarUrl ? (
            <img style={{width: size, height: size, borderRadius: '50%'}} src={avatarUrl} alt="Avatar" />
          ) : (
            <Avatar size={size}>
                {getInitials(initials)}
            </Avatar>
          ) 
        }
    </>
  );
};

export default UserAvatar;
