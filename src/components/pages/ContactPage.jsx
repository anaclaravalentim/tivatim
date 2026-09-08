import TivatimLogo from '../Brand/TivatimLogo.jsx';
import './ContactPage.css';

const EMAIL = 'tivatim@outlook.com';
const PHONE_DISPLAY = '+55 47 9625-9436';
const PHONE_DIAL = '+554796259436';
const WHATSAPP_NUMBER = '554796259436';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-page__logo">
        <TivatimLogo tone="light" markSize={30} />
      </div>

      <h2 className="contact-page__title">
        ENCONTRE A SOLUÇÃO IDEAL
        <br />
        PARA O SEU NEGÓCIO
      </h2>

      <p className="contact-page__text">
        Trabalhamos com as principais marcas e soluções em tecnologia, conectividade,
        informática e infraestrutura.
        <br />
        Entre em contato com nossa equipe comercial.
      </p>

      <div className="contact-page__actions">
        <a className="contact-page__btn" href={`mailto:${EMAIL}`}>
          <span aria-hidden="true">✉</span> {EMAIL}
        </a>
        <a className="contact-page__btn" href={`tel:${PHONE_DIAL}`}>
          <span aria-hidden="true">☎</span> {PHONE_DISPLAY}
        </a>
        <a
          className="contact-page__btn contact-page__btn--whatsapp"
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
        >
          <span aria-hidden="true">💬</span> WhatsApp
        </a>
      </div>

      <p className="contact-page__disclaimer">
        Consulte nossa equipe comercial para disponibilidade e condições.
      </p>
    </div>
  );
}
