"use client";

import { useState, useCallback } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTruckLoading,
  FaClipboardList,
  FaBox,
  FaShippingFast,
  FaCheckCircle,
  FaChevronRight,
  FaShare,
  FaPrint,
  FaShieldAlt,
  FaBell,
  FaTimes,
  FaPhone,
  FaCopy,
  FaCheck,
  FaRoute,
  FaTruck,
  FaUser,
  FaClock,
} from "react-icons/fa";

const TRACKING_DATABASE = {
  TRK123456789: {
    id: "TRK123456789",
    status: "Delivered",
    estimatedDelivery: "2024-01-18",
    currentLocation: "Boston, MA",
    origin: "Seattle, WA",
    destination: "Boston, MA",
    weight: "75 kg",
    dimensions: "100 × 60 × 40 cm",
    carrier: "Invictus Logistics Express",
    serviceType: "Standard Delivery",
    lastUpdated: "2024-01-18 15:30",
    customer: {
      name: "John Smith",
      phone: "+1 (555) 123-4567",
    },
    history: [
      { date: "2024-01-15 08:30", status: "Picked Up", location: "Seattle Warehouse", completed: true },
      { date: "2024-01-15 14:20", status: "Processing", location: "Seattle Hub", completed: true },
      { date: "2024-01-16 09:45", status: "Departed", location: "Seattle Airport", completed: true },
      { date: "2024-01-17 13:30", status: "Arrived", location: "Boston Hub", completed: true },
      { date: "2024-01-18 09:15", status: "Out for Delivery", location: "Boston Area", completed: true },
      { date: "2024-01-18 14:00", status: "Delivered", location: "Boston, MA", completed: true },
    ],
  },

  TRK789012345: {
    id: "TRK789012345",
    status: "In Transit",
    estimatedDelivery: "2024-01-20",
    currentLocation: "Chicago Distribution Center",
    origin: "Seattle, WA",
    destination: "Boston, MA",
    weight: "150 kg",
    dimensions: "120 × 80 × 60 cm",
    carrier: "Invictus Logistics Express",
    serviceType: "Express Delivery",
    lastUpdated: "2024-01-19 16:30",
    customer: {
      name: "Sarah Johnson",
      phone: "+1 (555) 234-5678",
    },
    history: [
      { date: "2024-01-15 09:30", status: "Picked Up", location: "Seattle Warehouse", completed: true },
      { date: "2024-01-16 14:20", status: "Processing", location: "Seattle Hub", completed: true },
      { date: "2024-01-17 11:45", status: "Departed", location: "Seattle Airport", completed: true },
      { date: "2024-01-18 16:30", status: "Arrived", location: "Chicago Hub", completed: true },
      { date: "2024-01-19 09:15", status: "In Transit", location: "Chicago Distribution Center", completed: true },
      { date: "2024-01-20 14:00", status: "Out for Delivery", location: "Boston Area", completed: false },
      { date: "2024-01-20 18:00", status: "Delivered", location: "Destination", completed: false },
    ],
  },

  SL2024001234: {
    id: "SL2024001234",
    status: "Out for Delivery",
    estimatedDelivery: "2024-01-19",
    currentLocation: "Miami Distribution Center",
    origin: "Los Angeles, CA",
    destination: "Miami, FL",
    weight: "35 kg",
    dimensions: "80 × 50 × 30 cm",
    carrier: "Invictus Logistics Express",
    serviceType: "Same Day Delivery",
    lastUpdated: "2024-01-19 08:15",
    customer: {
      name: "Michael Brown",
      phone: "+1 (555) 345-6789",
    },
    history: [
      { date: "2024-01-18 10:00", status: "Picked Up", location: "Los Angeles Warehouse", completed: true },
      { date: "2024-01-18 15:30", status: "Processing", location: "Los Angeles Hub", completed: true },
      { date: "2024-01-18 20:45", status: "Departed", location: "Los Angeles Airport", completed: true },
      { date: "2024-01-19 06:30", status: "Arrived", location: "Miami Hub", completed: true },
      { date: "2024-01-19 09:00", status: "Out for Delivery", location: "Miami Area", completed: true },
      { date: "2024-01-19 17:00", status: "Delivered", location: "Miami, FL", completed: false },
    ],
  },
};

