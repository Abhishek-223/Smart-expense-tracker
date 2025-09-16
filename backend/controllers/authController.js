import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    console.log('Google login request from origin:', req.headers.origin);
    console.log('Expected GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, picture, aud } = payload;
    console.log('Token audience (aud):', aud);
    if (aud !== process.env.GOOGLE_CLIENT_ID) {
      console.error('Google token audience mismatch', { aud, expected: process.env.GOOGLE_CLIENT_ID });
      return res.status(401).json({ error: 'Invalid token audience' });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, profilePic: picture, password: "" });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ 
      token: jwtToken, 
      user: { id: user._id, name: user.name, email: user.email, profilePic: picture }
    });
  } catch (error) {
    console.error("Google authentication error:", error);
    const message = (error && (error.message || error.toString())) || 'Google authentication failed';
    res.status(401).json({ error: message });
  }
};
