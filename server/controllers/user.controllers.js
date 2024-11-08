import UserModel from "./../models/user.model";
import bcryptjs from "bcryptjs";
import sendEmail from "./../config/sendEmail";
import verifyEmailTemplate from "./../utils/verifyEmailTemplate";

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
      password: hashPassword,
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
