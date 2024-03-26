import Link from 'next/link';
import styles from '../styles/Styles.module.css';


export default function HomeTools() {

  const conteudos = [
    { titulo: 'Downdetector', link: 'https://downdetector.com.br' },
    { titulo: 'Grafana', link: 'http://grafana.netcom.psi.br/d/yRHazG3Mk/trafego-dos-transitos-simplificado?orgId=1&refresh=5s' },
    { titulo: 'Portal', link: 'https://portal.netcom.psi.br/auth/login '},
    { titulo: 'Pipe', link: 'https://netcomfibra.5hub.com.br/login' },
    { titulo: 'Native', link: 'https://netcom.native-infinity.com.br/#!/login' },
    { titulo: 'Voalle', link: 'https://erp.netcom.psi.br/users/login' },
    { titulo: 'Wiki', link: 'https://wiki.netcom.psi.br/pt-br/home '},
    { titulo: 'Trello', link: 'https://trello.com/b/g6Dx707n/dashboard-problemas' },
  ];

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}> 
        <h1>Useful Tools</h1>
        <ul className={styles.navLinks}> 
          <li><Link href="/MacPage">Mac</Link></li>
          <li><Link href="/PasswordPage">Senhas</Link></li>
        </ul>
      </nav>
      <div>
          <ul className={`${styles.ul} ${styles.cardgrid}`}>
            {conteudos.map((conteudo, index) => (
              <li key={index} className={styles.card}>
                <Link href={conteudo.link} target="_blank" rel="noopener noreferrer">
                  {conteudo.titulo}
                </Link>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
}
