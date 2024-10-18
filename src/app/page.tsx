import Image from "next/image";
import styles from "./page.module.css";
import { Typography } from "@mui/material";
import { syne } from "./fonts";
import DebtPool from "@/views/DebtPool";

export default function Home() {
  return (
    <div>
      <DebtPool />
    </div>
  );
}
