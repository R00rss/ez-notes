import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

enum alerts {
  success,
  error,
  warning,
  info,
  question,
}
type type_of_alert = keyof typeof alerts;

export interface alert_options {
  title: string;
  content?: string;
  icon: type_of_alert;
}

export interface alert_options_with_callback extends alert_options {
  callback: () => void;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

export function simple_alert(options: alert_options) {
  MySwal.fire({
    title: options.title,
    text: options.content || "",
    icon: options.icon,
  });
}
export function alert_with_callback(options: alert_options_with_callback) {
  MySwal.fire({
    title: options.title,
    text: options.content || "",
    icon: options.icon,
    showCancelButton: options.showCancelButton,
    confirmButtonText: options.confirmButtonText || "Ingresar",
    cancelButtonText: options.cancelButtonText || "No",
  }).then((result) => {
    if (result.isConfirmed) {
      options.callback();
    }
  });
}
