import './Following.scss';

const Following = () => {
    return (
        <div className="following-content">
            <h3>Following</h3>
            <div className="following-list">
                <p>You are not following any stores yet.</p>
            </div>
            <a href="#" className="browse-stores">Browse Stores</a>
        </div>
    );
};

export default Following;