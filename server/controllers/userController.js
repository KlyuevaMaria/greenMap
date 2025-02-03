const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModels");
const { body, validationResult } = require("express-validator");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async signup(req, res, next) {
    // await body("surname").isString().isLength({ min: 3 }).run(req),
    //   await body("name").isString().isLength({ min: 3 }).run(req),
    //   await body("email").isEmail().normalizeEmail().run(req),
    //   await body("password").isString().isLength({ min: 6 }).run(req);
    await Promise.all([
      body("surname").isString().isLength({ min: 3 }).run(req),
      body("name").isString().isLength({ min: 3 }).run(req),
      body("email").isEmail().normalizeEmail().run(req),
      body("password").isString().isLength({ min: 6 }).run(req),
    ]);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { surname, name, email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Некорректный пароль или почта" });
    }

    try {
      const candidateName = await User.findOne({ where: { email } });
      if (candidateName) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким email уже существует!" });
      }

      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        surname,
        name,
        email,
        password: hashPassword,
        role,
      });

      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ message: "Ошибка сервера" });
    }
  }

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Неверный пароль" });
      }
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      return res.status(400).json({ errors: e.message });

      //   return res.status(400).json({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new UserController();
