import logoImage from "../../assets/images/Logo.png";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img src={logoImage} alt="DibiTech Logo" className="h-9 w-9" />
      <span className="text-lg text-white font-bold">DibiTech</span>
    </div>
  );
}

export default Logo;
