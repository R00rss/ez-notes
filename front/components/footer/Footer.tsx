import style from "./Footer.module.css";
export default function Footer() {
  return (
    <footer
      className={`absolute bottom-0 w-full h-[40px] text-center flex justify-center items-center font-extralight text-lg bg-black`}
      // className={`w-full h-[40px] text-center flex justify-center items-center font-extralight text-lg bg-black`}
    >
      <p className={style.gradient_text}>
        Todos los derechos reservados &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}
