## React Skills App

## To use the w3id SSO feature: You need localhost ssl cert.

```bash
mkcert \
  -cert-file=./certs/cert.pem \
  -key-file=./certs/key.pem \
  localhost "*.localhost"
```

2. Need to copy the `sample.env` to `.env` and update with the SSO Provisioner keys.
