import React from 'react';

const HelperText = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span
        style={{
          fontWeight: '600',
          marginBottom: '9px',
        }}
      >
        RATING SCALE:
      </span>
      <p>
        <b style={{ fontWeight: '600', color: 'yellow' }}>0</b> - No experience{' '}
      </p>
      <p>
        <b style={{ fontWeight: '600', color: 'yellow' }}>1</b> -
        Coursera/Udemy/IBM Course
      </p>
      <p>
        <b style={{ fontWeight: '600', color: 'yellow' }}>2</b> - Taken College
        Course
      </p>
      <p>
        <b style={{ fontWeight: '600', color: 'yellow' }}>3</b> - 3 Years
        experience
      </p>
      <p>
        <b style={{ fontWeight: '600', color: 'yellow' }}>4</b> - Deployed
        Project as Lead
      </p>
      <p>
        <b style={{ fontWeight: '600', color: 'yellow' }}>5</b> - 5 years
        experience, spoken at conference
      </p>
    </div>
  );
};

export default HelperText;
