Storm
=====

Using HTML5, JqueryMobile a Simple Game

Certificates
====

mkdir temp
cd temp
jar -xvf ../release-app.apk
cd META-INF

keytool -printcert -file CERT.RSA

openssl pkcs7 -in CERT.RSA -print_certs -inform DER -out key.cer

keytool -import -alias publicFtpCert -file key.cer -keystore publicKey.store
keytool -list -v -keystore publicKey.store
