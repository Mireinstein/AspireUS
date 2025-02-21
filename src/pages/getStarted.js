import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMsal } from '@azure/msal-react';
import Head from 'next/head';
import styles from '../styles/getStarted.module.css';

// Mark this page as protected by auth.
GetStarted.protected = true;

export default function GetStarted() {
  const router = useRouter();
  const { accounts } = useMsal();
  const [decodedToken, setDecodedToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to decode a JWT token (without verifying signature).
  function decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  // When MSAL accounts are available, decode the token.
  useEffect(() => {
    if (accounts && accounts.length > 0) {
      const account = accounts[0];
      const idToken = account.idToken;
      const decoded = decodeJwt(idToken);
      setDecodedToken(decoded);
      setLoading(false);
    }
  }, [accounts]);

  // Once decoded, check if the user is new. If not, redirect immediately.
  // If the user is new, register them using our API endpoint.
  useEffect(() => {
    if (!loading && decodedToken) {
      // Extract claims from the token.
      const givenName = decodedToken.given_name || '';
      const surname = decodedToken.family_name || '';
      const streetAddress = decodedToken.streetAddress || '';
      const isStudent = decodedToken.extension_Student === true || decodedToken.extension_Student === 'true';
      const email = (decodedToken.emails && decodedToken.emails.length > 0) ? decodedToken.emails[0] : '';
      const city = decodedToken.city || '';
      const countryRegion = decodedToken.country || '';
      const userObjectId = decodedToken.oid || '';
      const userIsNew = decodedToken.newUser === true || decodedToken.newUser === 'true';

      if (!userIsNew) {
        // If the user already exists, redirect based on role.
        alert("User is not new")
        if (isStudent) {
          router.push(`/studentDashboard?id=${encodeURIComponent(userObjectId)}&email=${encodeURIComponent(email)}`);
        } else {
          router.push(`/tutorDashboard?id=${encodeURIComponent(userObjectId)}&email=${encodeURIComponent(email)}`);
        }
      } else {
        
        // User is new: build the payload.
        // TODO:Here, profilePhotoUrl is set to an empty string. In a full implementation, you’d upload the image to Blob Storage first.
        const payload = {
          givenName,
          surname,
          streetAddress,
          email,
          city,
          countryRegion,
          userObjectId,
          profilePhotoUrl: 'www.profilephoto.com' 
        };
        // Choose the appropriate endpoint based on the student flag.
        const registerEndpoint = isStudent ? '/api/registerStudent' : '/api/registerTutor';

        // POST the user record to the API endpoint.
        fetch(registerEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              // After successful registration, redirect the user.
              if (isStudent) {
                router.push(`/studentDashboard?id=${encodeURIComponent(userObjectId)}&email=${encodeURIComponent(email)}`);
              } else {
                router.push(`/tutorDashboard?id=${encodeURIComponent(userObjectId)}&email=${encodeURIComponent(email)}`);
              }
            } else {
              console.error("Registration failed:", data.error);
            }
          })
          .catch(err => console.error("Error during registration:", err));
      }
    }
  }, [loading, decodedToken, router]);

  if (loading || !decodedToken) {
    return <div>Loading...</div>;
  }

  // This page normally does not render any registration form.
  return (
    <div className={styles.container}>
      <Head>
        <title>AspireUS - Processing</title>
      </Head>
      <main className={styles.main}>
        <h1>Processing your information...</h1>
      </main>
    </div>
  );
}
