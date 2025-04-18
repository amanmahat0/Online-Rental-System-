const Admin = require("../model/adminModel");
const passwordEncoderDecoder = require("../EncoderDecoder/passwordEncoderDecoder");

class AdminController {
  async signUp(req, res) {
    try {
      const encodedPassword = await passwordEncoderDecoder.hashPassword(
        req.body.password
      );
      req.body.password = encodedPassword;
      const admin = await Admin.create(req.body);
      return res.status(200).json({ status: true, data: admin });
    } catch (error) {
      console.log("Error in handelAdminSignUp: ", error);
      return res.status(500).json({ status: false, message: error });
    }
  }

  async login(req, res) {
    try {
      // find admin by email and password
      const admin = await Admin.findOne({
        email: req.body.email,
      });
      // if admin not found return error
      if (!admin) {
        return res
          .status(400)
          .json({ status: false, message: "Admin not found" });
      }
      // compare password
      const isMatch = await passwordEncoderDecoder.comparePassword(
        req.body.password,
        admin.password
      );
      // if password not match return error
      if (!isMatch) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid Credentials" });
      }
      // if admin found and password match return admin data and status true
      return res.status(200).json({ status: true, data: admin });
    } catch (error) {
      console.log("Error in handelAdminLogin: ", error);
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  async getAllAdmin(req, res) {
    try {
      const admins = await Admin.find({});
      return res.status(200).json({ status: true, data: admins });
    } catch (error) {
      console.log("Error in handelGetAllAdmin: ", error);
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  async getAdminById(req, res) {
    try {
      const adminId = req.params.id;
      const admin = await Admin.findById(adminId);
      if (!admin) {
        return res
          .status(400)
          .json({ status: false, message: "Admin not found" });
      }
      return res.status(200).json({ status: true, data: admin });
    } catch (error) {
      console.log("Error in handelGetAdminById: ", error);
      return res.status(500).json({ status: false, message: error.message });
    }
  }

  async deleteAdmin(req, res) {
    try {
      const adminId = req.params.id;
      const admin = await Admin.findByIdAndDelete(adminId);
      if (!admin) {
        return res
          .status(400)
          .json({ status: false, message: "Admin not found" });
      }
      return res
        .status(200)
        .json({ status: true, message: "Admin deleted successfully" });
    } catch (error) {
      console.log("Error in handelDeleteAdmin: ", error);
      return res.status(500).json({ status: false, message: error.message });
    }
  }
}

module.exports = new AdminController();
