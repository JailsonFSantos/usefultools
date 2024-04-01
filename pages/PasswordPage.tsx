import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Styles.module.css';

function generatePassword(length: number, includeUppercase: boolean, includeLowercase: boolean, includeNumbers: boolean, includeSymbols: boolean) {
  let charset = '';
  
  if (includeUppercase) {
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  if (includeLowercase) {
    charset += 'abcdefghijklmnopqrstuvwxyz';
  }
  if (includeNumbers) {
    charset += '0123456789';
  }
  if (includeSymbols) {
    charset += '!@#$%^&*()-_=+[]{}|;:,.<>?';
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

export default function PasswordPage() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [error, setError] = useState('');

  const handleGeneratePassword = () => {
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      setError('Selecione pelo menos uma opção');
      return;
    }

    const password = generatePassword(passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    setGeneratedPassword(password);
    setError('');
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert('Senha copiada para a área de transferência!');
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1>Senhas</h1>
        <div className={styles.navLinks}>
          <ul className={styles.navLinks}>
            <li><Link href="/MacPage">Mac</Link></li>
            <li><Link href="/PasswordPage">Senhas</Link></li>
            <li><Link href="/">Inicio</Link></li>
          </ul>
        </div>
      </nav>

      <div className={styles.inputContainer}>
        <label htmlFor="passwordLength">Número de caracteres: {passwordLength}</label>
        <input
          type="range"
          id="passwordLength"
          min="8"
          max="32"
          value={passwordLength}
          onChange={(e) => setPasswordLength(parseInt(e.target.value))}
        />
        <div className={styles.checkboxContainer}>
          <label htmlFor="includeUppercase">Letras Maiúsculas</label>
          <input
            type="checkbox"
            id="includeUppercase"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
        </div>
        <div className={styles.checkboxContainer}>
          <label htmlFor="includeLowercase">Letras Minúsculas</label>
          <input
            type="checkbox"
            id="includeLowercase"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
        </div>
        <div className={styles.checkboxContainer}>
          <label htmlFor="includeNumbers">Números</label>
          <input
            type="checkbox"
            id="includeNumbers"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
        </div>
        <div className={styles.checkboxContainer}>
          <label htmlFor="includeSymbols">Símbolos</label>
          <input
            type="checkbox"
            id="includeSymbols"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
        </div>
        <button onClick={handleGeneratePassword}>Gerar Senha</button>
        {error && <p className={styles.error}>{error}</p>}
        {generatedPassword && (
          <div>
            <h2>Sua Senha:</h2>
            <p>{generatedPassword}</p>
            <button onClick={handleCopyPassword}>Copiar Senha</button>
          </div>
        )}
      </div>
    </div>
  );
}
