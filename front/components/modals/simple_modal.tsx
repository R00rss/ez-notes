interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
import styles from "./Modal.module.css";
export default function Modal({
  isOpen,
  onClose,
  children,
}: SimpleModalProps) {  
  return (
    <>
      {isOpen && (
        <div className={styles.modal_overlay}>
          <div className={styles.modal_content}>
            <button className={styles.modal_close} onClick={onClose}>
              &times;
            </button>
            <div className={styles.modal_body}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
