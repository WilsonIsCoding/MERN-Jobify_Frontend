import Wrapper from "./styles/errorPage";
import img from "@/public/images/not-found.svg";
import Image from "next/image";
import Link from "next/link";
export default function Custom404() {
  return (
    <Wrapper>
      <div>
        <Image src={img} alt="not found" />
        <h3>Ohh! page not found</h3>
        <p>we can&#39;t seem to find the page you are looking for</p>
        <Link href="/">back home</Link>
      </div>
    </Wrapper>
  );
}
