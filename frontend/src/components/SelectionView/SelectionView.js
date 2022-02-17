import IPInfo from "../IPInfo/IPInfo";
import styles from "./SelectionView.module.scss";

export default function SelectionView() {
  return (
    <div className={styles.selectionView_container}>
      <IPInfo />
      {/*       <button>Get IP</button>
      <button>View Cached IP Requests</button> */}
    </div>
  );
}
