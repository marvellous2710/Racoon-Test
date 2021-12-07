const mongoose    = require("mongoose");
const { isEmail } = require("validator");//on appelle "isEmail" qui est une function de la bibliotheque validator qui va nous controler automatiquement(un peu comme des regex) qui va renvoyer true ou false
const bcrypt      = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,//le trim va supprimer les espaces 
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],//validator est une bibliotheque dans laquelle il y a beaucoup de cas de validation
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,//on en met beaucoup par rapport au cryptage qui peut etre long
      minlength: 8,
    },
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
    bio: {
      type: String,
      max: 1024,
    },
    followers: {
      type: [String],//quand cet utilisateur sera suivi on pourra incrémenter le user
    },
    following: {
      type: [String],//pareil pour les gens qui le suivent
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,//on saura quand le user s'enregistre
  }
);

//---------------PASSWORD
//play function before save into display: 'block',
userSchema.pre("save", async function (next) { 
  const salt = await bcrypt.genSalt();//bcrypt va nou générer une série de caractere que seulement lui connait pour "saler" le mot de passe
  this.password = await bcrypt.hash(this.password, salt);//la on ajoute le "salage" à notre password
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
