import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { message, Spin, Button } from "antd";
import { voucherService } from "../services/vouchers/voucherServices";
import type { UserVoucher } from "../services/vouchers/types";

interface PointTier {
    id: number;
    name: string;
    points_required: number;
    discount_percent: number;
    min_order_value: string;
    max_discount_value: string;
    is_active: boolean;
}

export default function RedeemVouchers() {
    const { user, setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [vouchers, setVouchers] = useState<UserVoucher[]>([]);
    const [tiers, setTiers] = useState<PointTier[]>([]);
    const [redeemingTier, setRedeemingTier] = useState<number | null>(null);
    const [messageApi, contextHolder] = message.useMessage();

    const fetchUserVouchers = async () => {
        setIsLoading(true);
        try {
            const response = await voucherService.getUserVouchers();
            if (response.status && response.data) {
                setVouchers(response.data);
            } else {
                messageApi.error(response.message || "Lấy voucher thất bại");
            }
        } catch (err) {
            console.error(err);
            messageApi.error("Có lỗi xảy ra khi lấy voucher");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTiers = async () => {
        try {
            const response = await voucherService.getPointTiers();
            if (response.status && response.data) {
                setTiers(response.data);
            } else {
                messageApi.error(response.message || "Lấy danh sách tier thất bại");
            }
        } catch (err) {
            console.error(err);
            messageApi.error("Có lỗi xảy ra khi lấy danh sách tier");
        }
    };

    useEffect(() => {
        if (!user) return;
        fetchUserVouchers();
        fetchTiers();
    }, [user]);

    const handleRedeemPoints = async (tierId: number) => {
        if (!user || !setUser) return;

        setRedeemingTier(tierId);

        try {
            const response = await voucherService.redeemPoints(tierId);

            if (response.status && response.data) {
                setUser({
                    ...user,
                    points: response.data.remaining_points,
                });

                setVouchers(prev => [response.data.voucher, ...prev]);

                messageApi.success(response.message || "Đổi điểm thành công!");
            } else {
                messageApi.error(response.message || "Đổi điểm thất bại");
            }
        } catch (err) {
            console.error(err);
            messageApi.error("Có lỗi xảy ra khi đổi điểm");
        } finally {
            setRedeemingTier(null);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Vui lòng đăng nhập để xem voucher</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto">
            {contextHolder}
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Voucher của bạn</h1>
            <p className="mb-8 text-center text-gray-700 text-lg">
                Điểm hiện có: <strong className="text-blue-600">{user.points ?? 0}</strong>
            </p>

            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Đổi điểm lấy voucher</h2>
                {tiers.length === 0 ? (
                    <div className="flex justify-center">
                        <Spin tip="Đang tải tier..." />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {tiers.map((t) => (
                            <div
                                key={t.id}
                                className={`p-5 rounded-xl flex flex-col justify-between shadow-sm transition hover:shadow-lg ${t.is_active ? "bg-white" : "bg-gray-100"}`}
                            >
                                <div>
                                    <h3 className="font-semibold text-lg mb-2 text-gray-800">{t.name}</h3>
                                    <p className="text-gray-600 mb-1">Điểm cần: {t.points_required}</p>
                                    <p className="text-gray-600 mb-1">Giảm: {t.discount_percent}%</p>
                                    <p className="text-gray-600 mb-1">
                                        Giá trị đơn hàng sử dụng: {parseFloat(t.min_order_value).toLocaleString()}đ
                                    </p>
                                    <p className="text-gray-600 mb-1">
                                        Giá trị giảm tối đa: {parseFloat(t.max_discount_value).toLocaleString()}đ
                                    </p>
                                </div>
                                <Button
                                    className="mt-4"
                                    type="primary"
                                    block
                                    loading={redeemingTier === t.id}
                                    disabled={redeemingTier === t.id || !t.is_active || (user.points ?? 0) < t.points_required}
                                    onClick={() => handleRedeemPoints(t.id)}
                                >
                                    {redeemingTier === t.id ? "Đang đổi..." : "Đổi điểm"}
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">Voucher hiện có</h2>
                {isLoading ? (
                    <div className="flex justify-center">
                        <Spin tip="Đang tải voucher..." />
                    </div>
                ) : vouchers.length === 0 ? (
                    <p className="text-gray-600 text-center">Bạn chưa có voucher nào.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {vouchers.map((v) => {
                            const isUsed = v.pivot?.status === "used";
                            return (
                                <div
                                    key={v.id}
                                    className={`p-5 rounded-xl shadow-md flex flex-col justify-between transition hover:shadow-lg ${isUsed ? "bg-gray-100" : "bg-white"}`}
                                >
                                    <div>
                                        <h3 className={`text-lg font-bold mb-2 ${isUsed ? "text-red-500" : "text-green-700"}`}>
                                            {v.code}
                                        </h3>
                                        <p className="text-gray-700 mb-1">
                                            Giảm: <span className="font-semibold">{v.discount_value}{v.discount_type === "percent" ? "%" : "đ"}</span>
                                        </p>
                                        <p className="text-gray-700 mb-1">
                                            giá trị đơn hàng sử dụng: <span className="font-medium">{parseFloat(v.min_order_value).toLocaleString()}đ</span>
                                        </p>
                                        <p className="mb-1">
                                            Trạng thái:{" "}
                                            <span className={`font-semibold ${isUsed ? "text-red-500" : "text-green-500"}`}>
                                                {isUsed ? "Đã sử dụng" : "Chưa sử dụng"}
                                            </span>
                                        </p>
                                        <p className="text-gray-600">
                                            Hạn sử dụng: <span className="font-medium">{new Date(v.end_date).toLocaleDateString()}</span>
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
