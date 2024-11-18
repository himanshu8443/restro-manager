import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "../common/utils/envConfig";

export async function login(req: Request, res: Response) {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    if (role && user.accountType !== role) {
      return res.status(400).json({
        success: false,
        message: "Invalid Account",
      });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, accountType: user.accountType },
        env.JWT_SECRET,
        {
          // 30 days
          expiresIn: "30d",
        }
      );
      user.token = token;
      user.password = "";
      // set the cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
      return res.status(200).json({
        success: true,
        data: user,
        token: token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in",
    });
  }
}

// add staff
export async function addStaff(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, email and password are required",
      });
    }
    const ownerID = req.user.id;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      owner: ownerID,
      firstName,
      lastName,
      email,
      password: passwordHash,
      accountType: "Staff",
    });
    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while adding the staff",
    });
  }
}

// remove staff

export async function removeStaff(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const ownerID = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }
    const isOwner = user.owner.toString() === ownerID.toString();
    if (!isOwner) {
      return res.status(400).json({
        success: false,
        message: "You are not allowed to remove this staff",
      });
    }
    await user.remove();
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while removing the staff",
    });
  }
}

// get staff
export async function getStaff(req: Request, res: Response) {
  try {
    const ownerID = req.user.id;
    const staff = await User.find({ owner: ownerID })
      .where("accountType")
      .equals("Staff");
    return res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the staff",
    });
  }
}

// get staff by id
export async function getStaffById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const ownerID = req.user.id;
    const staff = await User.findOne({ _id: id, owner: ownerID })
      .where("accountType")
      .equals("Staff");
    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: staff,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the staff",
    });
  }
}

// update staff
export async function updateStaff(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const ownerID = req.user.id;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, email and password are required",
      });
    }
    const user = await User.findOne({ _id: id, owner: ownerID })
      .where("accountType")
      .equals("Staff");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    await user.save();
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the staff",
    });
  }
}

// register admin
export async function registerAdmin(req: Request, res: Response) {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, email and password are required",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      accountType: "Admin",
    });
    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while registering the admin",
    });
  }
}
