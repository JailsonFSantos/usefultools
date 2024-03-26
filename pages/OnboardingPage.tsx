import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Styles.module.css';

// Manutencao
function resetForm() {
  document.getElementById("inputForm").reset();

  // Limpar checkboxes
  var checkboxes = document.getElementsByClassName("satisfacao");
  Array.from(checkboxes).forEach(function (checkbox) {
    checkbox.checked = false;
  });


  document.getElementById("nps").value = "";

  document.getElementById("motivoNps").value = "";
}

export default function OnboardingPage() {
  const [satisfacao, setSatisfacao] = useState('');

  const handleSatisfacaoChange = (value) => {
    if (satisfacao === value) {
      // Se a mesma opção foi clicada novamente, desmarque-a
      setSatisfacao('');
    } else {
      setSatisfacao(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const cliente = document.getElementById("cliente").value;
    const contato = document.getElementById("contato").value;
    const contrato = document.getElementById("contrato").value;
    const instalador = document.getElementById("instalador").value;
    const vendedor = document.getElementById("vendedor").value;
    const atendimentoComercial = document.getElementById(
      "atendimentoComercial"
    ).value;
    const atendimentoInstalacao = document.getElementById(
      "atendimentoInstalacao"
    ).value;
    const nps = document.getElementById("nps").value;
    const motivoNps = document.getElementById("motivoNps").value;

    const content =
      `Cliente: ${cliente}\n` +
      `Contato: ${contato}\n` +
      `Contrato: ${contrato}\n` +
      `Instalador: ${instalador}\n` +
      `Vendedor: ${vendedor}\n` +
      `Gostou do atendimento comercial? ${atendimentoComercial}\n` +
      `Gostou do atendimento de instalação? ${atendimentoInstalacao}\n` +
      `Satisfeito(a): ${satisfacao}\n` +
      `NPS: ${nps}\n` +
      `Motivo do NPS: ${motivoNps}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = cliente + ".Onboarding.txt";
    link.innerText = "Baixar o arquivo";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    resetForm();
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h1>Onboarding</h1>
        <div className={styles.navLinks}>
        <ul className={styles.navLinks}> {/* Use uma lista para os links da barra de navegação */}
        <li><Link href="/MacPage">Mac</Link></li>
        <li><Link href="/PasswordPage">Senhas</Link></li>
        <li><Link href="/OnboardingPage">Onboarding</Link></li>
        <li><Link href="/">Inicio</Link></li>
      </ul>
        </div>
      </nav>

      <form className={styles.inputContainer} id="inputForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cliente">Cliente:</label>
          <input type="text" id="cliente" />
        </div>
        <div>
          <label htmlFor="contato">Contato:</label>
          <input type="text" id="contato" />
        </div>
        <div>
          <label htmlFor="contrato">Contrato:</label>
          <input type="text" id="contrato" />
        </div>
        <div>
          <label htmlFor="instalador">Instalador:</label>
          <input type="text" id="instalador" />
        </div>
        <div>
          <label htmlFor="vendedor">Vendedor:</label>
          <input type="text" id="vendedor" />
        </div>
        <div>
          <label htmlFor="atendimentoComercial">Gostou do atendimento comercial?</label>
          <input type="text" id="atendimentoComercial" />
        </div>
        <div>
          <label htmlFor="atendimentoInstalacao">Gostou do atendimento de instalação?</label>
          <input type="text" id="atendimentoInstalacao" />
        </div>
        <div>
          <label htmlFor="satisfacao">Satisfeito(a):</label>
          <div className={styles.checkboxContainer}>
            <label htmlFor="satisfacaoSim">Sim</label>
            <input
              type="checkbox"
              className="satisfacao"
              name="satisfacao"
              id="satisfacaoSim"
              checked={satisfacao === 'Sim'}
              onChange={() => handleSatisfacaoChange('Sim')}
            />
          </div>
          <div className={styles.checkboxContainer}>
            <label htmlFor="satisfacaoNao">Não</label>
            <input
              type="checkbox"
              className="satisfacao"
              name="satisfacao"
              id="satisfacaoNao"
              checked={satisfacao === 'Não'}
              onChange={() => handleSatisfacaoChange('Não')}
            />
          </div>
        </div>
        <div>
          <label htmlFor="nps">NPS:</label>
          <input type="number" id="nps" />
        </div>
        <div>
          <label htmlFor="motivoNps">Motivo do NPS:</label>
          <input style={{height:'100px'}} type="text" id="motivoNps" />
        </div>
        <button type="submit">Baixar Arquivo</button>
      </form>
    </div>
  );
}
