'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaTruckLoading,
  FaClipboardList, FaBox, FaShippingFast,
  FaCheckCircle, FaChevronRight, FaDownload, FaShare,
  FaPrint, FaHeadphones, FaShieldAlt, FaBell,
  FaTimes, FaPhone, FaEnvelope, FaCopy, FaCheck,
  FaSync, FaEdit, FaSave, FaTrash, FaPlus, FaFilter,
  FaChartLine, FaUsers, FaClock
  
} from 'react-icons/fa';

// Enhanced Mock Database with more orders
const TRACKING_DATABASE = {
  'TRK123456789': {
    id: 'TRK123456789',
    status: 'Delivered',
    estimatedDelivery: '2024-01-18',
    currentLocation: 'Boston, MA',
    origin: 'Seattle, WA',
    destination: 'Boston, MA',
    weight: '75 kg',
    dimensions: '100 × 60 × 40 cm',
    carrier: 'SwiftLogistics Express',
    serviceType: 'Standard Delivery',
    lastUpdated: '2024-01-18 15:30',
    customer: {
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567'
    },
    history: [
      { date: '2024-01-15 08:30', status: 'Picked Up', location: 'Seattle Warehouse', completed: true, timestamp: 1705315800000 },
      { date: '2024-01-15 14:20', status: 'Processing', location: 'Seattle Hub', completed: true, timestamp: 1705339200000 },
      { date: '2024-01-16 09:45', status: 'Departed', location: 'Seattle Airport', completed: true, timestamp: 1705405500000 },
      { date: '2024-01-17 13:30', status: 'Arrived', location: 'Boston Hub', completed: true, timestamp: 1705493400000 },
      { date: '2024-01-18 09:15', status: 'Out for Delivery', location: 'Boston Area', completed: true, timestamp: 1705576500000 },
      { date: '2024-01-18 14:00', status: 'Delivered', location: 'Boston, MA', completed: true, timestamp: 1705590000000 },
    ]
  },
  'TRK789012345': {
    id: 'TRK789012345',
    status: 'In Transit',
    estimatedDelivery: '2024-01-20',
    currentLocation: 'Chicago Distribution Center',
    origin: 'Seattle, WA',
    destination: 'Boston, MA',
    weight: '150 kg',
    dimensions: '120 × 80 × 60 cm',
    carrier: 'SwiftLogistics Express',
    serviceType: 'Express Delivery',
    lastUpdated: '2024-01-19 16:30',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 234-5678'
    },
    history: [
      { date: '2024-01-15 09:30', status: 'Picked Up', location: 'Seattle Warehouse', completed: true, timestamp: 1705318200000 },
      { date: '2024-01-16 14:20', status: 'Processing', location: 'Seattle Hub', completed: true, timestamp: 1705429200000 },
      { date: '2024-01-17 11:45', status: 'Departed', location: 'Seattle Airport', completed: true, timestamp: 1705494300000 },
      { date: '2024-01-18 16:30', status: 'Arrived', location: 'Chicago Hub', completed: true, timestamp: 1705581000000 },
      { date: '2024-01-19 09:15', status: 'In Transit', location: 'Chicago Distribution Center', completed: true, timestamp: 1705655700000 },
      { date: '2024-01-20 14:00', status: 'Out for Delivery', location: 'Boston Area', completed: false, timestamp: 1705766400000 },
      { date: '2024-01-20 18:00', status: 'Delivered', location: 'Destination', completed: false, timestamp: 1705780800000 },
    ]
  },
  'SL2024001234': {
    id: 'SL2024001234',
    status: 'Out for Delivery',
    estimatedDelivery: '2024-01-19',
    currentLocation: 'Miami Distribution Center',
    origin: 'Los Angeles, CA',
    destination: 'Miami, FL',
    weight: '35 kg',
    dimensions: '80 × 50 × 30 cm',
    carrier: 'SwiftLogistics Express',
    serviceType: 'Same Day Delivery',
    lastUpdated: '2024-01-19 08:15',
    customer: {
      name: 'Michael Brown',
      email: 'michael.b@email.com',
      phone: '+1 (555) 345-6789'
    },
    history: [
      { date: '2024-01-18 10:00', status: 'Picked Up', location: 'Los Angeles Warehouse', completed: true, timestamp: 1705579200000 },
      { date: '2024-01-18 15:30', status: 'Processing', location: 'Los Angeles Hub', completed: true, timestamp: 1705596600000 },
      { date: '2024-01-18 20:45', status: 'Departed', location: 'Los Angeles Airport', completed: true, timestamp: 1705614300000 },
      { date: '2024-01-19 06:30', status: 'Arrived', location: 'Miami Hub', completed: true, timestamp: 1705656600000 },
      { date: '2024-01-19 09:00', status: 'Out for Delivery', location: 'Miami Area', completed: true, timestamp: 1705665600000 },
      { date: '2024-01-19 17:00', status: 'Delivered', location: 'Miami, FL', completed: false, timestamp: 1705694400000 },
    ]
  },
  'SL2024005678': {
    id: 'SL2024005678',
    status: 'Processing',
    estimatedDelivery: '2024-01-22',
    currentLocation: 'New York Hub',
    origin: 'Chicago, IL',
    destination: 'New York, NY',
    weight: '200 kg',
    dimensions: '150 × 100 × 80 cm',
    carrier: 'SwiftLogistics Express',
    serviceType: 'Freight Delivery',
    lastUpdated: '2024-01-19 10:00',
    customer: {
      name: 'Emma Davis',
      email: 'emma.d@email.com',
      phone: '+1 (555) 456-7890'
    },
    history: [
      { date: '2024-01-19 08:30', status: 'Picked Up', location: 'Chicago Warehouse', completed: true, timestamp: 1705656600000 },
      { date: '2024-01-19 14:20', status: 'Processing', location: 'Chicago Hub', completed: true, timestamp: 1705674000000 },
      { date: '2024-01-20 08:00', status: 'Departed', location: 'Chicago Hub', completed: false, timestamp: 1705742400000 },
      { date: '2024-01-21 06:00', status: 'Arrived', location: 'New York Hub', completed: false, timestamp: 1705824000000 },
      { date: '2024-01-22 09:00', status: 'Out for Delivery', location: 'New York Area', completed: false, timestamp: 1705914000000 },
      { date: '2024-01-22 18:00', status: 'Delivered', location: 'New York, NY', completed: false, timestamp: 1705946400000 },
    ]
  }
};

