import LegalPages, { LegalPageId } from '../components/LegalPages';
import { usePageMeta } from '../hooks/usePageMeta';

interface LegalDocumentProps {
  page: LegalPageId;
  path: string;
}

const LegalDocument = ({ page, path }: LegalDocumentProps) => {
  usePageMeta(path);

  return <LegalPages page={page} />;
};

export default LegalDocument;
