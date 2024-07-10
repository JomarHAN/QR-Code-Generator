import invariant from "tiny-invariant";

import db from "../db.server";
import { redirect } from "@remix-run/node";
import { getDestinationURL } from "../models/QRCode.server";

export const loader = async ({ params }) => {
  invariant(params.id, "Could not find QR code destination");

  const id = Number(params.id);
  const qrCode = await db.qRCode.findFirst({ where: { id } });

  invariant(qrCode, "Cound not find QR code destination");

  await db.qRCode.update({
    where: { id },
    data: { scans: { increment: 1 } },
  });

  return redirect(getDestinationURL(qrCode));
};
