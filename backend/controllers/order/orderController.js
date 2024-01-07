const authOrderModel = require("../../models/Order");
const eventModel = require("../../models/eventModel");
// const customerOrder = require('../../models/customerOrder')
// const cardModel = require('../../models/cardModel')
// const myShopWallet = require('../../models/myShopWallet')
// const sellerWallet = require('../../models/sellerWallet')

const {
  mongo: { ObjectId },
} = require("mongoose");
const { responseReturn } = require("../../utiles/response");

const moment = require("moment");

class orderController {
  get_seller_orders = async (req, res) => {
    const { sellerId } = req.params;
    let { page, parPage, searchValue } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);
    // console.log(sellerId);

    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
      } else {
        //   // Fetch events by the current seller from the eventModel
        //   const events = await eventModel
        //     .find({ sellerId })
        //     .skip(skipPage)
        //     .limit(parPage)
        //     .sort({ createdAt: -1 });

        //   // Fetch orders related to the events from the authOrderModel
        //   const orders = await authOrderModel
        //     .find({ eventId: { $in: events.map((event) => event._id) } })
        //     .sort({ createdAt: -1 });

        //   const totalOrder = await authOrderModel.countDocuments({ sellerId });

        //   responseReturn(res, 200, { orders, totalOrder });
        //   console.log(orders);
        // }

        const orders = await authOrderModel
          .find({
            sellerId,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalOrder = await authOrderModel
          .find({
            sellerId,
          })
          .countDocuments();
        responseReturn(res, 200, { orders, totalOrder });
      }
    } catch (error) {
      console.log("get seller order error " + error.message);
      responseReturn(res, 500, { message: "internal server error" });
    }
  };

  get_seller_order = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await authOrderModel.findById(orderId);

      responseReturn(res, 200, { order });
    } catch (error) {
      console.log("get admin order " + error.message);
    }
  };
}

module.exports = new orderController();
