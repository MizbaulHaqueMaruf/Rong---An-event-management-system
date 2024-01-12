const {
  seller_status_update,
} = require("../controllers/dashboard/sellerController");
const Organization = require("../models/sellerModel");
const Seller = require("../models/sellerModel");
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// router.post("/insert-data", async (req, res) => {
//   const { Name, Description, Email, Website } = req.body;
//   try {
//     const NewOrganization = new Organization({
//       name: Name,
//       description: Description,
//       email: Email,
//       website: Website,
//     });
//     const savedOrg = await NewOrganization.save();
//     console.log("Organization data saved:", savedOrg);
//     res.status(201).json({ message: "Organization data saved successfully" });
//   } catch (error) {
//     console.error("Error saving organization data:", error);
//     res.status(500).json({ error: "Failed to save organization data" });
//   }
// });

// // In your data.js route
router.get("/insert-data", async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations);
  } catch (error) {
    console.error("Error fetching organizations:", error);
    res.status(500).json({ error: "Failed to fetch organizations" });
  }
});

router.get("/seller-data", async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.status(200).json(sellers);
  } catch (error) {
    console.error("Error fetching sellers:", error);
    res.status(500).json({ error: "Failed to fetch sellers" });
  }
});
// Approve a seller
router.post("/seller-approve/:id", async (req, res) => {
  try {
    console.log("Seller ID:", req.params.id);
    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    seller.status = "active";
    await seller.save();
    res.json(seller);

    ////////////////////////////////////////////////////////
    // const seller = await Seller.findById(req.params.id);
    const email = seller.email;

    console.log("here");
    console.log(email);

    if (seller) {
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Seller Approval",
        html: `<h1>Approved</h1>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.send({ message: "Could not send email" });
        } else {
          console.log("Email sent", info.response);
        }
      });
    }
    /////////////////////////////////////////////////////////
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/seller-reject/:id", async (req, res) => {
  try {
    console.log("Seller ID:", req.params.id);
    const seller = await Seller.findById(req.params.id);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    seller.status = "inactive";
    await seller.save();
    res.json(seller);

    ////////////////////////////////////////////////////////
    // const seller = await Seller.findById(req.params.id);
    const email = seller.email;

    console.log("here");
    console.log(email);

    if (seller) {
      const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Seller Approval",
        html: `<h1>Rejected</h1>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.send({ message: "Could not send email" });
        } else {
          console.log("Email sent", info.response);
        }
      });
    }
    /////////////////////////////////////////////////////////
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/*mail sending*/
var transporter = nodemailer.createTransport({
  // host: "smtp.gmail.com",
  // port: 465,
  // secure: true,
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

router.post("/send-mail/:id", async (req, res) => {
  try {
      const seller = await Seller.findById(req.params.id);
         const email = seller.email;
          const mailBody= req.body.mailBody;
        console.log(email)

      if(seller){
          const mailOptions = {
              from:process.env.AUTH_EMAIL,
              to:email,
              subject:"Seller Approval",
              html:`<h2>Please provide the necessary information</h2>
              <h1>${mailBody}</h1>`
          }

          transporter.sendMail(mailOptions,(error,info)=>{
              if(error){
                  console.log("error",error);
                  res.send({message:"Could not send email"})
              }else{
                  console.log("Email sent",info.response);
              }
          })

      }
  } catch (error) {
    console.log(error);
    res.send({ message: "Invalid user" });
  }
});

module.exports = router;
