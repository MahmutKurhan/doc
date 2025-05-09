import { Page } from "components/shared/Page";
import { PublicHeader } from "components/modules/Header";
import { MainFooter } from "components/modules/Footer";
import { DocumentExplorer } from "components/modules/DocumentExplorer";

// Örnek verileri içe aktaralım
import { documentCategories, documents } from "data/documents";

export default function Documents() {
  return (
    <Page title="Belgeler | Hukuk Danışmanlığı">
      <PublicHeader />
      <main className="transition-content flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dökümanlar</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Tüm yasal belgelerimize, sözleşmelerimize ve rehberlerimize buradan erişebilirsiniz.
            </p>
          </div>
          
          <DocumentExplorer documents={documents} categories={documentCategories} />
        </div>
      </main>
      <MainFooter scrollToTopButton={true} />
    </Page>
  );
}