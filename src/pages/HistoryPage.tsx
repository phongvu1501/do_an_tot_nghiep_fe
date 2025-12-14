import React, { useState, useEffect } from "react";
import { Modal, Spin, Input, Select, message } from "antd";
import { orderService } from "../services/order/orderServices";
import type { OrderHistoryItem } from "../interfaces/order";
import colors from "../config/colors";

const HistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderHistoryItem | null>(
    null
  );
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState<number | null>(null);
  const [cancelOrder, setCancelOrder] = useState<OrderHistoryItem | null>(null);
  const [refundBank, setRefundBank] = useState<string>("");
  const [refundAccountNumber, setRefundAccountNumber] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [refundDays, setRefundDays] = useState<number>(1);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [imageModalSrc, setImageModalSrc] = useState<string>("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await orderService.getHistory();

        if (response.success && response.data) {
          setOrders(response.data);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((response as any).refund_days) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setRefundDays((response as any).refund_days);
          }
        } else {
          setError("Không thể tải lịch sử đặt bàn");
        }
      } catch (err) {
        console.error("Error", err);
        setError("Có lỗi xảy ra khi tải lịch sử đặt bàn");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadgeColor = (status: string) => {
    const statusConfig: Record<string, string> = {
      pending: "#f59e0b",
      confirmed: "#10b981",
      cancelled: "#ef4444",
      completed: "#6366f1",
      deposit_paid: "#3b82f6",
      deposit_pending: "#f97316",
    };

    return statusConfig[status.toLowerCase()] || "#6b7280";
  };

  const formatCurrency = (value: number | string) => {
    const numericValue =
      typeof value === "string" ? parseFloat(value) : value ?? 0;

    if (Number.isNaN(numericValue)) {
      return value;
    }

    return `${numericValue.toLocaleString("vi-VN")}đ`;
  };

  const hasValidDeposit = (value: number | null | undefined): boolean => {
    return value != null && value > 0;
  };

  const handleOrderClick = async (orderId: number) => {
    setDetailLoading(true);
    setDetailError(null);
    setSelectedOrder(null);

    try {
      const response = await orderService.getReservationDetail(orderId);

      if (response.success && response.data) {
        setSelectedOrder(response.data);
      } else {
        setDetailError(
          response.message || "Không thể tải chi tiết đơn đặt bàn."
        );
      }
    } catch (err) {
      console.error("Error", err);
      setDetailError("Có lỗi xảy ra khi tải chi tiết đơn đặt bàn.");
    } finally {
      setDetailLoading(false);
      setDetailModalVisible(true);
    }
  };

  const closeDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedOrder(null);
    setDetailError(null);
  };

  const handleCancelClick = (e: React.MouseEvent, order: OrderHistoryItem) => {
    e.stopPropagation();
    setCancelOrder(order);
    setCancelOrderId(order.id);
    setRefundBank("");
    setRefundAccountNumber("");
    setCancelModalVisible(true);
  };

  const handleCancelOrder = async () => {
    if (!cancelOrderId) return;

    // Nếu có thể hoàn tiền, kiểm tra ngân hàng và số tài khoản
    if (cancelOrder?.can_be_refunded) {
      if (!refundBank) {
        message.error("Vui lòng chọn ngân hàng!");
        return;
      }
      if (!refundAccountNumber.trim()) {
        message.error("Vui lòng nhập số tài khoản để hoàn tiền!");
        return;
      }
    }

    setCancelling(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = {};
      if (cancelOrder?.can_be_refunded) {
        data.refund_bank = refundBank;
        data.refund_account_number = refundAccountNumber.trim();
      }
      if (cancelOrder?.depsection) {
        data.cancellation_reason = cancelOrder.depsection;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await (orderService as any).cancelReservation(
        cancelOrderId,
        data
      );

      if (response.success) {
        message.success(response.message || "Đã hủy đơn đặt bàn thành công!");
        setCancelModalVisible(false);
        setCancelOrder(null);
        setCancelOrderId(null);
        setRefundBank("");
        setRefundAccountNumber("");
        // Reload danh sách
        const historyResponse = await orderService.getHistory();
        if (historyResponse.success && historyResponse.data) {
          setOrders(historyResponse.data);
        }
      } else {
        message.error(response.message || "Không thể hủy đơn đặt bàn");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      message.error(
        err.response?.data?.message ||
          "Có lỗi xảy ra khi hủy đơn đặt bàn. Vui lòng thử lại!"
      );
    } finally {
      setCancelling(false);
    }
  };

  const closeCancelModal = () => {
    setCancelModalVisible(false);
    setCancelOrder(null);
    setCancelOrderId(null);
    setRefundBank("");
    setRefundAccountNumber("");
  };

  const canCancelOrder = (order: OrderHistoryItem): boolean => {
    return order.status !== "completed" && order.status !== "cancelled";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: colors.primary.green }}
          ></div>
          <p className="text-gray-600">Đang tải lịch sử...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            style={{
              backgroundColor: colors.primary.green,
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary.yellow;
              e.currentTarget.style.color = colors.primary.green;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.primary.green;
              e.currentTarget.style.color = "white";
            }}
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen py-8">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">Chưa có đặt bàn nào</p>
              <p className="text-gray-500 text-sm mt-2">
                Bạn chưa có lịch sử đặt bàn tại nhà hàng
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => handleOrderClick(order.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOrderClick(order.id);
                    }
                  }}
                >
                  <div className="p-6 space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3
                          className="text-xl font-bold"
                          style={{ color: colors.primary.green }}
                        >
                          Mã đơn đặt bàn:{" "}
                          {order.reservation_code || `#${order.id}`}
                        </h3>
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                          style={{
                            backgroundColor: getStatusBadgeColor(order.status),
                          }}
                        >
                          {order.status_text}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Đặt lúc: {order.created_at}
                      </div>
                      {order.is_refunded && order.refunded_at && (
                        <div className="text-sm text-green-600 font-semibold flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Đã hoàn tiền: {order.refunded_at}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>
                          <strong>Ngày:</strong>{" "}
                          {formatDate(order.reservation_date)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          <strong>Ca:</strong> {order.shift_info.name} (
                          {order.shift_info.time})
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 flex gap-2 flex-wrap">
                      {order.status === "deposit_pending" &&
                        order.payment_url && (
                          <a
                            href={order.payment_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold transition-colors"
                            style={{
                              backgroundColor: colors.primary.yellow,
                              color: colors.primary.green,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                colors.primary.green;
                              e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                colors.primary.yellow;
                              e.currentTarget.style.color =
                                colors.primary.green;
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Thanh toán tiền cọc
                          </a>
                        )}
                      {canCancelOrder(order) && (
                        <button
                          onClick={(e) => handleCancelClick(e, order)}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-semibold transition-colors text-white"
                          style={{
                            backgroundColor: "#ef4444",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#dc2626";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#ef4444";
                          }}
                        >
                          Hủy đơn
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        open={detailModalVisible}
        onCancel={closeDetailModal}
        footer={null}
        centered
        width={600}
        title="Chi tiết đơn đặt bàn"
      >
        {detailLoading ? (
          <div className="flex items-center justify-center py-8">
            <Spin tip="Đang tải chi tiết..." />
          </div>
        ) : detailError ? (
          <p className="text-red-600 text-center py-4">{detailError}</p>
        ) : selectedOrder ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <h3
                className="text-lg font-semibold"
                style={{ color: colors.primary.green }}
              >
                Mã đặt bàn:{" "}
                {selectedOrder.reservation_code || `#${selectedOrder.id}`}
              </h3>
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                style={{
                  backgroundColor: getStatusBadgeColor(selectedOrder.status),
                }}
              >
                {selectedOrder.status_text}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              <div>
                <strong>Ngày:</strong>{" "}
                {formatDate(selectedOrder.reservation_date)}
              </div>
              <div>
                <strong>Ca:</strong> {selectedOrder.shift_info.name} (
                {selectedOrder.shift_info.time})
              </div>
              <div>
                <strong>Số người:</strong> {selectedOrder.num_people}
              </div>
              <div>
                <strong>Trạng thái:</strong> {selectedOrder.status_text}
              </div>
              {selectedOrder.status === "cancelled" &&
                selectedOrder.cancellation_reason && (
                  <>
                    {(() => {
                      const reason = selectedOrder.cancellation_reason;
                      const accountInfoMatch = reason.match(
                        /Số tài khoản hoàn tiền:\s*(.+)/
                      );
                      const accountInfo = accountInfoMatch
                        ? accountInfoMatch[1].trim()
                        : null;
                      const cancellationReasonOnly = accountInfoMatch
                        ? reason.substring(0, accountInfoMatch.index).trim()
                        : reason;

                      return (
                        <>
                          {cancellationReasonOnly && (
                            <div>
                              <strong>Lý do hủy:</strong>{" "}
                              {cancellationReasonOnly}
                            </div>
                          )}
                          {accountInfo && (
                            <div>
                              <strong>Tài khoản hoàn tiền:</strong>{" "}
                              <span className="text-blue-600 font-semibold">
                                {accountInfo}
                              </span>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </>
                )}
              {selectedOrder.voucher_code && (
                <div>
                  <strong>Voucher:</strong> {selectedOrder.voucher_code}
                </div>
              )}
              <div>
                <strong>Đặt lúc:</strong> {selectedOrder.created_at}
              </div>
              {selectedOrder.is_refunded && selectedOrder.refunded_at && (
                <div className="col-span-2">
                  <strong className="text-green-600">Đã hoàn tiền:</strong>{" "}
                  <span className="text-green-600 font-semibold">
                    {selectedOrder.refunded_at}
                  </span>
                </div>
              )}
            </div>
            {selectedOrder.depsection && (
              <div>
                <h4
                  className="text-sm font-semibold mb-2"
                  style={{ color: colors.primary.green }}
                >
                  Ghi chú
                </h4>
                <p className="text-sm text-gray-700">
                  {selectedOrder.depsection}
                </p>
              </div>
            )}

            {selectedOrder.menus && selectedOrder.menus.length > 0 && (
              <div>
                <h4
                  className="text-sm font-semibold mb-3"
                  style={{ color: colors.primary.green }}
                >
                  Món đã đặt
                </h4>
                <div className="space-y-2">
                  {selectedOrder.menus.map((menuItem) => (
                    <div
                      key={menuItem.id}
                      className="flex justify-between text-sm text-gray-700"
                    >
                      <span>
                        {menuItem.name} x{menuItem.quantity}
                      </span>
                      <span>{menuItem.total.toLocaleString("vi-VN")}đ</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tiền cọc */}
            {(hasValidDeposit(selectedOrder.table_deposit) ||
              hasValidDeposit(selectedOrder.food_deposit)) && (
              <div className="pt-4 border-t border-gray-200">
                <h4
                  className="text-sm font-semibold mb-3"
                  style={{ color: colors.primary.green }}
                >
                  Tiền cọc
                </h4>
                <div className="space-y-2 text-sm text-gray-700">
                  {hasValidDeposit(selectedOrder.table_deposit) && (
                    <div className="flex justify-between">
                      <span>Tiền cọc bàn:</span>
                      <span className="font-semibold">
                        {formatCurrency(selectedOrder.table_deposit!)}
                      </span>
                    </div>
                  )}
                  {hasValidDeposit(selectedOrder.food_deposit) && (
                    <div className="flex justify-between">
                      <span>Tiền cọc đồ ăn:</span>
                      <span className="font-semibold">
                        {formatCurrency(selectedOrder.food_deposit!)}
                      </span>
                    </div>
                  )}
                  {(hasValidDeposit(selectedOrder.table_deposit) ||
                    hasValidDeposit(selectedOrder.food_deposit)) && (
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="font-semibold">Tổng tiền cọc:</span>
                      <span
                        className="font-semibold"
                        style={{ color: colors.primary.green }}
                      >
                        {formatCurrency(
                          (hasValidDeposit(selectedOrder.table_deposit)
                            ? selectedOrder.table_deposit!
                            : 0) +
                            (hasValidDeposit(selectedOrder.food_deposit)
                              ? selectedOrder.food_deposit!
                              : 0)
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Chi tiết hóa đơn */}
            <div className="pt-4 border-t border-gray-200">
              <h4
                className="text-sm font-semibold mb-3"
                style={{ color: colors.primary.green }}
              >
                Chi tiết hóa đơn
              </h4>
              <div className="space-y-2 text-sm text-gray-700">
                {selectedOrder.subtotal != null && (
                  <div className="flex justify-between">
                    <span>Tổng tiền món ăn:</span>
                    <span>{formatCurrency(selectedOrder.subtotal)}</span>
                  </div>
                )}
                {selectedOrder.vat != null && selectedOrder.vat > 0 && (
                  <div className="flex justify-between">
                    <span>VAT (10%):</span>
                    <span>{formatCurrency(selectedOrder.vat)}</span>
                  </div>
                )}
                {selectedOrder.total_price != null && (
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold">Tổng tiền:</span>
                    <span className="font-semibold">
                      {formatCurrency(selectedOrder.total_price)}
                    </span>
                  </div>
                )}
                {selectedOrder.voucher_discount != null &&
                  selectedOrder.voucher_discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá voucher:</span>
                      <span className="font-semibold">
                        -{formatCurrency(selectedOrder.voucher_discount)}
                      </span>
                    </div>
                  )}
                {selectedOrder.final_amount != null && (
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-semibold">Thành tiền:</span>
                    <span
                      className="font-semibold"
                      style={{ color: colors.primary.green }}
                    >
                      {formatCurrency(selectedOrder.final_amount)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Thông tin hoàn tiền */}
            {(selectedOrder.is_refunded ||
              selectedOrder.refunded_at ||
              selectedOrder.refund_bill_image) && (
              <div className="pt-4 border-t border-gray-200">
                <h4
                  className="text-sm font-semibold mb-3 flex items-center gap-2"
                  style={{ color: colors.primary.green }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Thông tin hoàn tiền
                </h4>
                <div className="space-y-3">
                  {selectedOrder.refunded_at && (
                    <div className="text-sm text-gray-700">
                      <strong>Ngày hoàn tiền:</strong>{" "}
                      <span className="text-green-600 font-semibold">
                        {selectedOrder.refunded_at}
                      </span>
                    </div>
                  )}
                  {selectedOrder.refund_bill_image ? (
                    <div>
                      <strong className="text-sm text-gray-700 block mb-2">
                        Ảnh bill hoàn tiền:
                      </strong>
                      <div className="relative">
                        <img
                          src={selectedOrder.refund_bill_image}
                          alt="Ảnh bill hoàn tiền"
                          className="rounded-lg border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity max-w-full"
                          style={{ maxHeight: "300px" }}
                          onClick={() => {
                            setImageModalSrc(selectedOrder.refund_bill_image!);
                            setImageModalVisible(true);
                          }}
                          onError={(e) => {
                            e.currentTarget.src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%236b7280' font-family='Arial' font-size='14'%3EKhông thể tải ảnh%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 italic">
                      Chưa có ảnh bill hoàn tiền
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-sm text-gray-500">
            Không có thông tin chi tiết để hiển thị.
          </p>
        )}
      </Modal>

      {/* Modal xác nhận hủy đơn */}
      <Modal
        open={cancelModalVisible}
        onCancel={closeCancelModal}
        onOk={handleCancelOrder}
        okText="Xác nhận hủy"
        cancelText="Hủy"
        confirmLoading={cancelling}
        centered
        width={500}
        title={
          <span style={{ color: "#ef4444" }}>
            <svg
              className="w-5 h-5 inline-block mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Xác nhận hủy đơn đặt bàn
          </span>
        }
      >
        {cancelOrder && (
          <div className="space-y-4">
            <p>
              Bạn có chắc muốn hủy đơn đặt bàn{" "}
              <strong>
                {cancelOrder.reservation_code || `#${cancelOrder.id}`}
              </strong>
              ?
            </p>

            {cancelOrder.can_be_refunded &&
              cancelOrder.deposit &&
              (typeof cancelOrder.deposit === "number"
                ? cancelOrder.deposit > 0
                : parseFloat(cancelOrder.deposit || "0") > 0) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <svg
                      className="w-5 h-5 text-blue-600 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-blue-900 mb-1">
                        Thông tin hoàn tiền
                      </p>
                      <p className="text-sm text-blue-800 mb-3">
                        Số tiền cọc sẽ được hoàn:{" "}
                        <strong className="text-green-600">
                          {typeof cancelOrder.deposit === "number"
                            ? cancelOrder.deposit.toLocaleString("vi-VN")
                            : cancelOrder.deposit}{" "}
                          đ
                        </strong>
                      </p>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-blue-900 mb-1">
                            Ngân hàng <span className="text-red-500">*</span>
                          </label>
                          <Select
                            placeholder="Chọn ngân hàng"
                            value={refundBank}
                            onChange={(value) => setRefundBank(value)}
                            className="w-full"
                            options={[
                              { value: "mbank", label: "MBank" },
                              { value: "techcombank", label: "Techcombank" },
                              { value: "vietcombank", label: "Vietcombank" },
                              { value: "bidv", label: "BIDV" },
                              { value: "agribank", label: "Agribank" },
                              { value: "vietinbank", label: "VietinBank" },
                              { value: "acb", label: "ACB" },
                              { value: "vpbank", label: "VPBank" },
                              { value: "tpbank", label: "TPBank" },
                              { value: "shb", label: "SHB" },
                              { value: "hdbank", label: "HDBank" },
                              { value: "msb", label: "MSB" },
                              { value: "ocb", label: "OCB" },
                              { value: "vib", label: "VIB" },
                              { value: "seabank", label: "SeABank" },
                              { value: "eximbank", label: "Eximbank" },
                              { value: "scb", label: "SCB" },
                              { value: "vietabank", label: "VietABank" },
                              {
                                value: "lienvietpostbank",
                                label: "LienVietPostBank",
                              },
                              { value: "pvcombank", label: "PVcomBank" },
                              { value: "publicbank", label: "PublicBank" },
                              { value: "saigonbank", label: "SaigonBank" },
                            ]}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-blue-900 mb-1">
                            Số tài khoản <span className="text-red-500">*</span>
                          </label>
                          <Input
                            placeholder="Nhập số tài khoản"
                            value={refundAccountNumber}
                            onChange={(e) =>
                              setRefundAccountNumber(e.target.value)
                            }
                            maxLength={20}
                            className="w-full"
                          />
                          <p className="text-xs text-blue-600 mt-1">
                            Vui lòng kiểm tra kĩ thông tin{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {!cancelOrder.can_be_refunded &&
              cancelOrder.deposit &&
              (typeof cancelOrder.deposit === "number"
                ? cancelOrder.deposit > 0
                : parseFloat(cancelOrder.deposit || "0") > 0) && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <svg
                      className="w-5 h-5 text-yellow-600 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-yellow-900 mb-1">
                        Lưu ý về hoàn tiền
                      </p>
                      <p className="text-sm text-yellow-800">
                        Đơn này không đủ điều kiện để hoàn tiền cọc vì bạn hủy
                        quá gần ngày đặt bàn (
                        {/* <strong>
                        {Math.ceil(cancelOrder.days_until_reservation || 0)}{" "}
                        ngày
                      </strong> */}
                        tối thiểu:{" "}
                        <strong>
                          {cancelOrder.refund_days || refundDays} ngày
                        </strong>
                        ). Tiền cọc sẽ không được hoàn lại.
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </div>
        )}
      </Modal>

      {/* Modal xem ảnh bill hoàn tiền */}
      <Modal
        open={imageModalVisible}
        onCancel={() => setImageModalVisible(false)}
        footer={null}
        centered
        width={800}
        title="Ảnh bill hoàn tiền"
      >
        <div className="text-center">
          <img
            src={imageModalSrc}
            alt="Ảnh bill hoàn tiền"
            className="max-w-full h-auto rounded-lg"
            style={{ maxHeight: "70vh" }}
          />
        </div>
      </Modal>
    </>
  );
};

export default HistoryPage;
