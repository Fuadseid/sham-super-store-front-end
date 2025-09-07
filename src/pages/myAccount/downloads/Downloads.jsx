import { useLanguage } from '../../../context/LanguageContext';
import './Downloads.scss';

const Downloads = ({ downloads = [], onBrowseProducts, onDownload }) => {
    const { t } = useLanguage();

    const formatDate = (dateString) => {
        if (!dateString) return t('myAccount.downloads.actions.unlimited');
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const isExpired = (expiresDate) => {
        if (!expiresDate) return false;
        return new Date(expiresDate) < new Date();
    };

    const getRemainingText = (remaining) => {
        if (remaining === -1 || remaining === null) {
            return t('myAccount.downloads.actions.unlimited');
        }
        return remaining.toString();
    };

    return (
        <div className="downloads-content">
            <h3>{t('myAccount.downloads.title')}</h3>

            {downloads.length > 0 ? (
                <div className="downloads-table">
                    <table>
                        <thead>
                            <tr>
                                <th>{t('myAccount.downloads.table.headers.product')}</th>
                                <th>{t('myAccount.downloads.table.headers.downloadsRemaining')}</th>
                                <th>{t('myAccount.downloads.table.headers.expires')}</th>
                                <th>{t('myAccount.downloads.table.headers.download')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {downloads.map((download) => (
                                <tr key={download.id}>
                                    <td className="product-name">{download.productName}</td>
                                    <td>{getRemainingText(download.downloadsRemaining)}</td>
                                    <td>{formatDate(download.expiresAt)}</td>
                                    <td>
                                        {isExpired(download.expiresAt) ? (
                                            <span className="expired-status">
                                                {t('myAccount.downloads.actions.expired')}
                                            </span>
                                        ) : download.downloadsRemaining === 0 ? (
                                            <span className="used-status">
                                                {t('myAccount.downloads.status.used')}
                                            </span>
                                        ) : (
                                            <button
                                                className="download-btn"
                                                onClick={() => onDownload && onDownload(download.id, download.fileUrl)}
                                                title={t('myAccount.downloads.actions.download')}
                                            >
                                                <span className="icon">📥</span>
                                                {t('myAccount.downloads.actions.download')}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="empty-state">
                    <h4>{t('myAccount.downloads.emptyState.title')}</h4>
                    <p>{t('myAccount.downloads.emptyState.description')}</p>
                </div>
            )}

            {downloads.length === 0 && (
                <div className="downloads-table">
                    <table>
                        <thead>
                            <tr>
                                <th>{t('myAccount.downloads.table.headers.product')}</th>
                                <th>{t('myAccount.downloads.table.headers.downloadsRemaining')}</th>
                                <th>{t('myAccount.downloads.table.headers.expires')}</th>
                                <th>{t('myAccount.downloads.table.headers.download')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="4">{t('myAccount.downloads.emptyState.message')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            <a
                href="#"
                className="browse-products"
                onClick={(e) => {
                    e.preventDefault();
                    onBrowseProducts && onBrowseProducts();
                }}
            >
                <span className="icon">🛍️</span>
                {t('myAccount.downloads.actions.browseProducts')}
            </a>
        </div>
    );
};

export default Downloads;