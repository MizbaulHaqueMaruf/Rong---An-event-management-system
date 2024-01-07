const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const productModel = require("../../models/eventModel");
const sellerModel = require("../../models/sellerModel");
const { responseReturn } = require("../../utiles/response");
class productController {
  add_product = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      let { name, category, description, stock, price, discount, eventDate } =
        field;
      const { images } = files;
      name = name.trim();
      const slug = name.split(" ").join("-");

      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });

      try {
        let allImageUrl = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i].filepath, {
            folder: "events",
          });
          allImageUrl = [...allImageUrl, result.url];
        }

        const seller = await sellerModel.findOne({ _id: id });
        const orgName = seller
          ? seller.organization.orgName
          : "Default Org Name";
        // console.log(orgName);

        await productModel.create({
          sellerId: id,
          name,
          slug,
          orgName: orgName,
          category,
          description: description.trim(),
          stock: parseInt(stock),
          price: parseInt(price),
          discount: parseInt(discount),
          images: allImageUrl,
          eventDate: eventDate,
        });
        responseReturn(res, 201, { message: "Event added successfully" });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };
  products_get = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const { id } = req;

    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
        const products = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .countDocuments();
        responseReturn(res, 200, { totalProduct, products });
      } else {
        const products = await productModel
          .find({ sellerId: id })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({ sellerId: id })
          .countDocuments();
        responseReturn(res, 200, { totalProduct, products });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  product_get = async (req, res) => {
    const { eventId } = req.params;
    try {
      const events = await eventModel.findById(eventId);
      responseReturn(res, 200, { events });
    } catch (error) {
      console.log(error.message);
    }
  };
  product_update = async (req, res) => {
    let {
      name,
      description,
      discount,
      price,
      brand,
      productId,
      stock,
      eventDate,
    } = req.body;
    name = name.trim();
    const slug = name.split(" ").join("-");
    try {
      await productModel.findByIdAndUpdate(productId, {
        name,
        description,
        discount,
        price,
        brand,
        productId,
        stock,
        slug,
        eventDate,
      });
      const product = await productModel.findById(productId);
      responseReturn(res, 200, {
        product,
        message: "Event updated successfully",
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  product_image_update = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      const { productId, oldImage } = field;
      const { newImage } = files;

      if (err) {
        responseReturn(res, 404, { error: err.message });
      } else {
        try {
          cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true,
          });
          const result = await cloudinary.uploader.upload(newImage.filepath, {
            folder: "events",
          });

          if (result) {
            let { images } = await productModel.findById(productId);
            const index = images.findIndex((img) => img === oldImage);
            images[index] = result.url;

            await productModel.findByIdAndUpdate(productId, {
              images,
            });

            const product = await productModel.findById(productId);
            responseReturn(res, 200, {
              product,
              message: "Event image updated successfully",
            });
          } else {
            responseReturn(res, 404, { error: "image upload failed" });
          }
        } catch (error) {
          responseReturn(res, 404, { error: error.message });
        }
      }
    });
  };
}

module.exports = new productController();
