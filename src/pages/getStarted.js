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

  // When accounts are available, decode the token.
  useEffect(() => {
    if (accounts && accounts.length > 0) {
      const account = accounts[0];
      const idToken = account.idToken;
      const decoded = decodeJwt(idToken);
      setDecodedToken(decoded);
      setLoading(false);
    }
  }, [accounts]);

  // Once decoded, check the claims and either print info (if new) or redirect.
  useEffect(() => {
    if (!loading && decodedToken) {
      console.log("Decoded token: ", decodedToken)
      // Extract desired claims from the token.
      const givenName = decodedToken.given_name || '';
      const surname = decodedToken.family_surname || '';
      const streetAddress = decodedToken.streetAddress || '';
      // Assume the token includes a claim "student" (boolean or string)
      const isStudent = decodedToken.extension_Student === true || decodedToken.extension_Student === 'true';
      const email = decodedToken.emails[0] || '';
      const city = decodedToken.city || '';
      const countryRegion = decodedToken.country || '';
      const userObjectId = decodedToken.oid || '';
      const userIsNew = decodedToken.newUser === true || decodedToken.newUser=== 'true';

      if (!userIsNew) {
        // User is not new. Redirect based on student status.
        if (isStudent) {
          router.push(`/studentDashboard?id=${encodeURIComponent(userObjectId)}&email=${encodeURIComponent(email)}`);
        } else {
          router.push(`/tutorDashboard?id=${encodeURIComponent(userObjectId)}&email=${encodeURIComponent(email)}`);
        }
      }
      // Otherwise, if the user is new, we simply render their info on this page.
      // (Their info will also be logged in the console.)
      console.log("User Info:", {
        givenName,
        surname,
        streetAddress,
        isStudent,
        email,
        city,
        countryRegion,
        userObjectId,
        userIsNew,
      });
    }
  }, [loading, decodedToken, router]);

  if (loading || !decodedToken) {
    return <div>Loading...</div>;
  }

  // If we reach this point, the user is new so we display their info.
  const userInfo = {
    "Given Name": decodedToken.given_name || '',
    "Surname": decodedToken.family_surname|| '',
    "Street Address": decodedToken.streetAddress|| '',
    "Student": decodedToken.extension_Student || false,
    "Email Address": decodedToken.emails[0] || '',
    "City": decodedToken.city || '',
    "Country/Region": decodedToken.country || decodedToken.countryOrRegion || '',
    "User Object ID": decodedToken.oid || '',
    "User is new": decodedToken.newUser || false,
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>AspireUS - New User Info</title>
      </Head>
      <main className={styles.main}>
        <h1>New User Information</h1>
        <ul>
          {Object.entries(userInfo).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value.toString()}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
