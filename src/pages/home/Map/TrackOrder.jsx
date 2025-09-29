// components/TrackOrder.jsx
import { useParams, useSearchParams } from 'react-router-dom';

function TrackOrder() {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  console.log('Tracking order:', orderId, 'with token:', token);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Order Tracking - #{orderId}
          </h1>
          <div className="space-y-2">
            <p><strong>Token:</strong> {token}</p>
            <p><strong>Status:</strong> In Transit</p>
            <p><strong>Estimated Delivery:</strong> Tomorrow</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;