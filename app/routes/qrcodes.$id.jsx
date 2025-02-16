import invariant from "tiny-invariant";

import db from "../db.server";
import { json } from "@remix-run/node";
import { getQRCodeImage } from "../models/QRCode.server";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }) => {
  invariant(params.id, "Could not find QR code destination");

  console.log(params.id);

  const id = Number(params.id);
  const qrCode = await db.qRCode.findFirst({ where: { id } });

  invariant(qrCode, "Could not find QR code");

  return json({
    title: qrCode.title,
    image: await getQRCodeImage(id),
  });
};

export default function QRCode() {
  const { title, image } = useLoaderData();

  return (
    <>
      <h1>{title}</h1>
      <img src={image} alt="QR Code for product" />
    </>
  );
}
