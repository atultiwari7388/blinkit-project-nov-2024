import bcryptjs from "bcryptjs";
import UserModel from "./../models/user.model.js";
import sendEmail from "./../config/sendEmail.js";
import verifyEmailTemplate from "./../utils/verifyEmailTemplate.js";

//register new user

export async function registerUserController(request, response) {
  try {
    const { name, email, password } = request.body;

    //if anyone of these fields not available then throw an error
    if (!name || !email || !password) {
      return response.status(400).json({
        message: "provide email, name, password",
        error: true,
        success: false,
      });
    }

    //check if same email is already register or not
    const user = await UserModel.findOne({ email });
    //same email exists then throw an error
    if (user) {
      return response.json({
        message: "Already register email",
        error: true,
        success: false,
      });
    }
    //if email is new then store user data to database but firstly hash/bcrypt the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //create payload
    const payload = {
      name,
      email,
      password: hashedPassword,
    };
    //save user data to database
    const newUser = new UserModel(payload);
    const save = await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    //after that send verification email to user
    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify your Email from Blink Project",
      html: verifyEmailTemplate({
        name,
        url: VerifyEmailUrl,
      }),
    });
    console.log(verifyEmail);
    //after that return json data

    return response.json({
      message: "User register successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function verifyEmailController(request, response) {
  try {
    //find verification code when user register first time then user need to verify email
    const { code } = request.body;
    //after that find the user id
    const user = await UserModel.findOne({ _id: code });
    //if user is not available or user id is wrong
    if (!user) {
      return response.status(400).json({
        message: "Invalid code",
        error: true,
        success: false,
      });
    }

    //if user is valid
    const updateUser = await UserModel.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );

    return response.json({
      message: "Verify email done",
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: true,
    });
  }
}
