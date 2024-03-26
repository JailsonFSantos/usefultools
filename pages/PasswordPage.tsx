import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Styles.module.css';

function generatePassword(length: number, includeUppercase: boolean, includeNumbers: boolean, includeSymbols: boolean) {
  let charset = 'abcdefghijklmnopqrstuvwxyz';
  let password = '';
  
  if (includeUppercase) {
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  if (includeNumbers) {
    charset += '0123456789';
  }
  if (includeSymbols) {
    charset += '!@#$%^&*()-_=+[]{}|;:,.<>?';
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

export default function PasswordPage() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleGeneratePassword = () => {
    const password = generatePassword(passwordLength, includeUppercase, includeNumbers, includeSymbols);
    setGeneratedPassword(password);
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1>Senhas</h1>
        <div className={styles.navLinks}>
        <ul className={styles.navLinks}> {/* Use uma lista para os links da barra de navegação */}
        <li><Link href="/MacPage">Mac</Link></li>
        <li><Link href="/PasswordPage">Senhas</Link></li>
        <li><Link href="/">Inicio</Link></li>
      </ul>
        </div>
      </nav>

      <div className={styles.inputContainer}>
        <label htmlFor="passwordLength">Número de caracteres:</label>
        <input
          type="number"
          id="passwordLength"
          min="8"
          max="32"
          value={passwordLength}
          onChange={(e) => setPasswordLength(parseInt(e.target.value))}
        />
        <div className={styles.checkboxContainer}>
          <label htmlFor="includeUppercase">Incluir letras maiúsculas</label>
          <input
            type="checkbox"
            id="includeUppercase"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
        </div>
        <div className={styles.checkboxContainer}>
          <label htmlFor="includeNumbers">Incluir números</label>
          <input
            type="checkbox"
            id="includeNumbers"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
        </div>
        <div className={styles.checkboxContainer}>
          <label htmlFor="includeSymbols">Incluir símbolos</label>
          <input
            type="checkbox"
            id="includeSymbols"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
        </div>
        <button onClick={handleGeneratePassword}>Gerar Senha</button>
        {generatedPassword && (
          <div>
            <h2>Sua Senha:</h2>
            <p>{generatedPassword}</p>
          </div>
        )}
      </div>
    </div>
  );
}
