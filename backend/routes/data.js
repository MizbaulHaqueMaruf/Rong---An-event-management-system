const Organization = require("../models/sellerModel");
const Seller = require("../models/sellerModel");
const express = require("express");
const router = express.Router();

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


module.exports = router;
