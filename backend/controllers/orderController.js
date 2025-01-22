import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

import crypto from "crypto";
import axios from "axios";
import { console } from "inspector";
function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  for (const key of keys) {
    sorted[key] = obj[key];
  }
  return sorted;
}

export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, totalAmount, address } = req.body;

    const orderData = {
      items,
      totalAmount,
      address,
      paymenMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel({ userId, ...orderData });
    await newOrder.save();

    const cart = await cartModel.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter((item) => {
        return !items.some((i) => {
          return (
            i.itemId.toString() === item.itemId.toString() &&
            i.size === item.size
          );
        });
      });
      await cart.save();
    }

    for (const item of items) {
      const product = await productModel.findById(item.itemId);
      if (product.stock < item.quantity) {
        throw new Error(
          `Sản phẩm ${product.name} không đủ hàng tồn kho (cần ${item.quantity}, còn ${product.stock})`
        );
      }
      product.stock -= item.quantity;
      await product.save();
    }

    res.status(200).json({ success: true, message: "Order Placed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const placeOrderByVNPay = async (req, res) => {
  const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  const tmnCode = "G9P4R7AA";
  const secretKey = "ROAV80W3JLXO2K3T0IXYVNV4MI49SD05";
  const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  const returnUrl = "http://localhost:5173/";

  const date = new Date();
  const createDate = `${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}${date
    .getHours()
    .toString()
    .padStart(2, "0")}${date.getMinutes().toString().padStart(2, "0")}${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}`;

  const orderId = date.getTime(); // Mã giao dịch duy nhất
  const amount = req.body.amount; // Lấy số tiền từ client (đơn vị: VND)
  const orderInfo = req.body.orderInfo; // Mô tả đơn hàng

  const orderType = "billpayment"; // Loại giao dịch
  const locale = req.body.language || "vn"; // Ngôn ngữ
  const currCode = "VND"; // Loại tiền tệ
  const ip = ipAddr;

  const params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: orderType,
    vnp_bankCode: "VNPAYQR",
    vnp_Amount: amount * 100, // Số tiền tính bằng đồng (nhân 100)
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ip,
    vnp_CreateDate: createDate,
  };

  // Sắp xếp tham số theo thứ tự a-z
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {});

  const signData = querystring.stringify(sortedParams, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

  sortedParams.vnp_SecureHash = signed;

  const paymentUrl =
    vnpUrl + "?" + querystring.stringify(sortedParams, { encode: false });

  res.status(200).json({ paymentUrl });
};

export const placeOrderByMomo = async (req, res) => {
  //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
  //parameters
  var accessKey = "F8BBA842ECF85";
  var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  var orderInfo = "pay with MoMo";
  var partnerCode = "MOMO";
  var redirectUrl = "http://localhost:5173/orders";
  var ipnUrl = "https://02a9-113-172-197-109.ngrok-free.app/api/order/callback";
  var requestType = "payWithMethod";
  var amount = "50000";
  var orderId = partnerCode + new Date().getTime();
  var requestId = orderId;
  var extraData = "";
  var orderGroupId = "";
  var autoCapture = true;
  var lang = "vi";

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;

  //signature
  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
  });

  // Call MoMo API

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };

  let result;

  try {
    result = await axios(options);
    return res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const momoIPN = async (req, res) => {
  const { resultCode } = req.body;

  if (resultCode === 0) {
    return res.status(200).json({ message: "Success" });
  }
  return res.status(400).json({ message: "Failed" });
};
// All orders data for Admin
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("userId")
      .sort({ date: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// All orders data for User
export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel
      .find({ userId })
      .populate("userId")
      .sort({ date: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status, id } = req.body;
    const order = await orderModel.findByIdAndUpdate(id, { status });
    order.status = status;
    await order.save();
    res.status(200).json({ success: true, message: "Status updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderModel.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (order.status !== "Order Placed") {
      return res
        .status(400)
        .json({ success: false, message: "Order cannot be cancelled" });
    }

    await orderModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Order cancelled" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
