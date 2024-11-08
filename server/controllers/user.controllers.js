import bcryptjs from "bcryptjs";
import UserModel from "./../models/user.model.js";
import sendEmail from "./../config/sendEmail.js";
import verifyEmailTemplate from "./../utils/verifyEmailTemplate.js";
import generatedAccessToken from "./../utils/generatedAccessToken.js";
import uploadImageCloudinary from "./../utils/uploadImageCloudinary.js";

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

//verify Email
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

//login
export async function loginController(request, response) {
  try {
    const { email, password } = request.body;

    //if user can't provide their email and password then throw an error

    if (!email || !password) {
      return response.status(400).json({
        message: "provide email, password",
        error: true,
        success: false,
      });
    }

    //after that check given email is register or not

    const user = await UserModel.findOne({ email });

    //if not register than throw an error

    if (!user) {
      return response.status(400).json({
        message: "User not register",
        error: true,
        success: false,
      });
    }

    //after that check user status

    if (user.status !== "Active") {
      return response.status(400).json({
        message: "Contact to Admin",
        error: true,
        success: false,
      });
    }

    //check password
    const checkPassword = await bcryptjs.compare(password, user.password);

    //if password is not match then throw an error

    if (!checkPassword) {
      return response.status(400).json({
        message: "Check your password",
        error: true,
        success: false,
      });
    }

    //if user password is correct then send the token to  the client side(access and refresh)

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedAccessToken(user._id);

    //after that update user last login
    const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.cookie("accessToken", accessToken, cookiesOption);
    response.cookie("refreshToken", refreshToken, cookiesOption);

    return response.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//logout controller
export async function logoutController(request, response) {
  try {
    const userId = request.userId; //middleware

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    response.clearCookie("accessToken", cookiesOption);
    response.clearCookie("refreshToken", cookiesOption);

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
      refresh_token: "",
    });

    return response.json({
      message: "Logout successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//upload user avatar
export async function uploadAvatarController(request, response) {
  try {
    const userId = request.userId; // auth middlware
    const image = request.file; // multer middleware

    const upload = await uploadImageCloudinary(image);

    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });

    return response.json({
      message: "upload profile",
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