// Enhanced Admin Dashboard Data
const ALL_ORDERS = Object.values(TRACKING_DATABASE);

const STATUS_OPTIONS = ['Processing', 'In Transit', 'Out for Delivery', 'Delivered', 'Delayed', 'Cancelled'];
const LOCATIONS = ['Seattle Warehouse', 'Chicago Hub', 'New York Hub', 'Boston Hub', 'Miami Hub', 'Los Angeles Hub'];

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(false);
  const [showContactSupport, setShowContactSupport] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [orders, setOrders] = useState(ALL_ORDERS);
  const [editingOrder, setEditingOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [newOrder, setNewOrder] = useState({
    id: '',
    status: 'Processing',
    origin: '',
    destination: '',
    customer: { name: '', email: '', phone: '' }
  });
  const [liveUpdates, setLiveUpdates] = useState(true);
  const inputRef = useRef(null);

  // Simulate real-time updates
  useEffect(() => {
    if (!liveUpdates) return;

    const interval = setInterval(() => {
      setOrders(prevOrders => {
        const updatedOrders = [...prevOrders];
        const randomIndex = Math.floor(Math.random() * updatedOrders.length);
        const order = updatedOrders[randomIndex];
        
        if (order && order.status !== 'Delivered' && order.status !== 'Cancelled') {
          const currentStatusIndex = STATUS_OPTIONS.indexOf(order.status);
          if (currentStatusIndex < STATUS_OPTIONS.length - 1 && Math.random() > 0.7) {
            const newStatus = STATUS_OPTIONS[currentStatusIndex + 1];
            order.status = newStatus;
            order.lastUpdated = new Date().toLocaleString();
            
            // Add to history
            order.history.push({
              date: new Date().toLocaleString(),
              status: newStatus,
              location: order.currentLocation,
              completed: newStatus === 'Delivered',
              timestamp: Date.now()
            });
            
            if (newStatus === 'Delivered') {
              order.estimatedDelivery = new Date().toISOString().split('T')[0];
            }
            
            // Update current location based on status
            if (newStatus === 'In Transit') {
              order.currentLocation = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
            }
            
            // Show notification for real-time update
            if (trackingInfo && trackingInfo.id === order.id) {
              setTrackingInfo({...order});
              showNotification(`Order ${order.id} status updated to ${newStatus}`, 'info');
            }
          }
        }
        return updatedOrders;
      });
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [liveUpdates, trackingInfo]);

  const showNotification = (message, type) => {
    setPopupMessage(message);
    setPopupType(type);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleTrack = useCallback(async () => {
    const trimmedId = trackingId.trim().toUpperCase();
    
    if (!trimmedId) {
      setError('Please enter a tracking number');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const found = orders.find(order => order.id === trimmedId);
    
    if (found) {
      setTrackingInfo(found);
      setError(null);
      showNotification(`Tracking details found for ${trimmedId}`, 'success');
    } else {
      setTrackingInfo(null);
      setError(`Tracking number "${trimmedId}" not found. Please check and try again.`);
      showNotification(`We couldn't find tracking information for ${trimmedId}`, 'error');
    }
    
    setIsLoading(false);
  }, [trackingId, orders]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTrack();
    }
  };

  const copyTrackingId = useCallback(() => {
    if (trackingInfo?.id) {
      navigator.clipboard.writeText(trackingInfo.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
      showNotification('Tracking number copied to clipboard!', 'success');
    }
  }, [trackingInfo]);

  const handleUpdateOrder = (orderId, updates) => {
    setOrders(prevOrders => {
      const updatedOrders = prevOrders.map(order => 
        order.id === orderId ? { ...order, ...updates, lastUpdated: new Date().toLocaleString() } : order
      );
      
      if (trackingInfo && trackingInfo.id === orderId) {
        setTrackingInfo(updatedOrders.find(o => o.id === orderId));
        showNotification(`Order ${orderId} has been updated`, 'success');
      }
      
      return updatedOrders;
    });
    setEditingOrder(null);
  };

  const handleDeleteOrder = (orderId) => {
    if (confirm('Are you sure you want to delete this order?')) {
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      if (trackingInfo && trackingInfo.id === orderId) {
        setTrackingInfo(null);
      }
      showNotification(`Order ${orderId} has been deleted`, 'success');
    }
  };

  const handleAddOrder = () => {
    if (!newOrder.id || !newOrder.origin || !newOrder.destination) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    const order = {
      id: newOrder.id.toUpperCase(),
      status: newOrder.status,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      currentLocation: newOrder.origin,
      origin: newOrder.origin,
      destination: newOrder.destination,
      weight: '50 kg',
      dimensions: '100 × 60 × 40 cm',
      carrier: 'SwiftLogistics Express',
      serviceType: 'Standard Delivery',
      lastUpdated: new Date().toLocaleString(),
      customer: newOrder.customer,
      history: [
        { date: new Date().toLocaleString(), status: 'Processing', location: newOrder.origin, completed: true, timestamp: Date.now() }
      ]
    };

    setOrders(prevOrders => [...prevOrders, order]);
    setShowAddOrder(false);
    setNewOrder({ id: '', status: 'Processing', origin: '', destination: '', customer: { name: '', email: '', phone: '' } });
    showNotification(`Order ${order.id} has been added`, 'success');
  };

  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'delivered': return 'from-green-500 to-emerald-400';
      case 'in transit': return 'from-[#E65100] to-[#FFD700]';
      case 'out for delivery': return 'from-[#FF8F00] to-[#E65100]';
      case 'processing': return 'from-blue-500 to-cyan-400';
      case 'delayed': return 'from-red-500 to-red-400';
      case 'cancelled': return 'from-gray-500 to-gray-400';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'delivered': return <FaCheckCircle className="text-white/95" />;
      case 'in transit': return <FaTruckLoading className="text-white/95 animate-bounce" />;
      case 'out for delivery': return <FaShippingFast className="text-white/95 animate-pulse" />;
      default: return <FaBox className="text-white/95" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Filter orders for admin view
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = searchTerm === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Statistics
  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    inTransit: orders.filter(o => o.status === 'In Transit').length,
    processing: orders.filter(o => o.status === 'Processing').length,
    delayed: orders.filter(o => o.status === 'Delayed').length
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-x-hidden">
        {/* Admin Toggle Button */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setIsAdminMode(!isAdminMode)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg ${
              isAdminMode 
                ? 'bg-gradient-to-r from-[#E65100] to-[#FFD700] text-white' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {isAdminMode ? 'Switch to User Mode' : 'Admin Dashboard'}
          </button>
        </div>

        {/* Live Updates Toggle */}
        {isAdminMode && (
          <div className="fixed top-4 left-4 z-50 bg-white rounded-lg shadow-lg p-2 flex items-center gap-2">
            <FaSync className={`${liveUpdates ? 'animate-spin text-[#E65100]' : 'text-gray-400'}`} />
            <button
              onClick={() => setLiveUpdates(!liveUpdates)}
              className={`px-3 py-1 rounded text-sm font-semibold ${
                liveUpdates ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Live Updates: {liveUpdates ? 'ON' : 'OFF'}
            </button>
          </div>
        )}

        {!isAdminMode ? (
          // User Tracking View
          <>
            <header className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white/95 overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full" 
                  style={{
                    backgroundImage: 'radial-gradient(circle at 25px 25px, #E65100 2%, transparent 2%), radial-gradient(circle at 75px 75px, #A0A1A2 2%, transparent 2%)',
                    backgroundSize: '100px 100px'
                  }}>
                </div>
              </div>
              
              <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20">
                <div className="max-w-4xl mx-auto text-center">
                  <h1 className="text-xl sm:text-3xl md:text-5xl font-light mb-4 sm:mb-5 leading-snug tracking-wide text-white/70 font-medium">
                    Track{" "}
                    <span className="bg-gradient-to-r from-[#FF8F00] to-[#FFD700] bg-clip-text text-transparent font-medium">
                      Shipments
                    </span>
                    <br />
                    <span className="text-white/60 font-medium">
                      In Real-Time
                    </span>
                  </h1>

                  <p className="text-xs sm:text-sm md:text-base max-w-xl mx-auto text-gray-400 mb-6 sm:mb-8 leading-relaxed px-2">
                    Advanced tracking technology for precise, reliable, and transparent shipment monitoring worldwide.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto mt-8 sm:mt-12 md:mt-16">
                    <div className="text-center relative group">
                      <div className="relative bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
                        <div className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-1 sm:mb-2">{stats.total}+</div>
                        <div className="text-gray-400 text-xs sm:text-sm">Active Shipments</div>
                      </div>
                    </div>
                    <div className="text-center relative group">
                      <div className="relative bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
                        <div className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-1 sm:mb-2">90+</div>
                        <div className="text-gray-400 text-xs sm:text-sm">Countries</div>
                      </div>
                    </div>
                    <div className="text-center relative group">
                      <div className="relative bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
                        <div className="text-2xl sm:text-3xl font-bold text-[#FFD700] mb-1 sm:mb-2">99.8%</div>
                        <div className="text-gray-400 text-xs sm:text-sm">Accuracy</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <main className="relative -mt-8 sm:-mt-12 md:-mt-16">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                  {/* Tracking Input */}
                  <div className="relative mb-12 sm:mb-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#E65100] to-[#FFD700] rounded-2xl sm:rounded-3xl blur-2xl opacity-20"></div>
                    <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-100">
                      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
                        <div className="flex-1 w-full">
                          <div className="flex items-center mb-4 sm:mb-6">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#E65100] to-[#FFD700] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                              <FaSearch className="text-white/95 text-lg sm:text-2xl" />
                            </div>
                            <div>
                              <h2 className="text-lg sm:text-xl md:text-2xl font-light text-gray-600 tracking-wide">
                                Enter Tracking Number
                              </h2>
                              <p className="text-gray-500/80 mt-1 sm:mt-2 flex items-center font-light text-xs sm:text-sm">
                                <FaShieldAlt className="mr-2 text-[#E65100]/80 text-xs" />
                                Secure & encrypted tracking
                              </p>
                            </div>
                          </div>
                          
                          <div className="relative group">
                            <input
                              ref={inputRef}
                              type="text"
                              value={trackingId}
                              onChange={(e) => setTrackingId(e.target.value)}
                              onKeyPress={handleKeyPress}
                              placeholder="Enter tracking number (e.g., TRK789012345)"
                              className={`w-full pl-12 sm:pl-14 pr-10 sm:pr-12 py-4 sm:py-5 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-4 transition-all duration-300 text-sm sm:text-base placeholder-gray-400 ${
                                error && !trackingInfo 
                                  ? 'border-red-400 focus:border-red-500 focus:ring-red-200' 
                                  : 'border-gray-200 focus:border-[#E65100] focus:ring-[#E65100]/20'
                              }`}
                            />
                            <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2">
                              <FaBox className="text-[#E65100] text-base sm:text-xl" />
                            </div>
                            <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                              <button 
                                onClick={handleTrack}
                                disabled={isLoading}
                                className="text-[#E65100] hover:text-[#FF8F00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {isLoading ? (
                                  <div className="w-4 h-4 border-2 border-[#E65100] border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <FaChevronRight />
                                )}
                              </button>
                            </div>
                          </div>
                          {error && !trackingInfo && (
                            <p className="mt-2 text-xs sm:text-sm text-red-500 flex items-center">
                              <FaTimes className="mr-1 text-red-500" /> {error}
                            </p>
                          )}
                          
                          <div className="mt-6 sm:mt-8">
                            <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3 flex items-center">
                              <FaBell className="mr-2 text-[#E65100] text-xs sm:text-sm" />
                              Quick access tracking numbers:
                            </p>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                              {orders.slice(0, 4).map((order) => (
                                <button
                                  key={order.id}
                                  onClick={() => {
                                    setTrackingId(order.id);
                                    setTimeout(() => handleTrack(), 100);
                                  }}
                                  className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-gray-50 to-white border border-gray-200 hover:border-[#E65100] hover:from-[#E65100]/5 hover:to-white rounded-lg sm:rounded-xl text-xs sm:text-sm text-gray-700 hover:text-gray-900 font-medium transition-all duration-300 hover:shadow-md group"
                                >
                                  <span className="group-hover:text-[#E65100] transition-colors">{order.id}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <button
                          onClick={handleTrack}
                          disabled={isLoading}
                          className="group relative overflow-hidden bg-gradient-to-r from-[#E65100] to-[#FFD700] hover:from-[#FF8F00] hover:to-[#E65100] text-white/95 font-semibold py-3 px-6 text-sm sm:text-base transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center justify-center shadow-lg w-full lg:w-auto disabled:opacity-70 disabled:hover:scale-100"
                        >
                          <span className="relative z-10 flex items-center">
                            {isLoading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                Tracking...
                              </>
                            ) : (
                              <>
                                <FaSearch className="mr-3" />
                                Track Now
                              </>
                            )}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tracking Results */}
                  {trackingInfo && (
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-8 sm:mb-12">
                      {/* Status Header */}
                      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                        <div className="relative p-5 sm:p-6 md:p-8 lg:p-10">
                          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
                            <div className="w-full lg:w-auto">
                              <div className="flex items-center mb-3 sm:mb-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-[#E65100] to-[#FFD700] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                                  {getStatusIcon(trackingInfo.status)}
                                </div>
                                <div>
                                  <h2 className="text-lg sm:text-xl md:text-2xl font-light text-white/70 tracking-wide">
                                    Shipment Status
                                  </h2>
                                  <p className="text-gray-400/80 font-light text-xs sm:text-sm mt-0.5">
                                    Updated in real-time
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:space-x-4">
                                <div className="flex items-center gap-2">
                                  <code className="bg-gray-800/50 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-mono text-[#FFD700] font-bold border border-gray-700 text-xs sm:text-sm break-all">
                                    {trackingInfo.id}
                                  </code>
                                  <button
                                    onClick={copyTrackingId}
                                    className="p-1.5 sm:p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors text-gray-400 hover:text-[#FFD700]"
                                    title="Copy tracking number"
                                  >
                                    {copiedId ? <FaCheck className="text-green-400" /> : <FaCopy />}
                                  </button>
                                </div>
                                <span className="text-gray-400 text-xs sm:text-sm">| Last updated: {trackingInfo.lastUpdated}</span>
                              </div>
                            </div>
                            
                            <div className="relative group w-full lg:w-auto">
                              <div className={`relative px-5 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-xl border-2 border-white/20 bg-gradient-to-r ${getStatusColor(trackingInfo.status)} flex items-center justify-center w-full lg:w-auto`}>
                                <span className="relative z-10 flex items-center text-white/95">
                                  {getStatusIcon(trackingInfo.status)}
                                  <span className="ml-2 sm:ml-3">{trackingInfo.status}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="p-5 sm:p-6 md:p-8 lg:p-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10">
                          <div className="group relative">
                            <div className="relative p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl border border-gray-200 group-hover:border-[#E65100] transition-all duration-300 shadow-sm">
                              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-[#E65100] to-[#FFD700] rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <FaMapMarkerAlt className="text-white/95 text-base sm:text-xl" />
                              </div>
                              <h3 className="font-bold text-base sm:text-lg text-gray-700 mb-1 sm:mb-2">Origin</h3>
                              <p className="text-gray-900 text-lg sm:text-xl font-bold mb-1 sm:mb-2 break-words">{trackingInfo.origin}</p>
                              <p className="text-xs sm:text-sm text-gray-500">Pickup completed</p>
                            </div>
                          </div>
                          <div className="group relative">
                            <div className="relative p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl border border-gray-200 group-hover:border-[#E65100] transition-all duration-300 shadow-sm">
                              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-[#FF8F00] to-[#FFD700] rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <FaMapMarkerAlt className="text-white/95 text-base sm:text-xl" />
                              </div>
                              <h3 className="font-bold text-base sm:text-lg text-gray-700 mb-1 sm:mb-2">Destination</h3>
                              <p className="text-gray-900 text-lg sm:text-xl font-bold mb-1 sm:mb-2 break-words">{trackingInfo.destination}</p>
                              <p className="text-xs sm:text-sm text-gray-500">Final destination</p>
                            </div>
                          </div>
                          <div className="group relative">
                            <div className="relative p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl border border-gray-200 group-hover:border-[#E65100] transition-all duration-300 shadow-sm">
                              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <FaCalendarAlt className="text-white/95 text-base sm:text-xl" />
                              </div>
                              <h3 className="font-bold text-base sm:text-lg text-gray-700 mb-1 sm:mb-2">ETA</h3>
                              <p className="text-gray-900 text-lg sm:text-xl font-bold mb-1 sm:mb-2">{formatDate(trackingInfo.estimatedDelivery)}</p>
                              <p className="text-xs sm:text-sm text-gray-500">{trackingInfo.status === 'Delivered' ? 'Delivered on time' : 'Estimated delivery'}</p>
                            </div>
                          </div>
                          <div className="group relative">
                            <div className="relative p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl border border-gray-200 group-hover:border-[#E65100] transition-all duration-300 shadow-sm">
                              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-[#E65100] to-[#FFD700] rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <FaTruckLoading className="text-white/95 text-base sm:text-xl" />
                              </div>
                              <h3 className="font-bold text-base sm:text-lg text-gray-700 mb-1 sm:mb-2">Current Location</h3>
                              <p className="text-gray-900 text-lg sm:text-xl font-bold mb-1 sm:mb-2 break-words">{trackingInfo.currentLocation}</p>
                              <p className="text-xs sm:text-sm text-gray-500">{trackingInfo.status === 'Delivered' ? 'Delivered' : 'In transit'}</p>
                            </div>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="mb-10 sm:mb-12">
                          <div className="flex items-center mb-6 sm:mb-8 md:mb-10">
                            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-[#E65100] to-[#FFD700] rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg">
                              <FaClipboardList className="text-white/95 text-base sm:text-xl" />
                            </div>
                            <div>
                              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Shipment Journey</h3>
                              <p className="text-gray-600 text-xs sm:text-sm">Step-by-step tracking history</p>
                            </div>
                          </div>
                          
                          <div className="relative">
                            <div className="absolute left-3 sm:left-4 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E65100] via-[#FFD700] to-gray-200">
                              <div 
                                className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#E65100] to-[#FFD700] transition-all duration-500"
                                style={{ 
                                  height: `${(trackingInfo.history.filter(e => e.completed).length / trackingInfo.history.length) * 100}%`
                                }}
                              ></div>
                            </div>
                            
                            <div className="space-y-5 sm:space-y-6 ml-10 sm:ml-12 md:ml-16">
                              {trackingInfo.history.map((event, index) => (
                                <div key={index} className="relative group">
                                  <div className={`absolute -left-10 sm:-left-12 md:-left-16 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 ${
                                    event.completed 
                                      ? 'bg-gradient-to-r from-[#E65100] to-[#FFD700]' 
                                      : 'bg-gradient-to-r from-gray-300 to-gray-400'
                                  }`}>
                                    {event.completed ? (
                                      <FaCheckCircle className="text-white/95 text-xs sm:text-sm md:text-lg" />
                                    ) : (
                                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/95 rounded-full"></div>
                                    )}
                                  </div>
                                  
                                  <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-300 group-hover:-translate-y-1 ${
                                    event.completed 
                                      ? 'bg-gradient-to-br from-white to-gray-50 border-l-2 sm:border-l-4 border-[#E65100]' 
                                      : 'bg-gradient-to-br from-gray-50/50 to-white/50'
                                  }`}>
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-2 sm:mb-4">
                                      <div className="flex flex-wrap items-center gap-2">
                                        <span className={`font-bold text-sm sm:text-base md:text-lg ${
                                          event.completed ? 'text-gray-900' : 'text-gray-600'
                                        }`}>
                                          {event.status}
                                        </span>
                                        {event.completed && (
                                          <span className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full font-semibold">
                                            ✓ Completed
                                          </span>
                                        )}
                                      </div>
                                      <span className="text-gray-600 font-medium text-xs sm:text-sm bg-gray-100 px-2 sm:px-3 py-1 rounded-lg">
                                        {event.date}
                                      </span>
                                    </div>
                                    <div className="flex items-center text-gray-700 text-xs sm:text-sm">
                                      <FaMapMarkerAlt className="mr-2 sm:mr-3 text-[#E65100] text-xs sm:text-sm" />
                                      <p className="font-medium break-words">{event.location}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Customer and Package Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 hover:border-[#E65100] transition-all duration-300">
                            <div className="flex items-center mb-3 sm:mb-5">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                                <FaUsers className="text-white/95 text-sm sm:text-base" />
                              </div>
                              <h4 className="font-medium text-sm sm:text-base text-gray-700">Customer Details</h4>
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                              <p className="text-gray-700 font-medium text-sm sm:text-base">{trackingInfo.customer?.name || 'N/A'}</p>
                              <p className="text-gray-500 text-xs sm:text-sm">{trackingInfo.customer?.email || 'N/A'}</p>
                              <p className="text-gray-500 text-xs sm:text-sm">{trackingInfo.customer?.phone || 'N/A'}</p>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 hover:border-[#E65100] transition-all duration-300">
                            <div className="flex items-center mb-3 sm:mb-5">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-400 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                                <FaBox className="text-white/95 text-sm sm:text-base" />
                              </div>
                              <h4 className="font-bold text-base sm:text-lg text-gray-900">Package Specs</h4>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                                  <p className="text-[10px] sm:text-xs text-gray-500">Weight</p>
                                  <p className="font-bold text-gray-900 text-xs sm:text-sm">{trackingInfo.weight}</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                                  <p className="text-[10px] sm:text-xs text-gray-500">Dimensions</p>
                                  <p className="font-bold text-gray-900 text-xs sm:text-sm break-words">{trackingInfo.dimensions}</p>
                                </div>
                              </div>
                              <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                                <p className="text-[10px] sm:text-xs text-gray-500">Service Type</p>
                                <p className="font-bold text-gray-900 text-xs sm:text-sm flex items-center flex-wrap gap-1">
                                  {trackingInfo.serviceType}
                                  <span className="text-[10px] sm:text-xs bg-[#E65100]/10 text-[#E65100] px-2 py-0.5 rounded">Active</span>
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 hover:border-[#E65100] transition-all duration-300">
                            <div className="flex items-center mb-3 sm:mb-5">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg sm:rounded-xl flex items-center justify-center mr-3 sm:mr-4">
                                <FaShieldAlt className="text-white/95 text-sm sm:text-base" />
                              </div>
                              <h4 className="font-bold text-base sm:text-lg text-gray-900">Security & Actions</h4>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-emerald-100">
                                <p className="text-xs sm:text-sm text-gray-700 mb-1">
                                  <span className="font-bold">Insurance:</span> $1,500 Coverage
                                </p>
                                <p className="text-[10px] sm:text-xs text-gray-500">Fully insured shipment</p>
                              </div>
                              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <button 
                                  onClick={() => {
                                    const link = document.createElement('a');
                                    link.href = '#';
                                    link.download = `shipping-label-${trackingInfo.id}.pdf`;
                                    link.click();
                                    showNotification('Shipping label downloaded successfully!', 'success');
                                  }}
                                  className="flex-1 bg-gradient-to-r from-gray-100 to-white border border-gray-200 text-gray-700 font-semibold py-2 sm:py-3 rounded-lg sm:rounded-xl hover:border-[#E65100] hover:text-[#E65100] transition-all duration-300 flex items-center justify-center text-xs sm:text-sm"
                                >
                                  <FaDownload className="mr-1 sm:mr-2 text-xs sm:text-sm" />
                                  Label
                                </button>
                                <button 
                                  onClick={async () => {
                                    if (navigator.share) {
                                      try {
                                        await navigator.share({
                                          title: 'Shipment Tracking',
                                          text: `Track your shipment ${trackingInfo.id}`,
                                          url: window.location.href,
                                        });
                                        showNotification('Tracking shared successfully!', 'success');
                                      } catch (err) {
                                        console.log('Share cancelled');
                                      }
                                    } else {
                                      await navigator.clipboard.writeText(`${trackingInfo.id}: ${window.location.href}`);
                                      showNotification('Tracking link copied to clipboard!', 'success');
                                    }
                                  }}
                                  className="flex-1 bg-gradient-to-r from-gray-100 to-white border border-gray-200 text-gray-700 font-semibold py-2 sm:py-3 rounded-lg sm:rounded-xl hover:border-[#E65100] hover:text-[#E65100] transition-all duration-300 flex items-center justify-center text-xs sm:text-sm"
                                >
                                  <FaShare className="mr-1 sm:mr-2 text-xs sm:text-sm" />
                                  Share
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="bg-gradient-to-r from-gray-50 to-white p-4 sm:p-6 border-t border-gray-200">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
                          <div className="flex items-center w-full md:w-auto justify-center md:justify-start mb-3 md:mb-0">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-[#E65100] to-[#FFD700] rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-3">
                              <FaHeadphones className="text-white/95 text-xs sm:text-sm" />
                            </div>
                            <div>
                              <p className="text-gray-700 font-medium text-xs sm:text-sm">Need assistance?</p>
                              <button 
                                onClick={() => {
                                  setShowContactSupport(true);
                                  showNotification('Contact support team for assistance', 'info');
                                }}
                                className="text-[#E65100] font-semibold hover:underline text-xs sm:text-sm"
                              >
                                Contact our support team
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
                            <button 
                              onClick={() => window.print()}
                              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-gray-100 to-white border-2 border-gray-200 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:border-[#E65100] hover:text-[#E65100] hover:shadow-lg transition-all duration-300 flex items-center justify-center text-xs sm:text-sm"
                            >
                              <FaPrint className="mr-2 text-xs sm:text-sm" />
                              Print Details
                            </button>
                            <button 
                              onClick={async () => {
                                if (navigator.share) {
                                  try {
                                    await navigator.share({
                                      title: 'Shipment Tracking',
                                      text: `Track your shipment ${trackingInfo.id}`,
                                      url: window.location.href,
                                    });
                                    showNotification('Tracking shared successfully!', 'success');
                                  } catch (err) {
                                    console.log('Share cancelled');
                                  }
                                } else {
                                  await navigator.clipboard.writeText(`${trackingInfo.id}: ${window.location.href}`);
                                  showNotification('Tracking link copied to clipboard!', 'success');
                                }
                              }}
                              className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#E65100] to-[#FFD700] text-white/95 font-semibold rounded-lg sm:rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center text-xs sm:text-sm group"
                            >
                              <FaShare className="mr-2 group-hover:rotate-12 transition-transform text-xs sm:text-sm" />
                              Share Tracking
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Empty State */}
                  {!trackingInfo && !isLoading && !error && (
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-8 sm:mb-12 p-8 sm:p-12 text-center">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <FaSearch className="text-gray-400 text-2xl sm:text-3xl" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">No Tracking Information</h3>
                      <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto">
                        Enter a tracking number above to view your shipment details and real-time status.
                      </p>
                      <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 justify-center">
                        {orders.slice(0, 2).map((order) => (
                          <button
                            key={order.id}
                            onClick={() => {
                              setTrackingId(order.id);
                              setTimeout(() => handleTrack(), 100);
                            }}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs sm:text-sm text-gray-700 transition-colors"
                          >
                            Try {order.id}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Loading State */}
                  {isLoading && (
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-8 sm:mb-12 p-8 sm:p-12 text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-200 border-t-[#E65100] rounded-full animate-spin mx-auto mb-4 sm:mb-6"></div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">Tracking Shipment</h3>
                      <p className="text-gray-500 text-sm sm:text-base">Please wait while we fetch your tracking information...</p>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </>
        ) : (
          // Admin Dashboard View
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage and track all orders in real-time</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Orders</p>
                    <p className="text-3xl font-bold">{stats.total}</p>
                  </div>
                  <FaChartLine className="text-4xl opacity-50" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Delivered</p>
                    <p className="text-3xl font-bold">{stats.delivered}</p>
                  </div>
                  <FaCheckCircle className="text-4xl opacity-50" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-[#E65100] to-[#FFD700] rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">In Transit</p>
                    <p className="text-3xl font-bold">{stats.inTransit}</p>
                  </div>
                  <FaTruckLoading className="text-4xl opacity-50" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Processing</p>
                    <p className="text-3xl font-bold">{stats.processing}</p>
                  </div>
                  <FaClock className="text-4xl opacity-50" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-red-400 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Delayed</p>
                    <p className="text-3xl font-bold">{stats.delayed}</p>
                  </div>
                  <FaClock className="text-4xl opacity-50" />
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex gap-4 w-full md:w-auto">
                  <button
                    onClick={() => setShowAddOrder(true)}
                    className="px-4 py-2 bg-gradient-to-r from-[#E65100] to-[#FFD700] text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <FaPlus /> Add New Order
                  </button>
                  <div className="relative flex-1 md:w-64">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by ID or customer..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E65100]"
                    />
                  </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-3 py-2 rounded-lg font-semibold transition-all ${filterStatus === 'all' ? 'bg-[#E65100] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    All
                  </button>
                  {STATUS_OPTIONS.map(status => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status.toLowerCase())}
                      className={`px-3 py-2 rounded-lg font-semibold transition-all text-sm ${filterStatus === status.toLowerCase() ? 'bg-[#E65100] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From → To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <code className="font-mono text-sm font-bold text-gray-900">{order.id}</code>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                          <div className="text-xs text-gray-500">{order.customer.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'In Transit' ? 'bg-orange-100 text-orange-800' :
                            order.status === 'Out for Delivery' ? 'bg-yellow-100 text-yellow-800' :
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.origin} → {order.destination}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.estimatedDelivery)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.lastUpdated}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingOrder(order)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                            <button
                              onClick={() => {
                                setTrackingId(order.id);
                                setIsAdminMode(false);
                                setTimeout(() => handleTrack(), 100);
                              }}
                              className="text-[#E65100] hover:text-[#FF8F00]"
                              title="View Tracking"
                            >
                              <FaSearch />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Edit Order</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E65100]"
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
                  <input
                    type="text"
                    value={editingOrder.currentLocation}
                    onChange={(e) => setEditingOrder({...editingOrder, currentLocation: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E65100]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery</label>
                  <input
                    type="date"
                    value={editingOrder.estimatedDelivery}
                    onChange={(e) => setEditingOrder({...editingOrder, estimatedDelivery: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E65100]"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleUpdateOrder(editingOrder.id, editingOrder)}
                  className="flex-1 bg-gradient-to-r from-[#E65100] to-[#FFD700] text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <FaSave className="inline mr-2" /> Save Changes
                </button>
                <button
                  onClick={() => setEditingOrder(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Order Modal */}
      {showAddOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Add New Order</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                  <input
                    type="text"
                    value={newOrder.id}
                    onChange={(e) => setNewOrder({...newOrder, id: e.target.value})}
                    placeholder="e.g., TRK123456789"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E65100]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={newOrder.customer.name}
                    onChange={(e) => setNewOrder({...newOrder, customer: {...newOrder.customer, name: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E65100]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
                  <input
                    type="email"
                    value={newOrder.customer.email}
                    onChange={(e) => setNewOrder({...newOrder, customer: {...newOrder.customer, email: e.target.value}})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E65100]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                  <input
                    type="text"
                    value={newOrder.origin}
                    onChange={(e) => setNewOrder({...newOrder, origin: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E65100]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input
                    type="text"
                    value={newOrder.destination}
                    onChange={(e) => setNewOrder({...newOrder, destination: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E65100]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newOrder.status}
                    onChange={(e) => setNewOrder({...newOrder, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E65100]"
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddOrder}
                  className="flex-1 bg-gradient-to-r from-[#E65100] to-[#FFD700] text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  <FaPlus className="inline mr-2" /> Add Order
                </button>
                <button
                  onClick={() => setShowAddOrder(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Popup */}
      {showPopup && (
        <div className="fixed bottom-4 right-4 z-50 animate-fadeIn">
          <div className={`rounded-lg shadow-lg p-4 ${
            popupType === 'success' ? 'bg-green-500' :
            popupType === 'error' ? 'bg-red-500' :
            'bg-[#E65100]'
          } text-white max-w-sm`}>
            <div className="flex items-center">
              {popupType === 'success' && <FaCheckCircle className="mr-2" />}
              {popupType === 'error' && <FaTimes className="mr-2" />}
              {popupType === 'info' && <FaBell className="mr-2" />}
              <p className="text-sm">{popupMessage}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @media print {
          header, .fixed, button:not(.no-print) {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}