const orders = Object.values(TRACKING_DATABASE);

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const showNotification = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2500);
  };

  const handleTrack = useCallback(
    async (event) => {
      event?.preventDefault();

      const trimmedId = trackingId.trim().toUpperCase();

      if (!trimmedId) {
        setError("Please enter a tracking number");
        setTrackingInfo(null);
        return;
      }

      setIsLoading(true);
      setError("");

      await new Promise((resolve) => setTimeout(resolve, 700));

      const found = orders.find((order) => order.id === trimmedId);

      if (found) {
        setTrackingInfo(found);
        showNotification(`Tracking details found for ${trimmedId}`);
      } else {
        setTrackingInfo(null);
        setError(`Tracking number "${trimmedId}" not found.`);
      }

      setIsLoading(false);
    },
    [trackingId]
  );

  const handleQuickTrack = async (id) => {
    setTrackingId(id);
    setIsLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 400));

    const found = orders.find((order) => order.id === id);

    if (found) {
      setTrackingInfo(found);
      showNotification(`Tracking details found for ${id}`);
    } else {
      setTrackingInfo(null);
      setError(`Tracking number "${id}" not found.`);
    }

    setIsLoading(false);
  };

  const copyTrackingId = async () => {
    if (!trackingInfo?.id) return;

    await navigator.clipboard.writeText(trackingInfo.id);
    setCopiedId(true);
    showNotification("Tracking number copied!");
    setTimeout(() => setCopiedId(false), 1500);
  };

  const handleShare = async () => {
    if (!trackingInfo) return;

    const shareText = `Track shipment ${trackingInfo.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Invictus Logistics Tracking",
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled", error);
      }
    } else {
      await navigator.clipboard.writeText(`${shareText}: ${window.location.href}`);
      showNotification("Tracking link copied!");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const completedSteps =
    trackingInfo?.history?.filter((item) => item.completed).length || 0;

  const totalSteps = trackingInfo?.history?.length || 1;
  const progress = Math.round((completedSteps / totalSteps) * 100);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#FFF8EF] to-[#F3F5F7] text-[#2F343A]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[430px] bg-gradient-to-br from-[#FFF3E4] via-white to-[#F3F5F7]" />
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-[#F68B1F]/20 blur-[100px]" />
        <div className="absolute right-10 top-20 h-72 w-72 rounded-full bg-[#FFD700]/20 blur-[100px]" />

        <div className="relative mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_380px] lg:py-16">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F68B1F]/25 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#F68B1F] shadow-sm">
              <FaTruckLoading />
              Invictus Live Tracking
            </p>

            <h1 className="max-w-3xl text-4xl font-black leading-tight text-[#2F343A] sm:text-5xl lg:text-6xl">
              Track your shipment with{" "}
              <span className="text-[#F68B1F]">speed, clarity</span> and
              confidence.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#6F7780] sm:text-lg">
              Enter your tracking number to view shipment status, delivery
              progress, current location and full journey history.
            </p>

            <form
              onSubmit={handleTrack}
              className="mt-7 max-w-2xl rounded-[24px] border border-[#F68B1F]/20 bg-white/90 p-2 shadow-[0_18px_60px_rgba(246,139,31,0.14)] backdrop-blur"
            >
              <div className="flex flex-col gap-3 rounded-[20px] bg-[#FFF8EF] p-2 sm:flex-row">
                <div className="relative flex-1">
                  <FaBox className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F68B1F]" />

                  <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => {
                      setTrackingId(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter tracking number"
                    className="h-12 w-full rounded-2xl border border-[#F68B1F]/10 bg-white pl-12 pr-4 text-sm font-bold text-[#2F343A] outline-none transition placeholder:text-[#9AA2AA] focus:border-[#F68B1F]/60 focus:ring-4 focus:ring-[#F68B1F]/15"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#F68B1F] to-[#FFD700] px-6 text-sm font-black text-white shadow-[0_14px_30px_rgba(246,139,31,0.28)] transition hover:from-[#E76F00] hover:to-[#F68B1F] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <FaSearch />
                  )}
                  {isLoading ? "Tracking..." : "Track Now"}
                </button>
              </div>

              {error && (
                <p className="mt-3 flex items-center gap-2 px-2 text-sm font-bold text-red-500">
                  <FaTimes />
                  {error}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {orders.map((order) => (
                  <button
                    key={order.id}
                    type="button"
                    onClick={() => handleQuickTrack(order.id)}
                    className="rounded-full border border-[#D9DEE3] bg-white px-4 py-2 text-xs font-black text-[#6F7780] transition hover:border-[#F68B1F] hover:text-[#F68B1F]"
                  >
                    {order.id}
                  </button>
                ))}
              </div>
            </form>
          </div>

          <div className="mx-auto w-full max-w-[380px]">
            <div className="rounded-[36px] border border-[#F68B1F]/15 bg-white/80 p-4 shadow-[0_30px_90px_rgba(246,139,31,0.18)] backdrop-blur">
              <div className="overflow-hidden rounded-[30px] border border-[#F68B1F]/10 bg-white">
                <div className="p-5">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#9AA2AA]">Welcome to</p>
                      <h3 className="text-lg font-black text-[#2F343A]">
                        Invictus Logistics
                      </h3>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF3E4]">
                      <FaBell className="text-[#F68B1F]" />
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-[#D9DEE3] bg-[#FFF8EF] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#6F7780]">Current Order</p>
                        <h4 className="mt-1 text-xl font-black text-[#2F343A]">
                          {trackingInfo?.status || "Ready to Track"}
                        </h4>
                      </div>

                      <span className="rounded-full bg-[#F68B1F] px-4 py-2 text-xs font-black text-white">
                        Live
                      </span>
                    </div>

                    <p className="mb-5 text-xs text-[#9AA2AA]">
                      ID - {trackingInfo?.id || "TRK000000000"}
                    </p>

                    <div className="mb-5 flex items-center gap-2">
                      {[1, 2, 3, 4].map((item) => (
                        <div
                          key={item}
                          className={`h-2 flex-1 rounded-full ${
                            item <= Math.ceil(progress / 25)
                              ? "bg-[#F68B1F]"
                              : "bg-[#D9DEE3]"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <PreviewItem label="From" value={trackingInfo?.origin || "Warehouse"} />
                      <PreviewItem label="To" value={trackingInfo?.destination || "Destination"} />
                      <PreviewItem label="Carrier" value={trackingInfo?.carrier || "Invictus"} />
                      <PreviewItem
                        label="ETA"
                        value={
                          trackingInfo
                            ? formatDate(trackingInfo.estimatedDelivery)
                            : "18 Jan, 2025"
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <SmallPreviewCard
                      icon={<FaMapMarkerAlt />}
                      title="Location"
                      label="Current"
                      value={trackingInfo?.currentLocation || "Waiting"}
                    />

                    <div className="rounded-[22px] bg-gradient-to-r from-[#F68B1F] to-[#FFD700] p-4 text-white">
                      <FaShippingFast className="mb-3 text-3xl" />
                      <p className="text-xs text-white/80">Progress</p>
                      <p className="mt-1 text-sm font-black">{progress}% Done</p>
                    </div>
                  </div>
                </div>

                <div className="mx-5 mb-5 flex items-center justify-between rounded-full border border-[#D9DEE3] bg-[#FFF8EF] p-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F68B1F] text-white">
                    <FaRoute />
                  </div>

                  <span className="text-sm font-bold text-[#2F343A]">
                    Live Tracking
                  </span>

                  <div className="flex gap-1 text-[#F68B1F]">
                    <FaChevronRight />
                    <FaChevronRight />
                    <FaChevronRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {isLoading && (
        <section className="px-5 pb-10 sm:px-8">
          <div className="mx-auto max-w-[1180px] rounded-[34px] border border-[#F68B1F]/20 bg-white/90 p-8 text-center shadow-[0_18px_60px_rgba(246,139,31,0.10)]">
            <div className="mx-auto mb-5 h-16 w-16 animate-spin rounded-full border-4 border-[#D9DEE3] border-t-[#F68B1F]" />

            <h3 className="text-2xl font-black text-[#2F343A]">
              Tracking Shipment
            </h3>

            <p className="mt-2 text-sm font-medium text-[#6F7780]">
              Please wait while we fetch your shipment details.
            </p>
          </div>
        </section>
      )}

      {trackingInfo && !isLoading && (
        <section className="px-5 pb-20 sm:px-8">
          <div className="mx-auto max-w-[1180px]">
            <div className="overflow-hidden rounded-[34px] border border-[#F68B1F]/20 bg-white shadow-[0_25px_90px_rgba(246,139,31,0.12)]">
              <div className="grid gap-6 bg-gradient-to-r from-[#FFF3E4] via-white to-[#FFF8EF] p-6 md:grid-cols-[1fr_auto] md:p-8">
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#F68B1F] to-[#FFD700] text-white shadow-lg">
                      {trackingInfo.status === "Delivered" ? (
                        <FaCheckCircle />
                      ) : trackingInfo.status === "Out for Delivery" ? (
                        <FaShippingFast />
                      ) : (
                        <FaTruckLoading />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#6F7780]">
                        Shipment Status
                      </p>
                      <h2 className="text-2xl font-black text-[#2F343A]">
                        {trackingInfo.status}
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <code className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#F68B1F] shadow-sm">
                      {trackingInfo.id}
                    </code>

                    <button
                      type="button"
                      onClick={copyTrackingId}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#F68B1F] shadow-sm transition hover:bg-[#F68B1F] hover:text-white"
                    >
                      {copiedId ? <FaCheck /> : <FaCopy />}
                    </button>

                    <span className="text-sm font-medium text-[#6F7780]">
                      Last updated: {trackingInfo.lastUpdated}
                    </span>
                  </div>
                </div>

                <div className="rounded-[24px] border border-[#F68B1F]/20 bg-white p-5 text-center shadow-sm">
                  <p className="text-sm font-semibold text-[#6F7780]">
                    Delivery Progress
                  </p>

                  <h3 className="mt-1 text-4xl font-black text-[#F68B1F]">
                    {progress}%
                  </h3>

                  <div className="mt-4 h-2 w-full rounded-full bg-[#D9DEE3] md:w-52">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#F68B1F] to-[#FFD700]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <InfoCard icon={<FaMapMarkerAlt />} label="Origin" value={trackingInfo.origin} helper="Pickup location" />
                  <InfoCard icon={<FaMapMarkerAlt />} label="Destination" value={trackingInfo.destination} helper="Final location" />
                  <InfoCard icon={<FaCalendarAlt />} label="ETA" value={formatDate(trackingInfo.estimatedDelivery)} helper="Estimated delivery" />
                  <InfoCard icon={<FaTruck />} label="Current Location" value={trackingInfo.currentLocation} helper="Live shipment point" />
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="relative min-h-[420px] overflow-hidden rounded-[32px] bg-gradient-to-br from-white via-[#FFF8EF] to-[#FFF3E4] p-6 text-[#2F343A] border border-[#F68B1F]/20">
                    <div className="relative z-10 flex items-center justify-between gap-4">
                      <h3 className="text-xl font-black">Live Route</h3>

                      <span className="rounded-full bg-[#F68B1F]/10 px-4 py-2 text-xs font-bold text-[#F68B1F]">
                        {trackingInfo.serviceType}
                      </span>
                    </div>

                    <div className="relative z-10 mt-16">
                      <div className="mx-auto h-56 max-w-[420px]">
                        <svg viewBox="0 0 420 240" className="h-full w-full">
                          <path
                            d="M40 200 C70 80, 150 230, 210 120 S320 40, 370 120"
                            fill="none"
                            stroke="#F68B1F"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />
                          <circle cx="40" cy="200" r="15" fill="#F68B1F" />
                          <circle cx="370" cy="120" r="15" fill="#FFD700" />
                          <circle cx="370" cy="120" r="8" fill="#F68B1F" />
                        </svg>
                      </div>

                      <div className="mt-8 rounded-[26px] border border-[#F68B1F]/20 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold text-[#6F7780]">
                              Next Stop
                            </p>

                            <h4 className="mt-1 text-lg font-black">
                              {trackingInfo.currentLocation}
                            </h4>
                          </div>

                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#F68B1F] text-white">
                            <FaTruckLoading />
                          </div>
                        </div>

                        <div className="h-3 rounded-full bg-[#D9DEE3]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#F68B1F] to-[#FFD700]"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[32px] border border-[#F68B1F]/20 bg-[#FFF8EF] p-5 sm:p-6">
                    <h3 className="mb-5 text-xl font-black text-[#2F343A]">
                      Shipment Details
                    </h3>

                    <div className="grid gap-4">
                      <DetailRow icon={<FaUser />} label="Customer" value={trackingInfo.customer.name} />
                      <DetailRow icon={<FaPhone />} label="Phone" value={trackingInfo.customer.phone} />
                      <DetailRow icon={<FaBox />} label="Weight" value={trackingInfo.weight} />
                      <DetailRow icon={<FaClipboardList />} label="Dimensions" value={trackingInfo.dimensions} />
                      <DetailRow icon={<FaShieldAlt />} label="Carrier" value={trackingInfo.carrier} />
                      <DetailRow icon={<FaClock />} label="Service" value={trackingInfo.serviceType} />
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="flex items-center justify-center gap-2 rounded-2xl border border-[#D9DEE3] bg-white px-4 py-3 text-sm font-black text-[#2F343A] transition hover:border-[#F68B1F] hover:text-[#F68B1F]"
                      >
                        <FaPrint />
                        Print
                      </button>

                      <button
                        type="button"
                        onClick={handleShare}
                        className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#F68B1F] to-[#FFD700] px-4 py-3 text-sm font-black text-white transition hover:from-[#E76F00] hover:to-[#F68B1F]"
                      >
                        <FaShare />
                        Share
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-[32px] border border-[#F68B1F]/20 bg-white p-5 sm:p-7">
                  <div className="mb-7 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F68B1F] text-white">
                      <FaClipboardList />
                    </div>

                    <div>
                      <h3 className="text-xl font-black text-[#2F343A]">
                        Shipment Journey
                      </h3>

                      <p className="text-sm font-medium text-[#6F7780]">
                        Step-by-step tracking history
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute bottom-0 left-[17px] top-0 w-[2px] bg-[#D9DEE3]" />

                    <div className="space-y-5">
                      {trackingInfo.history.map((event, index) => (
                        <div key={index} className="relative flex gap-4">
                          <div
                            className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                              event.completed
                                ? "bg-[#F68B1F] text-white"
                                : "bg-[#F3F5F7] text-[#9AA2AA]"
                            }`}
                          >
                            {event.completed ? <FaCheckCircle /> : <FaBox />}
                          </div>

                          <div
                            className={`w-full rounded-2xl border p-4 ${
                              event.completed
                                ? "border-[#F68B1F]/20 bg-[#FFF8EF]"
                                : "border-[#D9DEE3] bg-[#F3F5F7]"
                            }`}
                          >
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                              <h4 className="font-black text-[#2F343A]">
                                {event.status}
                              </h4>

                              <span className="text-xs font-bold text-[#6F7780]">
                                {event.date}
                              </span>
                            </div>

                            <p className="mt-2 flex items-center gap-2 text-sm font-medium text-[#6F7780]">
                              <FaMapMarkerAlt className="text-[#F68B1F]" />
                              {event.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-[28px] border border-[#F68B1F]/20 bg-[#FFF8EF] p-5 sm:flex sm:items-center sm:justify-between sm:gap-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#F68B1F]">
                      <FaShieldAlt />
                    </div>

                    <div>
                      <h4 className="font-black text-[#2F343A]">
                        Need shipment support?
                      </h4>

                      <p className="text-sm font-medium text-[#6F7780]">
                        Contact our logistics team for delivery assistance.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => showNotification("Support request received!")}
                    className="mt-4 w-full rounded-2xl bg-[#2F343A] px-6 py-3 text-sm font-black text-white transition hover:bg-[#F68B1F] sm:mt-0 sm:w-auto"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {!trackingInfo && !isLoading && (
        <section className="px-5 pb-20 sm:px-8">
          <div className="mx-auto max-w-[1180px] rounded-[34px] border border-[#F68B1F]/20 bg-white/90 p-8 text-center shadow-[0_18px_60px_rgba(246,139,31,0.08)]">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF3E4] text-3xl text-[#F68B1F] shadow-sm">
              <FaSearch />
            </div>

            <h3 className="text-2xl font-black text-[#2F343A]">
              Track your shipment
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-relaxed text-[#6F7780]">
              Enter a tracking number above or click a quick tracking number to
              view live shipment details.
            </p>
          </div>
        </section>
      )}

      {showPopup && (
        <div className="fixed bottom-5 right-5 z-50 rounded-2xl bg-white px-5 py-4 text-sm font-black text-[#2F343A] shadow-2xl border border-[#F68B1F]/20">
          <div className="flex items-center gap-2">
            <FaBell className="text-[#F68B1F]" />
            {popupMessage}
          </div>
        </div>
      )}
    </main>
  );
}

function PreviewItem({ label, value }) {
  return (
    <div>
      <p className="mb-1 text-xs text-[#9AA2AA]">{label}</p>
      <p className="font-bold text-[#2F343A]">{value}</p>
    </div>
  );
}

function SmallPreviewCard({ icon, title, label, value }) {
  return (
    <div className="rounded-[22px] border border-[#D9DEE3] bg-white p-4">
      <div className="mb-3 text-3xl text-[#F68B1F]">{icon}</div>
      <p className="text-sm font-bold text-[#2F343A]">{title}</p>
      <p className="mt-2 text-xs text-[#9AA2AA]">{label}</p>
      <p className="mt-1 text-sm font-black text-[#2F343A]">{value}</p>
    </div>
  );
}

function InfoCard({ icon, label, value, helper }) {
  return (
    <div className="rounded-[26px] border border-[#F68B1F]/20 bg-[#FFF8EF] p-5 transition hover:-translate-y-1 hover:border-[#F68B1F]/50 hover:bg-white hover:shadow-[0_18px_45px_rgba(246,139,31,0.12)]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#F68B1F] to-[#FFD700] text-white">
        {icon}
      </div>

      <p className="text-sm font-bold text-[#6F7780]">{label}</p>

      <h3 className="mt-1 break-words text-lg font-black text-[#2F343A]">
        {value}
      </h3>

      <p className="mt-1 text-xs font-medium text-[#9AA2AA]">{helper}</p>
    </div>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F68B1F]/10 text-[#F68B1F]">
          {icon}
        </div>

        <span className="text-sm font-bold text-[#6F7780]">{label}</span>
      </div>

      <span className="text-right text-sm font-black text-[#2F343A]">
        {value}
      </span>
    </div>
  );
}