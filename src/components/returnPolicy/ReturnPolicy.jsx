import './ReturnPolicy.scss'

const ReturnPolicy = () => {
    return (
        <div className="return-policy-container">
            <div className="content-wrapper">
                <section className="policy-section">
                    <h1 className="main-title">Return Policy</h1>
                    <h2 className="subtitle">Easy shopping, simple returns:</h2>

                    <div className="policy-text">
                        <p>
                            At "Your Store", we're committed to making your shopping experience as seamless and worry-free as possible.
                            We understand that there may be times when a purchase may not meet your expectations or your needs might change.
                            When that happens, we make completing a return simple and convenient.
                        </p>

                        <p>
                            <strong>Most items can be returned for a refund or replacement/exchange within 15 days of delivery as long as they are in original or unused condition.</strong>
                            For eligible items, you can enjoy free returns. For information on an item's return eligibility, please check the product detail page before placing your order.
                            After placing an order, you can find relevant information on an item's return eligibility in your <a href="#" className="link">Order History</a>.
                        </p>

                        <p>
                            A refund will be provided if <strong>Your Store</strong> (or the third party seller) has received the item, and determined that you are eligible for a refund.
                            It can take up to 15 days for us to receive and process your return. In certain circumstances refund timeframes may be longer.
                            If we need additional information about your return, we will notify you with instructions to contact Customer Service.
                        </p>
                    </div>
                </section>

                <section className="policy-section">
                    <h2 className="section-title">Items That You Can't Return</h2>
                    <p className="section-intro">Some products are non-returnable, such as the following:</p>

                    <ul className="non-returnable-list">
                        <li>Perishable goods such as food, flowers, newspapers or magazines cannot be returned.</li>
                        <li>Some health and personal care items, Products that are intimate or sanitary goods.</li>
                        <li>Hazardous materials, or flammable liquids or gases.</li>
                        <li>Products that may pose potential health and safety risks once sold.</li>
                        <li>Products with shipping restrictions</li>
                        <li>Customized products made specifically for you</li>
                        <li>Gift cards</li>
                        <li>Redeemable products</li>
                        <li>Software products</li>
                        <li>Certain digital products</li>
                        <li>Pharmacy products</li>
                        <li>Pet medication products</li>
                        <li>Automobiles</li>
                    </ul>

                    <p className="final-sale-note">
                        Additionally, products listed as <strong>"Final Sale"</strong> are non-returnable and non-refundable, including specific discounted items, and items sold that are $1 and less.
                    </p>

                    <p>
                        In the unlikely event that a non-returnable/Final Sale item arrives damaged, defective, or materially different from what was ordered, please contact <a href="#" className="link">Customer Service</a>.
                    </p>
                </section>

                <section className="policy-section">
                    <h2 className="section-title">Unintended Item(s) in My Return</h2>
                    <p>
                        If you accidentally sent the wrong item to YourStore.com, please contact <a href="#" className="link">Customer Service</a> as soon as possible.
                        Note that we may not be able to locate mistakenly sent items and are unable to provide compensation in these cases.
                        YourStore.com does not store items sent in error and will handle (and/or dispose) such items at our discretion.
                    </p>
                </section>

                <section className="policy-section">
                    <h2 className="section-title">Returning Items Purchased in a Bundle</h2>
                    <p>You must return all items purchased in a Bundle with Savings to receive a refund. Partial refunds are not available.</p>
                </section>

                <section className="policy-section">
                    <h2 className="section-title">Initiating a Return</h2>
                    <p>
                        To initiate a return on an item that's eligible for return, simply go to <a href="#" className="link">Your Orders</a> and click on "Return Items" button next to the item.
                    </p>
                </section>

                <section className="policy-section">
                    <h2 className="section-title">Sending Us Your Return</h2>
                    <p>Please make sure that your item is:</p>

                    <ul className="return-requirements">
                        <li>returned in <strong>original or unused condition</strong>.</li>
                        <li>returned with <strong>tags attached and hygiene seals and liners intact</strong>.</li>
                        <li>returned in the <strong>original</strong> manufacturer's packaging including tags, components, accessories, manuals, certificates of authenticity, and other inserts.</li>
                        <li>the item is <strong>packaged well</strong> so it doesn't get damaged during shipping</li>
                    </ul>

                    <p className="return-instructions">
                        Please follow the return instructions for each item to receive a refund. Do not include items from separate orders in the same return.
                    </p>
                </section>

                <section className="policy-section">
                    <h2 className="section-title">Return Fees</h2>
                    <p className="fees-intro">
                        While returns are generally free, certain situations or item conditions may incur fees. Note that an item cannot be sent back to you after it has been returned
                        (except certain items that incur 100% damage fees).
                    </p>

                    <div className="fee-types">
                        <div className="fee-item">
                            <h3 className="fee-title">Free Return:</h3>
                            <p>Most items include at least one free return shipping option, but some shipping/drop-off options come with an additional fee. Amazon may also charge a fee if you have an unusually high return rate.</p>
                        </div>

                        <div className="fee-item">
                            <h3 className="fee-title">Damage Fee:</h3>
                            <p>If you return an item that is damaged, missing parts, not in original condition, has tags removed or have obvious signs of use for reasons not due to YourStore.com or seller error, there will be <strong>Up to 50% of the item price, and in some cases, will be charged 100% of item price</strong>.</p>
                        </div>

                        <div className="fee-item">
                            <h3 className="fee-title">Restocking Fee:</h3>
                            <p>you will be charged <strong>100% of the item price</strong> if you return an item from any of the following product types:</p>
                            <ul className="restocking-list">
                                <li>Software and video games that are opened, activated, used, or missing parts.</li>
                                <li>Opened collectibles, board games / table top games.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="policy-section">
                    <h2 className="section-title">Returning a Gift</h2>
                    <p>
                        If the item was marked as a gift when purchased and shipped directly to you, you'll receive a gift credit for the value of your return.
                        Once the returned item is received, a gift certificate will be mailed to you.
                    </p>

                    <p>
                        If the item wasn't marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later,
                        we will send a refund to the gift giver and they will find out about your return.
                    </p>
                </section>

                <section className="policy-section help-section">
                    <h2 className="section-title">Need help?</h2>
                    <p>Contact us at <a href="mailto:support@yourstore.com" className="link">support@shamsuperstore.com</a> for questions related to refunds and returns.</p>
                </section>
            </div>
        </div>
    );
};

export default ReturnPolicy;