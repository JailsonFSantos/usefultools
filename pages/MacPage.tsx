import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Styles.module.css';

export default function MacPage() {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [vendor, setVendor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/-/g, ':');
    setInputValue(e.target.value);
    setOutputValue(newValue);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputValue);
  };

  const handleVendorLookup = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/lookupMacVendor?macAddress=${encodeURIComponent(outputValue)}`);
      setVendor(response.data);
    } catch (error) {
      setVendor('Nao encontrado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1>Mac</h1>
        <div className={styles.navLinks}>
        <ul className={styles.navLinks}> {/* Use uma lista para os links da barra de navegação */}
        <li><Link href="/MacPage">Mac</Link></li>
        <li><Link href="/PasswordPage">Senhas</Link></li>
        <li><Link href="/OnboardingPage">Onboarding</Link></li>
        <li><Link href="/">Inicio</Link></li>
        </ul>
        </div>
      </nav>

      <div className={styles.converterContainer}>
        <div>
          <label htmlFor="input">Digite o Mac:</label>
          <input
            type="text"
            id="input"
            value={inputValue}
            onChange={handleChange}
            placeholder="AB-CD-EF-GH-IJ"
          />
        </div>
        <div>
          <label htmlFor="output">Resultado:</label>
          <input
            type="text"
            id="output"
            value={outputValue}
            readOnly
          />
          <button onClick={handleCopy}>Copiar</button>
        </div>
        <div>
          <button onClick={handleVendorLookup} disabled={!outputValue || loading}>
            Consultar Fornecedor
          </button>
          {loading ? <p>Consultando fornecedor...</p> : <p>Fornecedor: {vendor}</p>}
        </div>
      </div>
    </div>
  );
}
