import CoverPage from '../pages/CoverPage.jsx';
import CategoryPage from '../pages/CategoryPage.jsx';
import BrandsPage from '../pages/BrandsPage.jsx';
import ContactPage from '../pages/ContactPage.jsx';

export default function PageContent({ page }) {
  switch (page.type) {
    case 'cover':
      return <CoverPage />;
    case 'category':
      return <CategoryPage page={page} />;
    case 'brands':
      return <BrandsPage />;
    case 'contact':
      return <ContactPage />;
    default:
      return null;
  }
}
