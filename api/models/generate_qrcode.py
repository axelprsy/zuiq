import qrcode
import base64
from io import BytesIO
from flask import jsonify, send_file, make_response
from flask_restful import Resource, reqparse


class GenerateQrCode(Resource):
    def get(self):
        """
        Générer un fichier exel avec le resultat de la session.
        """
        parser = reqparse.RequestParser()
        parser.add_argument("session_url", required=True, location="args")
        args = parser.parse_args()
        session_url = args["session_url"]

        # Génération du QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(session_url)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")

        buffer = BytesIO()
        img.save(buffer, format="PNG")
        buffer.seek(0)

        img_base64 = base64.b64encode(buffer.read()).decode()
        data_url = f"data:image/png;base64,{img_base64}"

        return jsonify({"qr_code": data_url})
