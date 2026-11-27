import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useLocationContext } from '@/contexts/LocationContext';

export const ContactInfo = () => {
  const { locationInfo, isPune } = useLocationContext();

  return (
    <div className="info">
      <p>
        <MapPin size={18} />
        <span>
          <b>{isPune ? 'Pune Office' : 'Dubai Office'}</b>
          {locationInfo.address}
        </span>
      </p>

      <p>
        <Phone size={18} />
        <span>
          <b>Phone</b>
          <a href={locationInfo.phone.href}>{locationInfo.phone.display}</a>
        </span>
      </p>

      <p>
        <Mail size={18} />
        <span>
          <b>Email</b>
          <a href={`mailto:${locationInfo.email}`}>{locationInfo.email}</a>
        </span>
      </p>
    </div>
  );
};
