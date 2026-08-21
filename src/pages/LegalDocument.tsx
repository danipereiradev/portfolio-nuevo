import LegalPages, { LegalPageId } from '../components/LegalPages';
import HeroCta from '../components/HeroCta';
import { usePageMeta } from '../hooks/usePageMeta';
import { SITE_WEB_PATH } from '../config/contact';

interface LegalDocumentProps {
  page: LegalPageId;
  path: string;
}

const LegalDocument = ({ page, path }: LegalDocumentProps) => {
  usePageMeta(path);

  return (
    <>
      <LegalPages page={page} />
      <HeroCta
        title='Cuéntanos el caso'
        description='Nos cuentas qué haces y qué tiene que hacer la web o la tienda. Te devolvemos propuesta en 24–48 h, con precio y plazos. Si no encaja, lo dices y no pasa nada.'
        buttonText='PEDIR PROPUESTA'
        buttonHref={SITE_WEB_PATH}
        heroType='form'
        hasButton={false}
        formTitle='Te llamamos'
        formDescription='Propuesta en 24–48 h. Sin compromiso.'
        formSectionInfo={`Legal: ${page}`}
        hasBackground={false}
        hasReviewBadge
        formId='contacto'
      />
    </>
  );
};

export default LegalDocument;
